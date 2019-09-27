function getToken(doc, tokenName) {
    var cookieArr = decodeURIComponent(doc.cookie).split(";");
    var hasil = ""
    cookieArr.forEach(cook => {
        var idx = cook.indexOf(tokenName);
        if (idx !== -1) {
            // Ada
            hasil = cook.substr(idx + tokenName.length + 1);
        }
    });
    return hasil;
}

function getIdFromToken(token) {
    var xmlhttp = new XMLHttpRequest();
    var hasil = "";
    var id = -1;
    xmlhttp.open("GET", "http://localhost/wbd/php/getId.php?token=" + token, false);
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        id = hasil["user_id"];
    }
    xmlhttp.send();
    return id;
}

function validateAccessToken(loc, token) {
    var userId = getIdFromToken(token);
    console.log(userId);
    if (userId !== -1) {
        loc.href = "http://localhost/wbd/html/home.html";
    }
}


function load(doc, loc) {
    var token = getToken(doc, "accessTokenWBD");
    if (token !== "") {
        validateAccessToken(loc, token);
    }
}