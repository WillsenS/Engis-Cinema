function connectPHPGET(phpURL, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", phpURL, true);
    xmlhttp.send();
    var hasil = "";
    xmlhttp.onload = function () {
        callback(xmlhttp.responseText);
    }
}

function renderDetail(dis, hasil) {
    hasil = JSON.parse(hasil);
    dis.getElementById("fotoFilm").src = "../img/film/" + hasil.film_picture;
    dis.getElementsByClassName("judul")[0].innerHTML = hasil.title;
    dis.getElementById("genre").innerHTML = hasil.genre;
    dis.getElementById("durasi").innerHTML = hasil.durasi;
    dis.getElementById("releaseDate").innerHTML = (new Date(hasil.released_date)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    dis.getElementById("rerataRating").innerHTML = hasil.avg_rating;
    dis.getElementsByClassName("deskripsi")[0].innerHTML = hasil.detail;
}

function renderSchedule(dis, hasil) {
    hasil = JSON.parse(hasil);
    hasil.forEach(has => {
        var row = dis.createElement("tr");

        var tanggal = dis.createElement("td");
        tanggal.innerHTML = has["date"];

        var jam = dis.createElement("td");
        jam.innerHTML = has["time"];

        var available_seat = dis.createElement("td");
        available_seat.innerHTML = has["available_seat"] + " seats";
        available_seat.className = "black";

        var status = dis.createElement("td");
        var status_img = dis.createElement("td");
        var img = dis.createElement("img");

        if (parseInt(has["available_seat"]) > 0) {
            status.innerHTML = "Book Now";
            status.className = "seatA blue";

            img.src = "../img/arrow blue.png";
            status_img.appendChild(img);
        }else{
            status.innerHTML = "Not Available";
            status.className = "seatNA red";

            img.src = "../img/x mark red.png";
            status_img.appendChild(img);
        }

        row.appendChild(tanggal);
        row.appendChild(jam);
        row.appendChild(available_seat);
        row.appendChild(status);
        row.appendChild(status_img);
        dis.getElementsByClassName("jadwal")[0].appendChild(row);
    });

}

function renderReview(dis, hasil) {
    // <div class="review-card">
    //     <img class="prof-pict" src="../img/profilPicture/animeKids.jpeg">
    //     <div class="review-card-content">
    //         <p>antonio wahyu</p>
    //         <div class="rating">
    //             <div class="star"></div>
    //             <p><span>5.32</span>/ 10</p>
    //         </div>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec dui purus. In id pulvinar
    //             tellus. Nulla pretium porta justo, suscipit sollicitudin lacus vulputate quis. Proin
    //             bibendum lacus sem, eu lacinia dui hendrerit pharetra.</p>
    //     </div>
    // </div>
    // <hr class="gray"></hr>
    hasil = JSON.parse(hasil);
    filmReview = dis.getElementsByClassName("film-reviews")[0];
    hr = dis.createElement("hr");
    hr.className = "gray";
    for (let i = 0; i < hasil.length; i++) {
        const element = hasil[i];
        var card = dis.createElement("div");
        card.className = "review-card";

        var img = dis.createElement("img");
        img.className = "prof-pict";
        img.src = "../img/profilPicture/"+element["profile_picture"];

        var cardContent = dis.createElement("div");
        cardContent.className = "review-card-content";

        var nama = dis.createElement("p");
        nama.innerHTML = element["username"];

        var ratingDiv = dis.createElement("div");
        ratingDiv.className = "rating";

        var star = dis.createElement("div");
        star.className = "star";

        var rating = dis.createElement("p");
        var ratingSpan = dis.createElement("span");
        ratingSpan.innerHTML = element["rating"];
        rating.appendChild(ratingSpan);
        rating.innerHTML += "/ 10";

        ratingDiv.appendChild(star);
        ratingDiv.appendChild(rating);

        var komen = dis.createElement("p");
        komen.innerHTML = element["review"];

        card.appendChild(img);
        cardContent.appendChild(nama);
        cardContent.appendChild(ratingDiv);
        cardContent.appendChild(komen);
        card.appendChild(cardContent);
        filmReview.appendChild(card);
        if(i !== hasil.length-1)
        {
            filmReview.appendChild(hr);
        }
    }
}

