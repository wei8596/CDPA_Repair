// JavaScript Document
/***
    1.0		190202		by imgc
	required sorter.js
***/
function plugFixRequestList(){
	alert('plugList undo');
	return true;
}
/*
const COMPARE = {// sort base compare function
	VALUE : {
		'desc': function(a,b) {
            return a.key - b.key;
        },
        'asc': function(a,b) {
            return b.key - a.key;
        }
	},
	TEXT : {
		"desc": function(a,b) {
			if (a.key == b.key) return 0;
			else if (a.key > b.key) return -1;
			else    return 1;
		},
		"asc": function(a,b) {
			if (a.key == b.key) return 0;
			else if (a.key > b.key) return 1;
			else    return -1;
		}
	}
}

function SORTER(config) {//create a sorter object
	//variable
	const requiredArgs = ['table', 'currentKey', 'currentOrder', 'sortConfig', 'messenger'];//sorter setting
    for (argc in requiredArgs) {
        this[requiredArgs[argc]] = config[requiredArgs[argc]];
    }
	var tbody;
	
	//function
    this.sortBy = function(opt) {
		if(this.messenger){
			this.messenger.innerHTML = 'wait for sorting';
		}
		
        if (this.currentKey == opt) {
            this.currentOrder = (this.currentOrder == 'asc'
                ? 'desc'
                : 'asc'
            );
        }
        else {
            this.currentKey = opt;
        }

        var keyCellIndex = this.sortConfig[this.currentKey].columnIndex;
        var funcSort = (this.sortConfig[this.currentKey].compare
            ? this.sortConfig[this.currentKey].compare//if have set compare method
            : COMPARE.TEXT	//default compare method(slow
        )[this.currentOrder];
        doSort.apply(this, [keyCellIndex, funcSort]);
		
		if(this.messenger){
			this.messenger.innerHTML = '&nbsp;';
		}
    }

    function getTbody() {
        //pass by id or DOM node?
		if(typeof this.table == 'string'){//pass by id
			this.table = document.getElementById(this.table);
		}
		
		var tbodys = this.table.getElementsByTagName('tbody');
		tbody = (tbodys.length > 0)? tbodys.item(0) : this.table;
        return tbody;
    }

    function getRows() {
        var tbody = getTbody.call(this);
        var rows = tbody.getElementsByTagName('tr');
        return rows;
    }

    function doSort(keyCellIndex, sortFunc) {
        var rows = getRows.call(this);
        var pairs = [];
        for (index in rows) {
			var row = rows[index];
			//alert(typeof row);
			if(typeof row == 'object'){// row is real row object
				var keyValue = row.getElementsByTagName('td')[keyCellIndex].firstChild.nodeValue;
				pairs[index] = {
					'key': keyValue,
					'content': row
				}
			}
        }
        pairs.sort(sortFunc);

        var newTbody = document.createElement('tbody');
		for(index in pairs){
			newTbody.appendChild(pairs[index].content);
		}
		var tbody = getTbody.call(this);
    	tbody.parentNode.replaceChild(newTbody, tbody);
    }
}*/

var sorter = new SORTER({//viewList排序器
	"table" : "viewList",	//table id
	"currentKey" : "seq",	//current sort by key name
	"currentOrder" : "asc",	// sort order 'asc' or 'desc'
	"sortConfig" : {		// key type List & key config
		"seq" : {
			"columnIndex" : 0,
			"compare" : COMPARE.VALUE
		},
		"dorm" : {
			"columnIndex" : 1,
			"compare" : COMPARE.TEXT
		},
		"room" : {
			"columnIndex" : 2,
			"compare" : COMPARE.TEXT
		},
		"update" : {
			"columnIndex" : 3,
			"compare" : COMPARE.TEXT
		},
		"poster" : {
			"columnIndex" : 4,
			"compare" : COMPARE.TEXT
		},
		"state" : {
			"columnIndex" : 5,
			"compare" : COMPARE.TEXT
		}
	},
	"messenger" : document.getElementById("info")
});