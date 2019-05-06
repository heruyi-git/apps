/**
 * pop.js is a simple show messageBox util
 * 
 * @version 0.0.1
 * @author hry date[2009-2-27]
 * 
 *  *	<USE Descript>
 *	param controId is active, example: param is var
 *	display one: showMessageBox(controlId); 
 *	display two: showMessageBox("string","strContent"||strObject); or showMessageBox("documentElement","strContent");
 *	display three: showMessageBox("string","strContent",width);
 *	display four: showMessageBox("string","strContent",width,event);
 *	display five: showMessageBox("string","strContent",width,left,top);
 *	display six: showMessageBox("string","strContent",width,left,top,btnClose);
 *     display seven: showMessageBox("string","strContent",width,left,top,btnClose,event,cssText);
 *	--------------------------------------------------------------------
 *	setBoxStyle one:defineTop(topDiv);
 *	setBoxStyle two:setTopStyle(cssStyle)
 *	setBoxStyle three:setContentStyle(cssStyle)
 *	setBoxStyle four:setButtomStyle(cssStyle);
 *	setBoxStyle five:setDrag(boolean);
 *     setBoxStyle six:isBack = boolean;
********************************************************************************************/

/********************
 * 取窗口滚动条高度 
 ******************/
function getScrollTop()
{
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}


var isIe = (document.all) ? true : false;
var isBack = true;
var box = {drag:false};
var IEversion = (isIe) ? parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE ") + 5, navigator.userAgent.indexOf(";", navigator.userAgent.indexOf("MSIE ")))) : 0;
function setSelectState(state) {
	var objl = document.getElementsByTagName("select");
	for (var i = 0; i < objl.length; i += 1) {
		objl[i].style.visibility = state;
	}
}
function mousePosition(ev) {ev = getEvent();
	var scrollHight = getScrollTop();
	return {x:ev.x || ev.pageX, y:ev.y+scrollHight || ev.pageY};
	if (ev.pageX || ev.pageY) {
		return {x:ev.pageX, y:ev.pageY};
	}
	return {x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, y:ev.clientY + document.body.scrollTop - document.body.clientTop};
}
 function getEvent() { 
       return window.event || arguments.callee.caller.arguments[0]; 
} 
function showMessageBox(title, content, width, left, top, closeImgUrl, cssStyle, buttom,ev) {
	if (title == null) {
		title = "&nbsp;";
		content = "&nbsp;";
	}
	if (title != null && content == null) {
		if (title.innerHTML != null) {
			content = title.innerHTML;
		} else {
			content = title;
		}
		title = "\u63d0\u793a\u4fe1\u606f";
	}
	this.box = {box_header:title != null && title.innerHTML == null && (/[\d]+/.exec(title)) == null ? title : (/[\d]+/.exec(title)) != null ? title : "&nbsp;", box_body:content != null && content.innerHTML != null ? content.innerHTML : (/[\w]+/.exec(content)) != null && title.innerHTML != null ? title.innerHTML : content, box_width:width != null ? width : 300, box_pos:[{x:left != null ? left : 300, y:top != null ? top : 150}], box_btnClose:closeImgUrl == null ? "<img id='winBtnClose' onmouseover='' style='cursor:handle;' src='image/yhtk01.gif' onclick='closeWindow();' title='\u5173\u95ed' alt='\u5173\u95ed\u7a97\u53e3'/>" : "<a onmouseover='' style='cursor:point;' onclick='closeWindow();' title='\u5173\u95ed' alt='\u5173\u95ed\u7a97\u53e3'/>\u5173\u95ed</a>", box_event:ev || window.event, box_buttom:buttom || "&nbsp;"};
	if (IEversion != 0 && IEversion < 7) { 
		setSelectState("hidden");
	}
	if(!top && !left)
	{
		this.box.box_pos[0] = mousePosition(this.box.box_event);
	}
	var bWidth = (isIe) ? parseInt(document.body.scrollWidth) : parseInt(document.body.scrollWidth) - 17;
	var bHeight = parseInt(document.body.scrollHeight);
	var back = document.createElement("div");
	if(this.isBack){
		back.id = "back";
		var styleStr = "top:0px;left:0px;position:absolute;background:#EAEAEC;width:" + bWidth + "px;height:" + bHeight + "px;";
		styleStr += (isIe) ? "filter:alpha(opacity=70);" : "opacity:0.40;";
		back.style.cssText = styleStr;
		//document.body.appendChild(back);
		showBackground(back, 70);
	}
	var mesW = document.createElement("div");
	mesW.id = "mesWindow";
	var mesWheader = document.createElement("div");
	mesWheader.id = "windowTopDiv";
	var mesWbody = document.createElement("div");
	mesWbody.id = "contentDiv";
	var mesWbuttom = document.createElement("div");
	mesWbuttom.id = "mesWindowBottom";
	document.body.appendChild(mesW);
	//mesW.appendChild(mesWheader);
	mesW.appendChild(mesWbody);
	//mesW.appendChild(mesWbuttom);
	//mesWheader.innerHTML = "<table cellspacing='0' cellpadding='0' style='background-image:url(admin/images/f2.gif);background-color:#C2CFF1;width:" + this.box.box_width + "px;height:100%;'><tr id='windowTopTable'><td><span >" + this.box.box_header + "</span></td><td align='right' width='60'>" + this.box.box_btnClose + "</td></tr></table>";
	//if (IEversion != 0 && IEversion < 7) { 
		if(content.parentNode!=null){  			
			var temp = content;
			temp.parentNode.removeChild(temp);
			mesWbody.appendChild(temp);
			temp.style.display = "block";
		}else{
			mesWbody.innerHTML = this.box.box_body;
		}
	//} else {
	//	mesWbody.innerHTML = this.box.box_body;
	//}
	mesWbuttom.innerHTML = this.box.box_buttom;
	styleStr = "background-color: #EBEFF9;border: 1px solid #C2CFF1;border-radius: 2px;-moz-border-radius: 2px;-webkit-border-radius: 2px; left:" + (((this.box.box_pos[0].x - this.box.box_width) > 0) ? (this.box.box_pos[0].x - this.box.box_width) : this.box.box_pos[0].x) + "px;top:" + (this.box.box_pos[0].y) + "px;position:absolute;width:" + this.box.box_width + "px;";
	styleStr += (isIe) ? "filter:alpha(opacity=100);" : "opacity:100;";
	mesW.style.cssText = cssStyle != null ?  cssStyle : styleStr;
}

