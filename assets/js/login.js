// JavaScript Document
/***
	元帳號密碼及form check 轉移至 account.js
	此js為搭配login.html 之使用
    1.0		190127		by imgc	
	require jquery.js
***/

var url = location.href;
var pattern = /lang=[^&#]*/i;
var arr = url.split('?');
var ref = arr[0];
var lang = null;
if(arr.length > 1){
	lang = pattern.exec(arr[1]);
}
if(lang == null){
	lang = "lang=zh";
}
$("#register").attr("href", ref + "?action=Register&" + lang);
$("#forget").attr("href", ref + "?action=Forget&" + lang);
$("#troubleCheck").attr("href", ref + "?action=Tutorial&type=Eazy&" + lang);
