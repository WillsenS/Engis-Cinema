function showKeyword(doc, keyword) {
    doc.getElementsByClassName("keyword")[0].innerHTML = keyword;
}

function showPagination(doc, loc, name, filmPerPage, curPage, numOfPage)
{
    var pagin = doc.getElementsByClassName("pagination")[0];
    while (pagin.firstChild) {
        pagin.removeChild(pagin.firstChild);
    } 
    // <span class="back gray"><b>Back</b></span>
    // <div class="page-box gray">
    //     <p>1</p>
    // </div>
    // <div class="page-box blue">
    //     <p>2</p>
    // </div>
    // <div class="page-box blue">
    //     <p>3</p>
    // </div>
    // <span class="next blue"><b>Next</b></span>
    var back = doc.createElement("span");
    var bBack = doc.createElement("b");
    bBack.innerHTML = "Back";
    back.appendChild(bBack);
    if(curPage > 1){
        back.className = "back blue";
        back.onclick = function() {
            showSearchResult(doc, name, curPage-1, filmPerPage);
        }
    }else{
        back.className = "back gray";
    }
    doc.getElementsByClassName("pagination")[0].appendChild(back);

    //Create box
    // console.log('curPage: ', curPage, ', numOfPage: ', numOfPage);
    for (let i = 1; i < curPage; i++) {
        let boxKiri = doc.createElement("div");
        boxKiri.className = "page-box blue";
        let p = doc.createElement("p");
        p.innerHTML = i;
        boxKiri.appendChild(p);
        boxKiri.onclick = function() {
            showSearchResult(doc, loc, name, i, filmPerPage);
        }
        doc.getElementsByClassName("pagination")[0].appendChild(boxKiri); 
    }
    let boxNow = doc.createElement("div");
    boxNow.className = "page-box gray";
    let p = doc.createElement("p");
    p.innerHTML = curPage;
    boxNow.appendChild(p);
    doc.getElementsByClassName("pagination")[0].appendChild(boxNow);
    for (let i = curPage+1; i <= numOfPage; i++) {
        let boxKanan = doc.createElement("div");
        boxKanan.className = "page-box blue";
        let p = doc.createElement("p");
        p.innerHTML = i;
        boxKanan.appendChild(p);
        boxKanan.onclick = function() {
            showSearchResult(doc, loc, name, i, filmPerPage);
        }
        doc.getElementsByClassName("pagination")[0].appendChild(boxKanan); 
    }
    
    var next = doc.createElement("span");
    var bNext = doc.createElement("b");
    bNext.innerHTML = "Next";
    next.appendChild(bNext);
    if(curPage < numOfPage){
        next.className = "next blue";
        next.onclick = function() {
            showSearchResult(doc, loc, name, curPage+1, filmPerPage);
        }
    }else{
        next.className = "next gray";
    }
    doc.getElementsByClassName("pagination")[0].appendChild(next);
}

function showSearchResult(doc, loc, name, page, filmPerPage) {
    var xmlhttp = new XMLHttpRequest();
    var hasil = "";
    xmlhttp.open("GET", "../php/searchFilm.php?name="+name);
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        var banyakFilm = hasil.length;
        doc.getElementsByClassName("search-number")[0].innerHTML = banyakFilm;
        // console.log(hasil);
        if(banyakFilm > filmPerPage){
            showPagination(doc, loc, name, filmPerPage, page, Math.ceil(banyakFilm/filmPerPage));
        }
        // <div class="film-card">
        //     img container
        //     detail container
        //     viewDetail container
        // </div>
        // <hr class="garis-suci"></hr>
        let start = Math.max((page-1)*filmPerPage, 0);
        let end = Math.min(start+(filmPerPage-1), banyakFilm-1);
        // console.log(start, '; ',end);
        var filmList = doc.getElementsByClassName("film-list")[0];
        while (filmList.firstChild) {
            filmList.removeChild(filmList.firstChild);
        } 
        for (let index = start; index <=end; index++) {
            const film = hasil[index];
            // console.log("index: ", index);
            var filmCard = doc.createElement("div");
            filmCard.className = "film-card";

            // <div class="img-container">
            //     <img class="film-img" src="../img/film/gundala.jpg">
            // </div>
            var imgContainer = doc.createElement("div");
            imgContainer.className = "img-container";
            var img = doc.createElement("img");
            img.className = "film-img";
            img.src = "../img/film/" + film["film_picture"];
            imgContainer.appendChild(img);
            // <div class="detail-container">
            //     <b><span class="film-title">Gundala</span></b>
            //     <div class="film-rating">
            //         <div class="star"></div>
            //         <p><span class="rerataRating gray">8.3</span></p>
            //     </div>
            //     <p class="film-detail">
            //         Gundala asik banget boi, pokoknya filmnya bagus banget.
            //     </p>
            // </div>
            var detailContainer = doc.createElement("div");
            detailContainer.className = "detail-container";
            var b = doc.createElement("b");
            var filmTitle = doc.createElement("span");
            filmTitle.className = "film-title";
            filmTitle.innerHTML = film["title"];
            b.appendChild(filmTitle);

            var rating = doc.createElement("div");
            rating.className = "film-rating";
            var star = doc.createElement("div");
            star.className = "star";
            var pRerata = doc.createElement("p");
            var spanRerata = doc.createElement("span");
            spanRerata.className = "rerataRating gray";
            spanRerata.innerHTML = film["avg_rating"];
            pRerata.appendChild(spanRerata);
            rating.appendChild(star);
            rating.appendChild(pRerata);

            var pDetail = doc.createElement("p");
            pDetail.className = "film-detail";
            pDetail.innerHTML = film["detail"];

            detailContainer.appendChild(b);
            detailContainer.appendChild(rating);
            detailContainer.appendChild(pDetail);

            // <div class="viewDetail-container">
            //     <div class="viewDetail">
            //         <span class="viewDetail-text blue"><b>View details</b></span>
            //         <img class="blue-arrow" src="../img/arrow blue.png">
            //     </div>
            // </div>
            var viewDetailContainer = doc.createElement("div");
            viewDetailContainer.className = "viewDetail-container";
            var viewDetail = doc.createElement("div");
            viewDetail.className = "viewDetail";
            viewDetail.onclick = function() {
                loc.href = "../html/filmDetail.html?id=" + film["film_id"];
            }
            var viewDetailText = doc.createElement("span");
            viewDetailText.className = "viewDetail-text blue";
            var viewDetailBold = doc.createElement("b");
            viewDetailBold.innerHTML = "View details";
            viewDetailText.appendChild(viewDetailBold);
            var arrowBlue = doc.createElement("img");
            arrowBlue.className = "blue-arrow";
            arrowBlue.src = "../img/arrow blue.png";

            viewDetail.appendChild(viewDetailText);
            viewDetail.appendChild(arrowBlue);
            viewDetailContainer.appendChild(viewDetail);

            filmCard.appendChild(imgContainer);
            filmCard.appendChild(detailContainer);
            filmCard.appendChild(viewDetailContainer);

            var hr = doc.createElement("hr");
            
            filmList.appendChild(filmCard);
            filmList.appendChild(hr);
        }
    }
    xmlhttp.send();
}