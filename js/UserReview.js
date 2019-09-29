function connectPHPGET(phpURL, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", phpURL, true);
    xmlhttp.send();
    var hasil = "";
    xmlhttp.onload = function () {
        callback(xmlhttp.responseText);
    }
}

function renderJudul(dis, hasil) {
    hasil = JSON.parse(hasil);
    dis.getElementsByClassName("judul")[0].innerHTML = hasil.title;
}

function Submitting (doc,loc) {
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/wbd/php/UserReview.php", true);
    var dataForm = new FormData();
    var token = getToken(doc, "accessTokenWBD");
    dataForm.append("rating", doc.getElementsByName("rating")[0].value);
    dataForm.append("review", doc.getElementsByName("review")[0].value);
    dataForm.append("review", doc.getElementsByClassName("judul")[0].value);
    dataForm.append("token", token[0].value);
	var hasil = "";
    xmlhttp.onload = function () {
    console.log(hasil);
    hasil = JSON.parse(xmlhttp.responseText);
    if(hasil["status"] === 200) {
    	loc.href = "UserReview.html";
    }
}