function initBox(drag){
/*	var drag = true;
	var topStyle = "background-color:#acceac;filter:Alpha(Opacity=30);opacity:0.3;background-color:#002244;z-index:101;height:20px;font:12px '宋体';color:#ccaa11";
	var buttomStyle = "width:302px;background-color:#acceac;filter:Alpha(Opacity=30);opacity:0.3;background-color:#002244;z-index:101;height:1px;font:12px '宋体';color:#ccaa11";
	var width=302;
	var left=295;
	var top=130;
*/
	if(drag!=null){
		setDrag(drag);
	}else{
		setDrag(true);
	}
	setTopStyle("background-image:url(admin/images/qzone.gif);filter:Alpha(Opacity=30);opacity:0.3;z-index:101;height:20px;font:12px '宋体';color:#ccaa11");
	setButtomStyle("width:302px;background-color:#acceac;filter:Alpha(Opacity=30);opacity:0.3;background-color:#002244;z-index:101;height:1px;font:12px '宋体';color:#ccaa11");
}

function closeWindow() {
	//if (IEversion != 0 && IEversion < 7) {
		if(document.getElementById("contentDiv").firstChild!=null){
			var saveTemp = document.getElementById("contentDiv").firstChild;
			if(saveTemp.nodeType==1){
				document.body.appendChild(saveTemp);saveTemp.style.display = "none";
			}
		}
	//} else {
		if (document.getElementById("mesWindow") == null) {
			removeBox();
		} else {
			showBackgroundBack(document.getElementById("mesWindow"), 11, true);
		}
	//}
	//window.location.reload();
	setSelectState("");
}

function showBackgroundBack(obj, endInt, flag) {
	var objOp = obj.filters == null ? obj.style : obj.filters.alpha;
	if (flag) {
		var number = parseInt(Math.random(100) * 100);
		objOp.opacity = number > 50 ? number : 50;
		flag = false;
	}
	objOp.opacity -= 6;
	if (objOp.opacity > endInt) {
		setTimeout(function () {
			showBackgroundBack(obj, endInt);
		}, 6);
	} else {
		removeBox();
	}
}

function showBackground(obj, endInt) {
	if (obj.filters != null) {
		obj.filters.alpha.opacity += 1;
		if (obj.filters.alpha.opacity < endInt) {
			setTimeout(function () {
				showBackground(obj, endInt);
			}, 6);
		}
	}
}

function removeBox() {
	if (document.getElementById("back") == null && document.getElementById("mesWindow") == null) {
		var temp = window.frames.top.document.getElementById("back");
		var temp2 = window.frames.top.document.getElementById("mesWindow");
		temp.parentNode.removeChild(temp);
		temp2.parentNode.removeChild(temp2);
		return;
	}
	if (document.getElementById("back") != null) {
		document.getElementById("back").parentNode.removeChild(document.getElementById("back"));
	}
	if (document.getElementById("mesWindow") != null) {
		document.getElementById("mesWindow").parentNode.removeChild(document.getElementById("mesWindow"));
	}
}


function defineTop(topDiv) {document.getElementById("windowTopDiv").innerHTML = (topDiv != null) ? topDiv.innerHTML : "";}
function setTopStyle(cssStyle) {document.getElementById("windowTopTable").style.cssText = (cssStyle != null) ? cssStyle : "";}
function setContentStyle(cssStyle) {document.getElementById("mesWindow").style.cssText = cssStyle != null ? cssStyle : styleStr;}
function setButtomStyle(cssStyle) {document.getElementById("mesWindowBottom").style.cssText = cssStyle != null ? cssStyle : "height:0px;";}

function setDrag(flag) {
	this.box.drag = flag;
	if (this.box.drag) {
		var tag = false;
		var drag = document.getElementById("mesWindow");
		var header = document.getElementById("windowTopDiv");
		!tag ? header.onmousedown = function (e) {
			e = e || getEvent();
			if(isIe){
				drag.setCapture();
			}
			var pos = {x:0, y:0};
			var gap = {x:0, y:0};
			pos.x = e.clientX;
			pos.y = e.clientY;
			gap.x = e.clientX - drag.offsetLeft;
			gap.y = e.clientY - drag.offsetTop;
			tag = true;
			tag ? document.body.onmousemove = function (e) {
				e = e || getEvent();
				drag.style.cursor = "move";
				pos.x = e.clientX - gap.x;
				pos.y = e.clientY - gap.y;
				drag.style.left = pos.x + "px";
				drag.style.top = pos.y + "px";
			} : false;
			tag ? document.body.onmouseup = function (e) {
				tag = false;
				if(isIe){
					drag.releaseCapture();
				}
				drag.style.cursor = "default";
				if(document.getElementById('winBtnClose')){
					document.getElementById('winBtnClose').style.cursor="pointer";
				}
				document.body.onmousemove = null;
			} : false;
		} : true;
	}
}