function showName(doc) {
    var token = getToken(doc, "accessTokenWBD");
    var xmlhttp = new XMLHttpRequest();
    var hasil = "";
    xmlhttp.open("GET", "../php/getName.php?token=" + token);
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        doc.getElementsByClassName("user-name")[0].innerHTML = hasil["username"];
    }
    xmlhttp.send();
}

function showFilmList(doc, loc) {
    var xmlhttp = new XMLHttpRequest();
    var hasil = "";
    xmlhttp.open("GET", "../php/getFilmList.php");
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        // <div class="film-card">
        //     <img class="film-img" src="../img/film/ad astra.jpeg">
        //     <b class="film-title">Ad Astra</b>
        //     <div class="film-rating">
        //         <div class="star"></div>
        //         <p><span class="rerataRating">8.3</span></p>
        //     </div>
        // </div>
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

            var rating = doc.createElement("div");
            rating.className = "film-rating";
            var star = doc.createElement("div");
            star.className = "star";
            var pRerata = doc.createElement("p");
            var spanRerata = doc.createElement("span");
            spanRerata.className = "rerataRating";
            spanRerata.innerHTML = film["avg_rating"];
            pRerata.appendChild(spanRerata);
            rating.appendChild(star);
            rating.appendChild(pRerata);

            var divImg = doc.createElement("div");
            divImg.className = "img-container";
            divImg.onclick = function() {
                loc.href = "../html/filmDetail.html?id=" + film["film_id"];
            }

            var divName = doc.createElement("div");
            divName.className = "name-container";

            divImg.appendChild(img);
            divName.appendChild(b);
            divName.appendChild(rating);

            card.appendChild(divImg);
            card.appendChild(divName);

            doc.getElementsByClassName("film-list")[0].appendChild(card);
        });
    }
    xmlhttp.send();
}