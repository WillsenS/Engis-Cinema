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

function Submitting(doc, loc) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "../php/UserReview.php", true);
    var dataForm = new FormData();
    var token = getToken(doc, "accessTokenWBD");

    var rating = doc.getElementsByName("rating");
    var ratingVal = 0;
    for (let i = 0, length = rating.length; i < length; i++)
    {
        if (rating[i].checked)
        {
            // console.log(rating[i].value);
            ratingVal = rating[i].value;
            // console.log(ratingVal);
            break;
        }
    }
    // console.log(ratingVal);
    dataForm.append("rating", ratingVal);
    dataForm.append("review", doc.getElementsByName("review")[0].value);
    var url = new URL(loc);
    var id = url.searchParams.get("id");
    dataForm.append("film_id", id);
    dataForm.append("token", token);
    var hasil = "";
    xmlhttp.onload = function () {
        console.log(xmlhttp.responseText);
        hasil = JSON.parse(xmlhttp.responseText);
        if (hasil["status"] === 200) {
            loc.href = "UserReview.html?id=" + id;
        }
    }
    xmlhttp.send(dataForm);
}

