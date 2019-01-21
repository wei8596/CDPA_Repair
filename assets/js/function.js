var urlParams = [];	// URL parameters
var lang = "zh";	// zh(default) | en
var action = -1;	// 0: Repair, 1: RepairStatus, 2: BannedList, 3: Tutorial
var type = -1;		// 0: Eazy, 1: QueryMACAddress, 2: QueryIPConflict

var trans = [
	{
		zh:"中文版",
		en:"English"
	},{
		zh:"登入",
		en:"Sign In"
	},{
		zh:"申請維修",
		en:"Fix Request"
	},{
		zh:"查詢進度",
		en:"Progress"
	},{
		zh:"封鎖列表",
		en:"Blocked List"
	},{
		zh:"各式教學",
		en:"Tutorial"
	},{
		zh:"簡易問題排除",
		en:"Troubleshooting"
	},{
		zh:"查詢IP分配表",
		en:"IP Distribution"
	},{
		zh:"查詢網路卡號",
		en:"MAC Address"
	},{
		zh:"查詢IP佔用卡號",
		en:"IP Conflict"
	},{
		zh:"回到首頁",
		en:"Home"
	},{
		zh:"請尊重智慧財產權，勿下載版權保護軟體。",
		en:"Please respect the intellectual property rights, do not download copyright protection software."
	},{
		zh:"若您無法正確瀏覽本系統，請嘗試使用其他瀏覽器，謝謝。",
		en:"If you are not able to correctly viewing the web page, please change your Browser, thank you."
	}
];

/*
 * translate the content
 */
function translate(lang) {
	var transLang = "";
	if(lang == "zh") {
		transLang = "en";
	}
	else {
		transLang = "zh";
	}
	$(document).ready(function() {
		$("#lang a").attr("href", "?lang=" + transLang);
		$("#lang a").text(trans[0][transLang]);
		$("#login").text(trans[1][lang]);
		$("#repair a").attr("href", "?action=Repair&lang=" + lang);
		$("#repair a").text(trans[2][lang]);
		$("#repairstatus a").attr("href", "?action=RepairStatus&lang=" + lang);
		$("#repairstatus a").text(trans[3][lang]);
		$("#bannedlist a").attr("href", "?action=BannedList&lang=" + lang);
		$("#bannedlist a").text(trans[4][lang]);
		$("#tutorial span").text(trans[5][lang]);
		$("#eazy a").attr("href", "?action=Tutorial&type=Eazy&lang=" + lang);
		$("#eazy a").text(trans[6][lang]);
		$("#lookupIP a").text(trans[7][lang]);
		$("#queryMAC a").attr("href", "?action=Tutorial&type=QueryMACAddress&lang=" + lang);
		$("#queryMAC a").text(trans[8][lang]);
		$("#queryIPConflict a").attr("href", "?action=Tutorial&type=QueryIPConflict&lang=" + lang);
		$("#queryIPConflict a").text(trans[9][lang]);
		$("#home a").attr("href", "?lang=" + lang);
		$("#home a").text(trans[10][lang]);
		$("#content1 p").text(trans[11][lang]);
		$("#content2 p").text(trans[12][lang]);
	});
}

/*
 * get URL parameters
 */
function getQueryParam() {
	var url = location.search;
	var query, getParams, paramsVal;
	
	if(url.indexOf("?") != -1) {
		query = url.split("?")[1];
		getParams = query.split("&");
		for(i = 0; i < getParams.length; ++i) {
			paramsVal = getParams[i].split("=");
			urlParams.push(paramsVal[0]);
			urlParams[paramsVal[0]] = paramsVal[1];
			// setting flags
			if(paramsVal[0] == "lang") {
				if(paramsVal[1] == "zh") {
					lang = "zh";
				}
				else {
					lang = "en";
				}
			}
			else if(paramsVal[0] == "action") {
				if(paramsVal[1] == "Repair") {
					action = 0;
					$(document).ready(function() {
						$("#content").load("form.html");
					});
				}
				else if(paramsVal[1] == "RepairStatus") {
					action = 1;
				}
				else if(paramsVal[1] == "BannedList") {
					action = 2;
					$(document).ready(function() {
						$("#content").load("banned.html");
					});
				}
				else if(paramsVal[1] == "Tutorial") {
					action = 3;
				}
			}
			else if(paramsVal[0] == "type") {
				if(paramsVal[1] == "Eazy") {
					type = 0;
					$(document).ready(function() {
						$("#content").load("trouble_shooting.html");
					});
				}
				else if(paramsVal[1] == "QueryMACAddress") {
					type = 1;
					$(document).ready(function() {
						$("#content").load("queryMAC.html");
					});
				}
				else if(paramsVal[1] == "QueryIPConflict") {
					type = 2;
					$(document).ready(function() {
						$("#content").load("queryIPConflict.html");
					});
				}
			}
		}
	}
}

getQueryParam();
translate(lang);
