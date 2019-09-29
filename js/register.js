function showMsg(id, msg) {
	document.getElementById(id).style.display = 'block';
	document.getElementById(id).innerHTML = msg;
	console.log(msg);
}


var usernameUnique = false;
var emailUnique = false;
var phoneUnique = false;

function checkUsername(doc) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "../php/Username_check_register.php", true);
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
		} else {
			doc.getElementsByName("username")[0].className += " unik";
			document.getElementById("usernameError").style.display = 'none';
			usernameUnique = true;
		}
		isUserValid(doc.getElementsByName("username")[0].value);
	}
}

function checkEmail(doc) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "../php/Email_check_register.php", true);
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
		} else {
			doc.getElementsByName("email")[0].className += " unik";
			document.getElementById("emailError").style.display = 'none';
			emailUnique = true;
		}
		isEmailValid(doc.getElementsByName("email")[0].value);
	}
}

function checkPhone(doc) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "../php/Phone_check_register.php", true);
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
		} else {
			doc.getElementsByName("phone")[0].className += " unik";
			document.getElementById("phoneError").style.display = 'none';
			phoneUnique = true;
		}
		isPhoneValid(doc.getElementsByName("phone")[0].value);
	}
}

function checkCPass(doc) {
	doc.getElementsByName("pass")[0].className = "input-text";
	doc.getElementsByName("cpass")[0].className = "input-text";
	if (doc.getElementsByName("pass")[0].value != doc.getElementsByName("cpass")[0].value) {
		showMsg("passwordError", "Password is not the same");
		doc.getElementsByName("pass")[0].className += " notUnik";
		doc.getElementsByName("cpass")[0].className += " notUnik";
		return false;
	}
	else {
		doc.getElementsByName("cpass")[0].className += " unik";
		doc.getElementsByName("pass")[0].className += " unik";
		document.getElementById("passwordError").style.display = 'none';
		return true;
	}
}

function isUserValid(username) {
	for (i in username) {
		var c = username.charCodeAt(i);
		//Check huruf
		if (!(c >= 65 && c <= 90)) {
			if (!(c >= 97 && c <= 122)) {
				//Cek angka
				if (!(c >= 48 && c <= 57)) {
					//Cek _
					if (c !== 95) {
						showMsg("usernameError", "Username should use only alphabetical, numbers, and underscore");
						return false;
					}
				}
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
			showMsg("emailError", "Enter valid email!");
			return false;
		}
	}
	else {
		showMsg("emailError", "Enter valid email!");
		return false;
	}
}

function isPhoneValid(phone) {
	if ((phone.length >= 9) && (phone.length <= 12)) {
		for (i in phone) {
			if (phone.charCodeAt(i) < 48 || phone.charCodeAt(i) > 57) {
				showMsg("phoneError", "Phone Number should contain only number");
				return false;
			}
		}
		return true;
	}
	else {
		showMsg("phoneError", "Phone Number length should be 9-12");
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
	if (isUserValid(doc.getElementsByName("username")[0].value) && (isEmailValid(doc.getElementsByName("email")[0].value)) && (isPhoneValid(doc.getElementsByName("phone")[0].value)) && (checkCPass(doc))) {
		if (usernameUnique && emailUnique && phoneUnique) {
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