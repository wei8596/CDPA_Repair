// JavaScript Document
/***
    1.0		190121		by imgc	
	require jquery.js & md5.js
***/
var password_min = 4;//最小密碼長度(字元
var password_max = 24;//最大密碼長度(字元
var pattern = new RegExp("[0-9,a-z]{" + password_min + "," + password_max + "}");//密碼規範

var info = {//訊息文本
	hint : {//提示訊息
		waitForMail : "提交申請!! 將於數分鐘內寄送驗證信件"
	},
	err : {//錯誤訊息
		//不合法輸入
		passwordAmount : "密碼應為" + password_min + "~" + password_max + "字",
		passwordContain : "password should only contain 0-9,a-z",
		passwordDoubleCheck : "password and verify must be same"
	}
};
//不合法輸入提示內文


function hash(x){
	//雜湊手段 +-保障密碼隱私
	return $.md5(x);
}

function checkForm(opt, form){
	//確認表單輸入合法性
	switch(opt){
		case "login":
			return checkForm_login(form);
		break;
		case "register":
		return checkForm_reg(form);
		default:
		alert("checkForm(): unexpect opt");
		return false;
	}
	
}

function submitForm(opt, form){
	switch(opt){
		case "login":
			if (checkForm_login(form)){// hash password
				form.elements.namedItem('password').value = hash(form.elements.namedItem('password').value);
				return true;
			}
			return false;
		break;
		case "register":
			if (checkForm_reg(form)){// hash password & clear verify value
				form.elements.namedItem('password').value = hash(form.elements.namedItem('password').value);
				form.elements.namedItem('verify').value = "";
				alert(info.hint.waitForMail);
				return true;
			}
			return false;
		default:
		alert("submitForm(): unexpect opt");
	}
	return false;
}

function checkForm_login(form){
	//check form for login page 
	if(form.elements.namedItem('password').value.length < password_min || form.elements.namedItem('password').value.length > password_max){
		document.getElementById('info').innerHTML = info.err.passwordAmount;
		return false;
	}
	if(!pattern.test(form.elements.namedItem('password').value)){
		document.getElementById('info').innerHTML = info.err.passwordContain;
		return false;
	}
	document.getElementById('info').innerHTML = "&nbsp;";
	return true;
}

function checkForm_reg(form){
	//check form for register page
	if(form.elements.namedItem('password').value.length < password_min || form.elements.namedItem('password').value.length > password_max){
		document.getElementById('info').innerHTML = info.err.passwordAmount;
		return false;
	}
	if(!pattern.test(form.elements.namedItem('password').value)){
		document.getElementById('info').innerHTML = info.err.passwordContain;
		return false;
	}
	if(form.elements.namedItem('password').value != form.elements.namedItem('verify').value){
		document.getElementById('info').innerHTML = info.err.passwordDoubleCheck;
		return false;
	}
	document.getElementById('info').innerHTML = "&nbsp;";
	return true;
}