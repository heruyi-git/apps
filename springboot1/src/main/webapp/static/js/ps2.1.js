var loads = [], $$_ = function (doc) {if (doc == null) {return;}var wd = doc.nodeType == 9 ? window : null;wd.onload = function () {for (var i in loads) {loads[i]();}};
	return {ready:function (fc) {
		loads.push(fc);
	}};
};
function _(id) {
	var tempId = id;id = $$.isString(id) && id.search(/\#/) == 0 ? $$ : $$._(id);if (id instanceof Object) {$$.ename = $$._(tempId.substring(1));}
	return id;
}
var $$ = {isIe:(document.all) ? true : false, eSubmit:null, ename:null, elements:null, eventName:"submit", 
validate:function (fnc) {this.frm = this.ename || null;this.delEvent = ""; 	this.showBox = false; this.showLable = true; this.isPass = true;this.cssStyle = "color:red";
this.init(fnc);
}, init:function (fnc) {var data = this.messages();
	String.prototype.required = function () {
		return this.trim() != "" ? null : data.required;
	};
	String.prototype.regexp = function (str) {
		if (str != null) {
			var pattern = new RegExp(str);
			return pattern.exec(this) != null ? null : data.regexp;
		} else {
			return data.regexp;
		}
	};
	String.prototype.isDigit = function () {
		return (/^\d+$/).test(this) || this.trim() == "" ? null : data.isDigit;
	};
	String.prototype.isLength = function (i, j) {
		i = i.toString();
		i = i.substring(1, i.length - 1);
		var i_j = i.split(/\D/);
		i = parseInt(i_j[0]);
		if (i_j.length == 2) {
			j = parseInt(i_j[1]);
		}
		return ("number" == typeof i ? this.length >= i : true) && ("number" == typeof j ? this.length <= j : true) || this.trim() == "" ? null : data.isLength;
	};
	String.prototype.isIdCard = function () {
		return (/^\d{15}(\d{2}[\d|X|x])?$/).test(this) || this.trim() == "" ? null : data.isIdCard;
	};
	String.prototype.isTelephone = function () {
		return (/^(\d{4}[-]\d{7})$|^(\d{3}[-]\d{8})$|^(\d{7,8})$/).test(this) || this.trim() == "" ? null : data.isTelephone;
	};
	String.prototype.isMobilephone = function () {
		return (/^[1][3|5]\d{9}$/).test(this) || this.trim() == "" ? null : data.isMobilephone;
	};
	String.prototype.isPostcode = function () {
		return (/^\d{6}$/).test(this) || this.trim() == "" ? null : data.isPostcode;
	};
	String.prototype.isMoney = function () {
		return (/^\d+(([.]?\d{1,2}$)|(\d*$))/).test(this) || this.trim() == "" ? null : data.isMoney;
	};
	String.prototype.isAge = function () {
		return (/^[1-9][0-9]?$/).test(this) || this.trim() == "" ? null : data.isAge;
	};
	String.prototype.trim = function () {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	};
	String.prototype.isChinese = function (i, j) {
		return !(/[^\u4E00-\u9FA5]+/).test(this) && ("number" == typeof i ? this.length >= i : true) && ("number" == typeof j ? this.length <= j : true) ? null : data.isChinese;
	};
	String.prototype.isUserName = function (i, j) {
		return (/^[_|a-zA-Z]+\w*$/).test(this) && ("number" == typeof i ? this.length >= i : true) && ("number" == typeof j ? this.length <= j : true) || this.trim() == "" ? null : data.isUserName;
	};
	String.prototype.isEmail = function (regex) {
		return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this) || this.trim() == "" ? null : data.isEmail;
	};
	String.prototype.isDateTime = function () {
		if (this.search(/[a-zA-Z]/g) != -1) {
			return data.isDateTime;
		}
		try {
			var arr = this.search(/\D/) ? this.split(/\D/) : [];
			arr[1] = arr[1] - 1;
			eval("var d=new Date(" + arr.join(",") + ")");
			if (arr.length < 5) {
				return (Number(arr[0]) == d.getFullYear() && Number(arr[1]) == d.getMonth() && Number(arr[2]) == d.getDate()) || this.trim() == "" ? null : data.isDateTime;
			} else {
				return (Number(arr[0]) == d.getFullYear() && Number(arr[1]) == d.getMonth() && Number(arr[2]) == d.getDate() && Number(arr[3]) == d.getHours() && Number(arr[4]) == d.getMinutes() && Number(arr[5]) == d.getSeconds()) || this.trim() == "" ? null : data.isDateTime;
			}
		}
		catch (e) {
			if (this.length > 0) {
				return data.isDateTime;
			}
		}
	};
	String.prototype.isUrl = function () {
		return (/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/).test(this) || this.trim() == "" ? null : data.isUrl;
	};
	String.prototype.isURL = function () {
		var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" + "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
		var re = new RegExp(strRegex);
		return /^([a-zA-Z]){1}:(\\.+)*(\\)?$/.test(this) || re.test(this) || this.trim() == "" ? null : data.isURL;
	};
	String.prototype.isSafe = function () {
		return (/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/).test(this) || this.trim() == "" ? null : data.isUrl;
	};
	String.prototype.isNotChinese = function () {
		return !/[\u4E00-\u9FA5]+/.test(this) || this.trim() == "" ? null : data.isNotChinese;
	};
	return fnc();
}, _:function (id) {return id = document.getElementById(id) || document.all(id);
}, isString:function (obj) {return "string" == typeof obj;
}, isFunction:function (obj) {return obj instanceof Function;
}, isArray:function (obj) {return obj instanceof Array;
}, isMap:function (obj) {return obj instanceof Object;
}, isUndefined:function (obj) {return ("undefined" == typeof obj);
}, isRegExp:function (obj) {return obj instanceof RegExp;
}, getXmlHttpRequest:function () {return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();}, post:function (url, params, func) {if (this.isFunction(params)) {func = params;params = null;}return this.ajax("POST", url, params, func, this.parseString(params, url));}, get:function (url, params, func) {if (this.isFunction(params)) {func = params;params = null;}return this.ajax("GET", url, params, func, this.parseString(params, url));
}, ajax:function (method, url, params, func, sendString) {var self = this;var xmlHttpRequest = self.getXmlHttpRequest();xmlHttpRequest.onreadystatechange = function () {if (func instanceof Function && xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {return func(xmlHttpRequest.responseText);}};if(method=="GET"){xmlHttpRequest.open(method, url+(sendString==null?"":sendString), true);sendString = null;}else{xmlHttpRequest.open(method, url, true);}xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");xmlHttpRequest.send(sendString);if (func instanceof Function && xmlHttpRequest.readyState == 4) {return func(xmlHttpRequest.responseText);}return self.retMsg;
}, parseString:function (obj, url) {if (obj instanceof Object) {var str = url.search(/\?/) != -1 ? "&" : "";for (var j in obj) {str += j + "=" + obj[j] + "&";}return str.substring(0, str.length - 1);}return obj;}, getXMLDocument:function () {return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLDOM") : new XMLHttpRequest();
}, getDocument:function (url, func, asyn) {var retDoc, xmlDoc = $$.getXMLDocument();if (this.isIe) {xmlDoc.async = asyn || false;xmlDoc.load(url);retDoc = xmlDoc;} else {xmlDoc.open("GET", url, asyn || false);xmlDoc.send(null);retDoc = xmlDoc.responseXML;}return func(retDoc);
}, addEvent:function (elm, evnt, fn) {elm = elm || this.ename;if (document.addEventListener) {elm.addEventListener(evnt, fn, false);} else {if (document.attachEvent) {elm.attachEvent("on" + evnt, fn);}}
}, removeEvent:function (elm, evnt, fn) {elm = elm || this.ename;if (document.removeEventListener) {elm.removeEventListener(evnt, fn, false);} else {if (document.detachEvent) {elm.detachEvent("on" + evnt, fn);}}
}, bind:function (obj, type, hasEv, hasFcEv) {var self = this;if (!self.isString(type)) {hasFcEv = hasEv;hasEv = type;type = "post";}this.ename.method = type || "post";hasEv = (self.isUndefined(hasEv) || hasEv) ? true : false;hasFcEv = (self.isUndefined(hasFcEv) || hasFcEv) ? true : false;self.elements = obj;var data = self.messages();if (hasEv) {self.regEvent(self.elements, data, hasFcEv);} else {self.isPass = false;}self.ename.onsubmit = function () {var ev = self.getEvent();if (self.eSubmit == null) { return self.retSubmit(self.evalSubmit(self.elements, data));}if (self.isIe) {for (var ev in event) {if (ev == "srcElement") {if (event[ev] == self.eSubmit) {return self.retSubmit(self.evalSubmit(self.elements, data));}}}} else {if (ev != null) {if (ev.target == self.eSubmit) {return self.retSubmit(self.evalSubmit(self.elements, data));}}}};
}, getEvent:function () {if (self.isIe) {return window.event;}c = this.getEvent.caller;while (c != null) {var arg0 = c.arguments[0];if (!this.isUndefined(arg0)) {if (arg0.toString().indexOf("Event") != -1) {return arg0;}}c = c.caller;}return null;}, retSubmit:function (errOut) {var str = "";var isPassTemp = false;var self = this;var errObj = null;for (var out in errOut) {if (errObj == null) {errObj = self._(out);}if(self.showBox==false && self.isPass){self._(out).focus();}str += "" + out + " : " + errOut[out] + "\n";}isPassTemp = str == "" ? true : false;if (!isPassTemp && self.showBox && self.isPass) {alert(str);}if (errObj != null) {errObj.focus();if(this.isMatch(errObj.type, ["text", "textarea", "password"]))errObj.select();}return (self.isPass && isPassTemp) || !self.isPass;
}, regEvent:function (arr, data, hasFcEv) {var self = this;if (this.isUndefined(arr["messages"])) {arr["messages"] = {};}for (var i in arr) {if (i == "elements") {for (var j in arr[i]) {(function (j) {var tempValue = arr[i][j];var pattern = null;if (self.isRegExp(tempValue["regexp"])) {pattern = tempValue["regexp"];} else {if (self.isRegExp(tempValue["isLength"])) {pattern = tempValue["isLength"];}}switch (self._(j).type) {case "text":self.eventProxy(self._(j), ["keyup", "blur"], j, arr["messages"][j], tempValue, pattern, data, hasFcEv);break;case "password":self.eventProxy(self._(j), ["keyup", "blur"], j, arr["messages"][j], tempValue, pattern, data, hasFcEv);break;case "textarea":self.eventProxy(self._(j), ["keyup", "blur"], j, arr["messages"][j], tempValue, pattern, data, hasFcEv);break;case "select-one":self.eventProxy(self._(j), ["change"], j, arr["messages"][j], tempValue, pattern, data, hasFcEv);break;case "file":self.eventProxy(self._(j), ["change"], j, arr["messages"][j], tempValue, pattern, data, hasFcEv);break;case "button":self.eventProxy(self._(j), ["click"], j, arr["messages"][j], tempValue, pattern, data, hasFcEv);break;case "image" || "checkbox" || "reset":self.eventProxy(self._(j), ["click"], j, arr["messages"][j], tempValue, pattern, data, hasFcEv);break;}})(j);}}}
}, eventProxy:function (el, evs, j, arr, tempValue, pattern, data, hasFcEv) {var self = this;if (self.isFunction(tempValue) && !hasFcEv) {return tempValue(el);}for (var ev in evs) {if(evs[ev]==self.delEvent){continue;}self.addEvent(el, evs[ev], function () {if (!self.isMap(tempValue)) { var tempMsg = self.validateElement(el, tempValue, pattern, data);if(self.showLable){if (tempMsg != null) {var newElement = document.createElement("label");newElement.style.cssText = self.cssStyle;newElement.id = j + "msg";if (arr == tempValue) {newElement.innerHTML = tempMsg;} else {newElement.innerHTML = arr || tempMsg;}if (document.getElementById(j + "msg")) {document.getElementById(j + "msg").parentNode.removeChild(document.getElementById(j + "msg"));}var parent = el.parentNode;if (!self.isUndefined(el.nextSibling)) {parent.insertBefore(newElement, el.nextSibling);}} else {if (document.getElementById(j + "msg")) {document.getElementById(j + "msg").parentNode.removeChild(document.getElementById(j + "msg"));}}}} else {if (self.isFunction(tempValue)) {return self.validateElement(el, tempValue, pattern, data);}for (var n in tempValue) {var tempMsgByFucRet = true;var tempMsg;if (self.isFunction(tempValue[n])) {tempMsgByFucRet = self.validateElement(el, tempValue[n], pattern, n);}if(tempMsgByFucRet==true){tempMsg = self.validateElement(el, n, pattern);}else if(self.isUndefined(tempMsgByFucRet)||tempMsgByFucRet==null){tempMsg = null;}else{tempMsg = tempMsgByFucRet;}if(self.showLable){if (tempMsg != null && (tempValue[n] || /^\/.+\/$/.test(tempValue[n]))) {var newElement = document.createElement("label");newElement.style.cssText = self.cssStyle;newElement.id = j + "msg";if (document.getElementById(j + "msg")) {document.getElementById(j + "msg").parentNode.removeChild(document.getElementById(j + "msg"));}if (tempMsg == data.required) {newElement.innerHTML = tempMsg;} else {if (arr == tempValue) {newElement.innerHTML = tempMsg;} else {newElement.innerHTML = arr || tempMsg;}}var parent = el.parentNode;if ("undefined" != typeof el.nextSibling) {parent.insertBefore(newElement, el.nextSibling);}} else {if (document.getElementById(j + "msg")) {document.getElementById(j + "msg").parentNode.removeChild(document.getElementById(j + "msg"));}}}if(tempMsg!=null){break;}}}});}
}, validateElement:function (key, value, pattern, data) {var self = this;if (this.isFunction(value)) {if (!self.isMap(data)) {return value(key);}return value(self.retSubmit(self.evalSubmit(self.elements, data)));}if (!this.isUndefined(pattern) && pattern != null) {return key.value[value](pattern);}return key.value[value]();
}, evalSubmit:function (arr, data) {var errOut = {};var elementInfo = {};if (this.isUndefined(arr["messages"])) {arr["messages"] = {};}for (var i in arr) {if (i == "elements") {for (var j in arr[i]) {var list = this._(j);var pattern = null;if (this.isRegExp(arr[i][j]["regexp"])) {pattern = arr[i][j]["regexp"];} else {if (this.isRegExp(arr[i][j]["isLength"])) {pattern = arr[i][j]["isLength"];}else if(this.isFunction(arr[i][j])){var funcRet = arr[i][j]();if(funcRet!=true){elementInfo[j] = funcRet;}}}if (this.isMap(arr[i][j])) {for (var n in arr[i][j]) {if (arr[i][j][n]==true||this.isRegExp(arr[i][j][n])||this.isFunction(arr[i][j][n])) {var tempMsg;if(n.search("#")!=-1){tempMsg = arr[i][j][n](this._(j));}else{tempMsg = pattern==null&&this.isFunction(arr[i][j][n])?arr[i][j][n](this._(j)):list.value[n](pattern);}if (tempMsg != null) {elementInfo[j] = tempMsg;break;}}}} else {var tempMsg = list.value[arr[i][j]](pattern);if (tempMsg != null) {elementInfo[j] = tempMsg;}}}}if (i == "messages") {var hasElement = 0;for (var err in elementInfo) {if (arr[i][err] != "") {for (var msg in arr[i]) {hasElement = hasElement + 1;if (data.required == elementInfo[err]) {errOut[err] = elementInfo[err];break;} else {errOut[err] = arr[i][err] || elementInfo[err];}}}}if (hasElement == 0) {for (var err in elementInfo) {errOut[err] = elementInfo[err];}}}}return errOut;
}, messages:function () {return {required:"*", regexp:"\u8f93\u5165\u4e0d\u7b26\u5408\u8981\u6c42", isURL:"\u9519\u8bef\u7684URL\u5730\u5740", isUrl:"\u975e\u6cd5\u5730\u5740", isSafe:"\u5bc6\u7801\u8fc7\u4e8e\u7b80\u5355", isLength:"\u8f93\u5165\u957f\u5ea6\u4e0d\u7b26\u5408\u8981\u6c42", isDigit:"\u4e0d\u80fd\u5305\u542b\u975e\u6570\u5b57\u5185\u5bb9", isIdCard:"\u8eab\u4efd\u8bc1\u683c\u5f0f\u4e0d\u5408\u6cd5", isTelephone:"\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e", isMobilephone:"\u624b\u673a\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e", isPostcode:"\u90ae\u653f\u7f16\u7801\u4e0d\u5408\u6cd5", isMoney:"\u5fc5\u987b\u4e3a\u94b1\u6570\u5b57", isAge:"\u5e74\u9f84\u8d85\u51fa\u6307\u5b9a\u8303\u56f4", isChinese:"\u4e0d\u662f\u5408\u6cd5de\u4e2d\u6587\u5b57fu", isNotChinese:"\u4e0d\u80fd\u5305\u542b\u4e2d\u6587\u5b57\u7b26", isUserName:"\u7528\u6237\u540d\u4e0d\u5408\u6cd5", isEmail:"Email\u683c\u5f0f\u4e0d\u6b63\u786e", isDateTime:"\u4e0d\u5408\u6cd5\u7684\u65e5\u671f\u683c\u5f0f"};
}, serialize:function () {var _frm = this.frm || this.ename;var frmElements = {};for (var i in _frm.elements) {if (_frm[i] != null) {if(_frm[i].nodeType == 1){if (!this.isUndefined(_frm[i].name) && this.isMatch(_frm[i].type, ["text", "hidden", "select-one", "textarea", "password"])){if (!frmElements[_frm[i].name]) {frmElements[_frm[i].name] = [];}else {continue;}frmElements[_frm[i].name].push(_frm[i].value);}else if (!this.isUndefined(_frm[i].name) && this.isMatch(_frm[i].type, ["checkbox"])) {if (!frmElements[_frm[i].name]) {frmElements[_frm[i].name] = [];} else {continue;}if(_frm[i].checked)frmElements[_frm[i].name].push(_frm[i].value);}}if(_frm[i][0] != null){if(_frm[i][0].nodeType==1){if (!this.isUndefined(_frm[i][0].name) && this.isMatch(_frm[i][0].type, ["radio"])) {if (!frmElements[_frm[i][0].name]) {frmElements[_frm[i][0].name] = [];} else {continue;}var count = 0;while(_frm[i][count]){if(_frm[i][count].checked){frmElements[_frm[i][count].name].push(_frm[i][count].value);}count=count+1;}}}}}}return frmElements;
}, show:function () {var str = "";var arr = this.serialize();for (var i in arr) {str += "\t{ name : " + i + " \t,value : " + arr[i] + " }\n";}alert(str);}, isMatch:function (str, arr) {if (this.isArray(arr)) {for (var i in arr) {if (arr[i] == str) {return true;}}return false;}},isEmpty:function(str){return (str==null||str==""||$$.isUndefined(str));}
};


