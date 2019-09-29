function goHome(loc) {
    loc.href = "../html/home.html";
}

function goTransc(loc) {
    loc.href = "../html/transaction.html";
}

function search(doc, loc) {
    var movieName = doc.getElementById("movieName").value;
    loc.href = "../html/search.html?name=" + movieName;
    // console.log(loc.href);
}

function logout(doc, loc) {
    var token = getToken(doc, "accessTokenWBD");
    if(token !== ""){
        delCookie(doc, "accessTokenWBD");
    }
    loc.href = "../html/login.html";
}