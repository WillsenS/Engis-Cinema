function renderHeader(doc, loc, id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../php/getScheduleData.php?id="+id, true);
    xmlhttp.send();
    var hasil = "";
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        doc.getElementsByClassName("title")[0].innerHTML = hasil["title"];
        doc.getElementsByClassName("title")[1].innerHTML = hasil["title"];
        let d = hasil["date"].split("-");
        let t = hasil["time"].split(":");
        // let options = {hour12: true, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        let sch  = new Date(d[0], d[1]-1, d[2], t[0], t[1], t[2], 0);
        let bulan = sch.toLocaleDateString('id-ID', {month: 'long'});
        let tanggal = sch.getDay();
        let tahun = sch.getFullYear();
        let timeString = sch.toLocaleTimeString('id-ID', {hour12: true, hour: 'numeric', minute: 'numeric'});
        dateString = bulan + " " + tanggal + ", " + tahun + " - " + timeString;
        doc.getElementsByClassName("schedule")[0].innerHTML = dateString;
        doc.getElementsByClassName("schedule")[1].innerHTML = dateString;
        doc.getElementsByClassName("back-arrow")[0].onclick = function() {
            loc.href = "../html/filmDetail.html?id=" + hasil["film_id"];
        }
    }
}

function showModal(doc, loc, status) {
    var modal = doc.getElementsByClassName("modal-container")[0];
    modal.style["display"] = "block";
    modal.onclick = function () {
        modal.style["display"] = "none";
    }
    if(status === 200){
        doc.getElementsByClassName("historyButton")[0].style["display"] = "flex";
        doc.getElementsByClassName("historyButton")[0].onclick = function () {
            loc.href = "../html/transaction.html";
        }
    }else{
        doc.getElementsByClassName("modal-title")[0].innerHTML = "Payment Failed!";
        doc.getElementsByClassName("modal-msg")[0].innerHTML = "Failed purchasing seat, please try again."
        doc.getElementsByClassName("historyButton")[0].style["display"] = "none";
    }
}

function buySeat(doc, loc, id, seatNum) {
    var xmlhttp = new XMLHttpRequest();
    // var link = "../php/buySeat.php?id="+id+"&seatNumber="+seatNum+"&accessToken="+getToken(doc, "accessTokenWBD");
    // console.log(link);
    xmlhttp.open("POST", "../php/buySeat.php", true);
    var dataForm = new FormData();
    dataForm.append("accessToken", getToken(doc, "accessTokenWBD"));
    dataForm.append("id", id);
    dataForm.append("seatNumber", seatNum);
    // console.log(dataForm);
    xmlhttp.send(dataForm);
    var hasil = "";
    xmlhttp.onload = function () {
        // console.log(xmlhttp.responseText);
        hasil = JSON.parse(xmlhttp.responseText);
        showModal(doc, loc, hasil["status"]);
        renderTakenSeat(doc, loc, id);
    }
}

function renderSeatSelect(doc, loc, id, seatNum, maxSeat) {
    doc.getElementsByClassName("no-selection")[0].style["visibility"] = "hidden";
    doc.getElementsByClassName("already-select")[0].style["visibility"] = "visible";
    doc.getElementsByClassName("buy-button-container")[0].style["visibility"] = "visible";
    doc.getElementsByClassName("seatNumber")[0].innerHTML = "Seat #" + seatNum;
    doc.getElementsByClassName("buy-button")[0].onclick = function () {
        buySeat(doc, loc, id, seatNum);
    }
    for (let i = 0; i < maxSeat; i++) {
        let seat = doc.getElementById("seat"+(i+1));
        seat.className = "seat blue";
        if(i+1 === seatNum) {
            seat.className += " selected";
        }
    }
    renderTakenSeat(doc, loc, id);
}

function renderSeat(doc, loc, id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../php/getMaxSeat.php?id="+id, true);
    xmlhttp.send();
    var hasil = "";
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        var maxSeat = hasil["max_seat"];
        var seatGrid = doc.getElementsByClassName("seat-grid")[0];
        for (let i = 0; i < maxSeat; i++) {
            let seat = doc.createElement("div");
            seat.id = "seat"+(i+1);
            seat.className = "seat blue";
            var p = doc.createElement("p");
            p.innerHTML = i+1;
            seat.appendChild(p);
            seat.onclick = function () {
                renderSeatSelect(doc, loc, id, i+1, maxSeat);
            }
            seatGrid.appendChild(seat);
        }
        renderTakenSeat(doc, loc, id);
    }
}

function renderTakenSeat(doc, loc, id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../php/getSeatArr.php?id="+id, true);
    xmlhttp.send();
    var hasil = "";
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        // console.log(hasil);
        hasil.forEach(seat => {
            let seatTaken = doc.getElementById("seat"+seat["seat"]);
            seatTaken.className = "seat gray";
            seatTaken.onclick = undefined;
        });
    }
}