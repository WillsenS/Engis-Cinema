function showMsg(id, msg) {
	document.getElementById(id).style.display = 'block';
	document.getElementById(id).innerHTML = msg;
}


function checkUsername(doc) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost/wbd/php/Username_check_register.php", true);
	var dataForm = new FormData();
	dataForm.append("username", doc.getElementsByName("username")[0].value);
	xmlhttp.send(dataForm);
	var hasil = "";
	xmlhttp.onload = function () {
		console.log(xmlhttp.responseText);
		hasil = JSON.parse(xmlhttp.responseText);
		doc.getElementsByName("username")[0].className = "input-text";
		if (hasil !== 200) {
			doc.getElementsByName("username")[0].className += " notUnik";
			showMsg("usernameError", "Username is taken");
		}else{
			doc.getElementsByName("username")[0].className += " unik";
			document.getElementById("usernameError").style.display = 'none';
		}
	}
}

function checkEmail(doc) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost/wbd/php/Email_check_register.php", true);
	var dataForm = new FormData();
	dataForm.append("email", doc.getElementsByName("email")[0].value);
	xmlhttp.send(dataForm);
	var hasil = "";
	xmlhttp.onload = function () {
		console.log(xmlhttp.responseText);
		hasil = JSON.parse(xmlhttp.responseText);
		doc.getElementsByName("email")[0].className = "input-text";
		if (hasil !== 200) {
			doc.getElementsByName("email")[0].className += " notUnik";
			showMsg("emailError", "Email is taken, or invalid email format");
		}else{
			doc.getElementsByName("email")[0].className += " unik";
			document.getElementById("emailError").style.display = 'none';
		}
	}
}

function checkPhone(doc) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost/wbd/php/Phone_check_register.php", true);
	var dataForm = new FormData();
	dataForm.append("phone", doc.getElementsByName("phone")[0].value);
	xmlhttp.send(dataForm);
	var hasil = "";
	xmlhttp.onload = function () {
		console.log(hasil);
		hasil = JSON.parse(xmlhttp.responseText);
		doc.getElementsByName("phone")[0].className = "input-text";
		if (hasil !== 200) {
			doc.getElementsByName("phone")[0].className += " notUnik";
			showMsg("phoneError", "Please use another phone number");
		}else{
			doc.getElementsByName("phone")[0].className += " unik";
			document.getElementById("phoneError").style.display = 'none';
		}
	}
}

function checkCPass(doc) {
	if (doc.getElementsByName("pass") == doc.getElementsByName("cpass")) {
		showMsg("passwordError", "Password is not the same")
		return false;
	}
	else {
		return true;
	}
}

function isUserValid(username) {
	for (i in username) {
		if (!(username.charCodeAt(i) >= 65) && (username.charCodeAt(i) <= 90)) {
			if (!(username.charCodeAt(i) >= 97) && (username.charCodeAt(i) <= 122) && (username.charCodeAt(i) != 95)) {
				showMsg("usernameError", "Username should use only alphabetical, numbers, and underscore")
				return false;
			}
		}
	}
	return true;
}

function isEmailValid(email) {
	if (email.search("@") != -1) {
		if ((email.search("@")) < (email.lastIndexOf("."))) {
			return true;
		}
		else {
			showMsg("emailError", "Enter valid email!")
			return false;
		}
	}
	else {
		showMsg("emailError", "Enter valid email!")
		return false;
	}
}

function isPhoneValid(phone) {
	if ((phone.length >= 9) && (phone.length <= 12)) {
		return true;
	}
	else {
		showMsg("phoneError", "Phone Number length should be 9-12")
		return false;
	}
}

var imgEncoded = "";
var imgPath = "";

function checkSubmit(doc, loc) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "../php/Submit_register.php", true);
	var dataForm = new FormData();
	dataForm.append("username", doc.getElementsByName("username")[0].value);
	dataForm.append("email", doc.getElementsByName("email")[0].value);
	dataForm.append("phone", doc.getElementsByName("phone")[0].value);
	dataForm.append("pass", doc.getElementsByName("pass")[0].value);
	dataForm.append("cpass", doc.getElementsByName("cpass")[0].value);
	dataForm.append("imgEncoded", imgEncoded);
	dataForm.append("imgPath", imgPath);
	// if(true){
	if (isUserValid(doc.getElementsByName("username")) && (isEmailValid(doc.getElementsByName("username"))) && (isPhoneValid(doc.getElementsByName("username"))) && (checkCPass(doc.getElementsByName("cpass")))) {
		xmlhttp.send(dataForm);
		var hasil = "";
		xmlhttp.onload = function () {
			console.log("Done uploading");
			console.log(xmlhttp.responseText);
			hasil = JSON.parse(xmlhttp.responseText);
			if (hasil["status"] === 200) {
				cookieStr = "accessTokenWBD=" + hasil["cookie"] + "; expires=" + new Date(Date.now() + 600000).toUTCString() + "; path=/";
				console.log(cookieStr);
				doc.cookie = cookieStr;
				loc.href = "login.html";
			}

		}
	}
}

function readImg(doc) {
	var pic = doc.getElementsByName("picture")[0];
	if (pic.files && pic.files[0]) {
		var fr = new FileReader();
		imgPath = pic.files[0].name;
		doc.getElementById("imgUpload-dummy").value = imgPath; 
		fr.addEventListener("load", function (event) {
			imgEncoded = event.target.result;
		});

		fr.readAsDataURL(pic.files[0]);
	}
}