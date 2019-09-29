function showName(doc) {
    var token = getToken(doc, "accessTokenWBD");
    var xmlhttp = new XMLHttpRequest();
    var hasil = "";
    xmlhttp.open("GET", "http://localhost/wbd/php/getName.php?token=" + token);
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        doc.getElementsByClassName("user-name")[0].innerHTML = hasil["username"];
    }
    xmlhttp.send();
}

function showTransactionList(doc, loc) {
    var xmlhttp = new XMLHttpRequest();
    var hasil = "";
    xmlhttp.open("GET", "http://localhost/wbd/php/getTransactionList.php");
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
      
        //foreach film??
        hasil.forEach(film => {
            var card = doc.createElement("div");
            card.className = "film-card";
            
            var img = doc.createElement("img");
            img.className = "film-img";
            img.src = "../img/film/" + film["film_picture"];
            
            var b = doc.createElement("b");
            b.className = "film-title";
            b.innerHTML = film["title"];
            b.onclick = function() {
                loc.href = "../html/filmDetail.html?id=" + film["film_id"];
            }

            var schedule = doc.createElement("div");
            schedule.className = "schedule-container";
            schedule.innerHTML = 

            var divImg = doc.createElement("div");
            divImg.className = "img-container";
            divImg.onclick = function() {
                loc.href = "../html/filmDetail.html?id=" + film["film_id"];
            }

            var divName = doc.createElement("div");
            divName.className = "name-container";

            divImg.appendChild(img);
            divName.appendChild(b);

            card.appendChild(divImg);
            card.appendChild(divName);

            doc.getElementsByClassName("film-list")[0].appendChild(card);
        });
    }
    xmlhttp.send();
}