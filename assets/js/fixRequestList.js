// JavaScript Document
/***
    1.0		190202		by imgc
	2.0		190206		完成篩選功能
	required imgcClass.js
***/
const viewList = {// view list config
	id : "viewList",
	column : {//column  index
		seq : 0,
		dorm : 1,
		room : 2,
		update : 3,
		poster : 4,
		state : 5
	},
	tbodyColor : ['NavajoWhite','MistyRose'],
	messenger : document.getElementById("info")
};

var filter ={		//篩選
	run : function(row){	//進行row篩選 回傳true為欲顯示 **欲調整篩選方式 請修改此func**
		for(index in filter.method){	//需全method為true 
			if(filter.method[index](row) != true){
				return false;
			}
		}
		return true;
	},
	method : [		//row篩選函式		**欲添加篩選功能請添加於此處 true 表欲顯示**
		function(row){	//dorm filter
			var keyValue = row.getElementsByTagName('td')[viewList.column.dorm].firstChild.nodeValue;
			return filter.dorm[keyValue];
		}
	],
	dormTag : [		//宿舍name參數
		"A",
		"B",
		"D",
		"D",
		"E",
		"F",
		"G",
		"H",
		"L",
		"one",
		"two",
		"three",
		"four"
	],
	dorm : {},		//method dorm filter 保留參數
}

function getFilter(){//reset filter
	for(index in filter.dormTag){
		filter.dorm[filter.dormTag[index]] = document.getElementsByName(filter.dormTag[index]).item(0).checked;
	}
	return filter;
}

function paintViewList(){
	if(viewList.messenger){
		viewList.messenger.innerHTML = 'wait for paintViewList()...';
	}
	var table = document.getElementById(viewList.id);
	var filter = getFilter();
	var tbody = table.getElementsByTagName("tbody").item(0);
	if(!tbody){
		tbody = table;
	}
	var rows = tbody.getElementsByTagName('tr');
	var i = 0;
	for (index in rows) {
		var row = rows[index];
		if(typeof row != 'object'){
			break;
		}
		if(filter.run(row) == true){
			row.style.display = '';
			row.style.backgroundColor = viewList.tbodyColor[i];
			i++;
			i %= viewList.tbodyColor.length;
		}
		else{
			row.style.display = 'none';
		}
	}
	
	if(viewList.messenger){
		viewList.messenger.innerHTML = '&nbsp;';
	}
}

var sorter = new SORTER({//viewList排序器
	"table" : viewList.id,	//table id
	"currentKey" : "seq",	//current sort by key name
	"currentOrder" : "asc",	// sort order 'asc' or 'desc'
	"sortConfig" : {		// key type List & key config
		"seq" : {
			"keyFunc" : function(cols){	//how to get key value
				return cols[viewList.column.seq].firstChild.nodeValue;
			},
			"compare" : COMPARE.VALUE	//how to sort(how to compare)
		},
		"dorm" : {
			"keyFunc" : function(cols){
				return cols[viewList.column.dorm].firstChild.nodeValue;
			},
			"compare" : COMPARE.TEXT
		},
		"room" : {
			"keyFunc" : function(cols){
				return cols[viewList.column.dorm].firstChild.nodeValue + cols[viewList.column.room].firstChild.nodeValue;
			},
			"compare" : COMPARE.TEXT
		},
		"update" : {
			"keyFunc" : function(cols){
				return cols[viewList.column.update].firstChild.nodeValue;
			},
			"compare" : COMPARE.TEXT
		},
		"poster" : {
			"keyFunc" : function(cols){
				return cols[viewList.column.poster].firstChild.nodeValue;
			},
			"compare" : COMPARE.TEXT
		},
		"state" : {
			"keyFunc" : function(cols){
				return cols[viewList.column.state].firstChild.nodeValue;
			},
			"compare" : COMPARE.TEXT
		}
	},
	"messenger" : document.getElementById("info")
});

var filterBox = new COLLAPSE({//create filterBox COLLAPSE function
	"box" : "filterBox",	//box id
	'title' : null,
	'content': null,
	"state" : COLLAPSE_STATE.off	//not collapse
});

var checkBlocks = document.getElementsByClassName('checkBlock');//set all checkBlock
for(index in checkBlocks){
	if(typeof checkBlocks[index] != 'object'){
		break;
	}
	new CHECKBLOCK({
		"block" : checkBlocks[index]
	});
}

paintViewList();//initial viewList view
