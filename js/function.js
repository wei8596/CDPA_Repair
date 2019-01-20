var urlParams = [];	// URL parameters
var lang = -1;		// 0: zh, 1: en
var action = -1;	// 0: RepairStatus, 1: BannedList, 2: Tutorial
var type = -1;		// 0: QueryIPInfomation, 1: QueryMACAddress, 2: QueryIPConflict

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
				if(paramsVal[1] == "RepairStatus") {
					action = 0;
				}
				else if(paramsVal[1] == "BannedList") {
					action = 1;
				}
				else if(paramsVal[1] == "Tutorial") {
					action = 2;
				}
			}
			else if(paramsVal[0] == "type") {
				if(paramsVal[1] == "QueryIPInfomation") {
					type = 0;
				}
				else if(paramsVal[1] == "QueryMACAddress") {
					type = 1;
				}
				else if(paramsVal[1] == "QueryIPConflict") {
					type = 2;
				}
			}
		}
	}
}

getQueryParam();
alert(lang.toString() + action.toString() + type.toString());
