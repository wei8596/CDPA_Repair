var urlParams = [];	// URL parameters
var lang = "zh";	// zh(default) | en
const ACTION = {
	None : -1,
	Repair : 0,
	RepairStatus : 1,
	BannedList : 2,
	Tutorial : 3,
	Login : 4,		//登入
	Register : 5,	//註冊
	Forget : 6,		//忘記密碼
	Home : 7		//登入成功後首頁
};
var action = ACTION.None;	// 0: Repair, 1: RepairStatus, 2: BannedList, 3: Tutorial, ...參照ACTION

const TYPE = {
	None : -1,
	Eazy : 0,
	QueryMACAddress : 1,
	QueryIPConflict : 2
};
var type = TYPE.None;		// 0: Eazy, 1: QueryMACAddress, 2: QueryIPConflict

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
	},{
		zh:"若報修後超過兩週以上無人處理，請優先私訊CDPA的Facebook粉絲專頁！",
		en:""
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
		$("#login a").attr("href", "?action=Login&lang=" + lang);
		$("#login a").text(trans[1][lang]);
		$("#repair a").attr("href", "?action=Repair&lang=" + lang);
		$("#repair a").text(trans[2][lang]);
		$("#repairstatus a").attr("href", "?action=RepairStatus&lang=" + lang);
		$("#repairstatus a").text(trans[3][lang]);
		$("#bannedlist a").attr("href", "?action=BannedList&lang=" + lang);
		$("#bannedlist a").text(trans[4][lang]);
		$("#tutorial a").attr("href", "#");
		$("#tutorial a").text(trans[5][lang]);
		$("#eazy").attr("href", "?action=Tutorial&type=Eazy&lang=" + lang);
		$("#eazy").text(trans[6][lang]);
		$("#lookupIP").attr({href:"http://www.cdpa.nsysu.edu.tw/lookUpIP.php", target:"_blank"});
		$("#lookupIP").text(trans[7][lang]);
		$("#queryMAC").attr("href", "?action=Tutorial&type=QueryMACAddress&lang=" + lang);
		$("#queryMAC").text(trans[8][lang]);
		$("#queryIPConflict").attr("href", "?action=Tutorial&type=QueryIPConflict&lang=" + lang);
		$("#queryIPConflict").text(trans[9][lang]);
		$("#home a").attr("href", "?lang=" + lang);
		$("#home a").text(trans[10][lang]);
		$("#content1 p").text(trans[11][lang]);
		$("#content2 p").text(trans[12][lang]);
		$("#content3 p").text(trans[13][lang]);
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
				switch(paramsVal[1]){
					case "Repair":
						action = ACTION.Repair;
						break;
					case "RepairStatus":
						action = ACTION.RepairStatus;
						break;
					case "BannedList":
						action = ACTION.BannedList;
						break;
					case "Tutorial":
						action = ACTION.Tutorial;
						break;
					case "Login":
						action = ACTION.Login;
						break;
					case "Register":
						action = ACTION.Register;
						break;
					case "Forget":
						action = ACTION.Forget;
						break;
					case "Home":
						action = ACTION.Home;
						break;
				}
			}
			else if(paramsVal[0] == "type") {
				if(paramsVal[1] == "Eazy") {
					type = TYPE.Eazy;
				}
				else if(paramsVal[1] == "QueryMACAddress") {
					type = TYPE.QueryMACAddress;
				}
				else if(paramsVal[1] == "QueryIPConflict") {
					type = TYPE.QueryIPConflict;
				}
			}
		}
		// page loading
		switch(action) {
			case ACTION.Repair:
				$(document).ready(function() {
					$("#content").load("form.html");
				});
				break;
			case ACTION.RepairStatus:
				//
				break;
			case ACTION.BannedList:
				$(document).ready(function() {
					$("#content").load("banned.html");
				});
				break;
			case ACTION.Tutorial:
				switch(type) {
					case TYPE.Eazy:
						if(lang == "zh") {
							$(document).ready(function() {
								$("#content").load("trouble_shooting.html");
							});
						}
						else {
							$(document).ready(function() {
								$("#content").load("en/trouble_shooting.html");
							});
						}
						break;
					case TYPE.QueryMACAddress:
						$(document).ready(function() {
							$("#content").load("queryMAC.html");
						});
						break;
					case TYPE.QueryIPConflict:
						$(document).ready(function() {
							$("#content").load("queryIPConflict.html");
						});
						break;
				}
				break;
			case ACTION.Login:
				$(document).ready(function() {
					$("#content").load("login.html");
				});
				break;
			case ACTION.Register:
				$(document).ready(function() {
					$("#content").load("register.html");
				});
				break;
			case ACTION.Forget:
				$(document).ready(function() {
					$("#content").load("forget.html");
				});
				break;
			case ACTION.Home:
				$(document).ready(function() {
					$("#content").load("home.html");
				});
				break;
		}
	}
}

function goTop_Check() {
	/* 按下GoTop按鈕時的事件 */
	$('#goTop a').click(function() {
		// 返回到最頂
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});
	
	/* 偵測卷軸滑動時，往下滑超過200px就讓GoTop按鈕出現 */
	$(window).scroll(function() {
		if($(this).scrollTop() > 200) {
			$('#goTop a').fadeIn();
		}
		else {
			$('#goTop a').fadeOut();
		}
	});
}

getQueryParam();
translate(lang);
goTop_Check();
