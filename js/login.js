function createWrongMsg(doc, msg) {
    if (!doc.getElementById("wrong-msg")) {
        var p = doc.createElement("p");
        var b = doc.createElement("b");
        b.id = "wrong-msg";
        b.innerHTML = msg;
        p.appendChild(b);
        doc.getElementById("wrong").appendChild(p);
    }else{
        doc.getElementById("wrong-msg").innerHTML = msg;
    }
}

function checkLogin(doc, loc) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/wbd/php/login.php", true);
    var dataForm = new FormData();
    dataForm.append("email", doc.getElementsByName("email")[0].value);
    dataForm.append("password", doc.getElementsByName("password")[0].value);
    xmlhttp.send(dataForm);
    var hasil = "";
    xmlhttp.onload = function () {
        // console.log(hasil);
        hasil = JSON.parse(xmlhttp.responseText);
        if(hasil["status"] === 200) {
            cookieStr = "accessTokenWBD="+hasil["cookie"]+"; expires="+new Date(Date.now() + 6000000).toUTCString()+"; path=/";
            // console.log(cookieStr);
            doc.cookie = cookieStr;
            loc.href = "login.html";
        }else if(hasil["status"] === 401) {
            createWrongMsg(doc, "Wrong Password");
        }else if(hasil["status"] === 404) {
            createWrongMsg(doc, "Wrong Email");
        }
    }
}