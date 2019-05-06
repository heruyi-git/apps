var convert = {
		format : Date.prototype.format = function (format) {  
			    var o = {  
			        "M+": this.getMonth() + 1, // month  
			        "d+": this.getDate(), // day  
			        "h+": this.getHours(), // hour  
			        "m+": this.getMinutes(), // minute  
			        "s+": this.getSeconds(), // second  
			        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
			        "S": this.getMilliseconds()  
			        // millisecond  
			    }  
			    if (/(y+)/.test(format))  
			        format = format.replace(RegExp.$1, (this.getFullYear() + "")  
			            .substr(4 - RegExp.$1.length));  
			    for (var k in o)  
			        if (new RegExp("(" + k + ")").test(format))  
			            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
			    return format;  
			},  
			formatDateMonth : function(value) {  
			    if (value == null || value == '') {  
			        return '';  
			    }  
			    var dt;  
			    if (value instanceof Date) {  
			        dt = value;  
			    } else {  
			        dt = new Date(value);  
			    }  
			  
			    return dt.format("yyyy-MM"); 
			} ,

			formatDateDay : function(value) {  
			    if (value == null || value == '') {  
			        return '';  
			    }  
			    var dt;  
			    if (value instanceof Date) {  
			        dt = value;  
			    } else {  
			        dt = new Date(value);  
			    }  
			  
			    return dt.format("yyyy-MM-dd");
			} ,

			formatDateTime : function(value) {  
			    if (value == null || value == '') {  
			        return '';  
			    }  
			    var dt;  
			    if (value instanceof Date) {  
			        dt = value;  
			    } else {  
			        dt = new Date(value);  
			    }  
			    return dt.format("yyyy-MM-dd hh:mm:ss"); 
			} ,
			formatPercent: function(value){
				if (value){
				  	var color = "#cc0000;";
				  	if(value=="100.00"){
				  		color="green;";
	    			}
			    	var s = '<div style="width:100%;border:1px solid #ccc">' +
			    			'<div style="width:' + value + '%;background:'+color+'color:#fff">' + value + '%' + '</div>'
			    			'</div>';
			    	return s;
		    	} else {
			    	return '';
		    	}
			},
			getDataName : function(value,row,idx) { 
			    if (value == null || value == '') {  
			        return '';  
			    }  
				var dataName;
				$.ajaxSetup({   
		            async : false  
		        }); 
				$.get(getRootPath()+"/common/getData.json?key="+this.field+"&value="+value,function(msg){
					dataName =  msg.dataName;
				});
			    return dataName; 
			},
			getDataName2 : function(value,list) { 
			    if (value == null || value == '') {  
			        return '';  
			    }  
				for(var i in list)
			    {
				    if(value==list[i].dataValue){
					    return list[i].dataName;
				    }
			    }
			    return ''; 
			},
			getDataIcon : function(value) { 
			    if (value == null || value == '') {  
			        return '';  
			    }  
				var data;
				$.ajaxSetup({   
		            async : false  
		        }); 
				$.get(getRootPath()+"/common/getData.json?key="+this.field+"&value="+value,function(msg){
					data =  msg;
				});
			    return '<span class="'+data.dataIcon+'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
			},
			getCustomName : function(value) { 
			    if (value == null || value == '') {  
			        return '';  
			    }  
				var dataName;
				$.ajaxSetup({   
		            async : false  
		        }); 
				$.get(getRootPath()+"/s/getCustom.json?id="+value,function(msg){
					dataName =  msg.customName;
				});
			    return dataName; 
			}
 };

// root path
var rootPath = null;
function getRootPath(){
	if(rootPath == null){
		var strFullPath=window.document.location.href; 
		var strPath=window.document.location.pathname; 
		var pos=strFullPath.indexOf(strPath); 
		var prePath=strFullPath.substring(0,pos); 
		var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1); 
		return (prePath+postPath); 
	}
	return rootPath;
} 

