var urlParams = [];	// URL parameters
var lang = -1;		// 0: zh, 1: en
var action = -1;	// 0: Repair, 1: RepairStatus, 2: BannedList, 3: Tutorial
var type = -1;		// 0: Eazy, 1: QueryMACAddress, 2: QueryIPConflict

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
					lang = 0;
				}
				else {
					lang = 1;
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
