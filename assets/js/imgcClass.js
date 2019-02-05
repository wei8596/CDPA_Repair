// JavaScript Document
/*** 
	this js is define some object class
    1.0		190204		by imgc	
***/

//----
//collapseBox
//	may require set html element class = 'collapseBox' , 'title' , 'content'
//----
const COLLAPSE_STATE = {
	on:'on',	//collapse
	off:'off'	// not collapse
};
function COLLAPSE(config){//create a collapse box object
	const requiredArgs = ['box', 'title', 'content', 'state'];
	for (argc in requiredArgs) {
        this[requiredArgs[argc]] = config[requiredArgs[argc]];
    }
	
	if(typeof this.box == 'string'){//pass by id
		this.box = document.getElementById(this.box);
	}
	if(!this.title){//default title element : first child which is title class
		this.title = this.box.getElementsByClassName('title').item(0);
	}
	if(!this.content){//default content element : first child which is content class
		this.content = this.box.getElementsByClassName('content').item(0);
	}
	if(!this['oTitle']){
		this.oTitle= this.title.innerHTML;//backup origin title html
	}
	
	this.setView = function(){	// set box view
		switch(this.state){
			case COLLAPSE_STATE.on:
				this.title.innerHTML = '+' + this.oTitle;
				this.content.style.display = 'none';
				break;
			case COLLAPSE_STATE.off:
				this.title.innerHTML = '-' + this.oTitle;
				this.content.style.visibility = '';
				break;
		}
	};
	
	this.collapse = function(){	// set click event
		switch(this.state){
			case COLLAPSE_STATE.off:
				this.state = COLLAPSE_STATE.on;
				this.title.innerHTML = '+' + this.oTitle;
				this.content.style.display = 'none';
				break;
			default:
				this.state = COLLAPSE_STATE.off;
				this.title.innerHTML = '-' + this.oTitle;
				this.content.style.display = '';
				break;
		}
	};
	
	this.setView();		//initial view
}

//----
//checkBlock
//	require set html element class = 'checkBlock' , 'selectAll' , 'cancelAll' , 'selectOption'
//----
function CHECKBLOCK(config){//create a check block object
	const requiredArgs = ['block', 'selectAll', 'cancelAll', 'selectOptions'];
	for (argc in requiredArgs) {
        this[requiredArgs[argc]] = config[requiredArgs[argc]];
    }
	
	if(typeof this.block == 'string'){//pass by id
		this.block = document.getElementById(this.block);
	}
	if(!this.selectAll){//default title element : first child which is title class
		this.selectAll = this.block.getElementsByClassName('selectAll').item(0);
	}
	if(!this.cancelAll){//default content element : first child which is content class
		this.cancelAll = this.block.getElementsByClassName('cancelAll').item(0);
	}
	if(!this.selectOptions){
		this.selectOptions= this.block.getElementsByClassName('selectOption');//get nodeList of selectOption
	}
	
	this.selectAll.onclick = function(here){return function(){// select all selectOption
		if(here.selectAll.checked == true){
			here.cancelAll.checked = false;
			for(index in here.selectOptions){
				if(typeof here.selectOptions[index] != 'object'){
					break;
				}
				here.selectOptions[index].checked = true;
			}
		}
		return true;
	}}(this);
	
	this.cancelAll.onclick = function(here){return function(){// cancel all select
		if(here.cancelAll.checked == true){
			here.selectAll.checked = false;
			for(index in here.selectOptions){
				if(typeof here.selectOptions[index] != 'object'){
					break;
				}
				here.selectOptions[index].checked = false;
			}
		}
		return true;
	}}(this);
	
	for(index in this.selectOptions){
		if(typeof this.selectOptions[index] != 'object'){
			break;
		}
		this.selectOptions[index].onclick = function(here){return function(){// cancel all select
			switch(this.checked){
				case true:
					here.cancelAll.checked = false;
					break;
				case false:
					here.selectAll.checked = false;
					break;
			}
			return true;
		}}(this);
	}
}
