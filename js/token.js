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

function getIdFromToken(doc, loc, token, redirect) {
    var xmlhttp = new XMLHttpRequest();
    var hasil = "";
    var id = -1;
    xmlhttp.open("GET", "../php/getId.php?token=" + token);
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        userId = hasil["user_id"];
        if (userId !== -1) {
            if (redirect) {
                loc.href = "../html/home.html";
            }
        } else {
            // Hapus token
            delCookie(doc, "accessTokenWBD");
            loc.href = "../html/login.html";
        }
    }
    xmlhttp.send();
    return id;
}

function delCookie(doc, cookieName) {
    cookieStr = cookieName+'=""; expires=' + new Date(Date.now()).toUTCString() + '; path=/';
    doc.cookie = cookieStr;
}


function load(doc, loc, redirect) {
    var token = getToken(doc, "accessTokenWBD");
    if (token !== "") {
        getIdFromToken(doc, loc, token, redirect);
    }else{
        if(!redirect){
            loc.href = "../html/login.html";
        }
    }
}
