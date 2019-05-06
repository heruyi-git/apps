/**
 * easyui util
 *
 * Copyright (c) 2016 org.uyi
 *
 */ 
var util = {
	/**
	 * 
	 * 自动完成查询
	 * id 控件ID
	 * remoteUrl 远程地址
	 * params 参数{}
	 * fields 字段[valueField,textField]
	 */
	autoQuery:function(id,remoteUrl,params,fields,height,width,defaultV) {// height if null
		if(!!!height){
			height = 21;
		}
		if(!!!width){
			width = 123;
		}
		 $("#"+id).combobox({
			mode:'remote',
			url:remoteUrl,
			valueField:fields[0],
	        textField:fields[1],
			//editable:true,
			//hasDownArrow:false,
			height:height,
			width:width,
			onBeforeLoad: function(param){
				if(!!param){
					$.each(params, function(k, v) {
						param[k] = v;
					});
					if(!!param.q){
						param[fields[1]] = param.q.trim();
						return true;
					}else{
						var text = $(this).combobox('getText');
						if(text){
							param[fields[0]] = text;
							return true;
						}
					}
				}
			},
			filter: function (q, row) {
	            var ret = false;
	            if (row[$(this).combobox('options').textField].indexOf(q) >= 0) {
	                ret = true;
	            }
	            return ret;
	        },
	        onLoadSuccess: function () { 
	            //var data = $(this).combobox("getData");
	            //$(data).each(function(i,val) { 
	            //});
	            //$(this).combobox("select", data[0]['id']);
	        }
	        //,formatter:function(data){
	            //return '<img class="item-img" src="'+data.url+'"/><span class="item-text">'+data.text+'</span>';
	       // }
		});
	},

	/**
	 * id,fields,data,defaultV,height,width
	 */
	combobox:function(id,fields,data,defaultV,height,width) {
		if(!!!height){
			height = 21;
		}
		if(!!!width){
			width = 123;
		}
		$('#'+id).combobox({
			valueField:fields[0],
	        textField:fields[1],
			data: data,
			filter: function(q, row){
				var opts = $(this).combobox('options');
				return row[opts.textField].indexOf(q) >= 0;
			},
			onLoadSuccess: function () { 
	            var data = $(this).combobox("getData");
	           // $(data).each(function(i,val) { 
	            //});
	            $(this).combobox("select", data[0][fields[1]]);
	        },
	        panelHeight:'auto'
	        //,onChange:function(newValue,oldValue){  
	        //}  
		});
	},
	// 根据已存在的元素创建window
	newWindow:function(windowId,formId,dataGridId){
		$('#'+windowId).dialog('open').dialog({
			closed: false,
	        draggable: true,
	        resizable: false,
	        modal: true,
	        buttons:[
	 	          {text: '保存',iconCls : 'icon-ok', handler: function() {
			          util.submit(formId,windowId,dataGridId);
		          }},
				  {text: '取消',iconCls : 'icon-cancel', handler: function() {
				 	 $('#'+windowId).dialog('close');
		   		  }}
		  		]
	       });
	 },
	 // 动态创建dialog
	 newDialog:function(id, url, title, width, height, icon,collapsible,maximizable,minimizable,resizable,modal,shadow,scroll,func){
		 $("#"+id).remove();
		 $("#"+id).dialog('destroy');
		 if (!scroll){
			 scroll = 'auto';
	    }
		 $("body").append("<div id='"+id+"' style='overflow: "+scroll+"' class='easyui-window'></div>");
		    if (!width){
		        width = 800;
		    }
		    if (!height){
		        height = 500;
		    }
		    if(!icon){
		    	icon = 'icon-right';
		    }
		    if (typeof(collapsible) == "undefined") {
		    	collapsible = false;
		    }
		    if (typeof(maximizable) == "undefined") {
		    	maximizable = true;
		    }
		    if (typeof(minimizable) == "undefined") {
		    	minimizable = false;
		    }
		    if (typeof(resizable) == "undefined") {
		    	resizable = false;
		    }
		    if (typeof(modal) == "undefined") {
		    	alert(modal);
		    	modal = true;
		    }
		    if (typeof(shadow) == "undefined") {
		    	shadow = false;
		    }
		    $("#"+id).dialog({
		        title: title,
		        width: width,
		        height: height,
		        cache: false,
		        iconCls: icon,
		        href: url,
		        collapsible: collapsible,
		        maximizable: maximizable,
		        minimizable:minimizable,
		        resizable: resizable,
		        modal: modal,
		        shadow: shadow,
		        closed: true,
		        onBeforeClose:function(){
		    		if($.isFunction(func)){
		    			 func();
		    		}
		       }
		    });
		    $("#"+id).dialog('open');
	 },
	 post : function(url,data){
		 $.messager.progress();
         $.post(url,data,function(msg){
			var result = msg;
        	$.messager.progress('close'); 
        	$.messager.show({
				title: '操作提示',
				height:'auto',
				msg: result.msg
			});
	   	 }, 'json').error(function(msg) {
	   		$.messager.progress('close'); 
			$.messager.alert('提示', '操作失败请刷新后重试！','error');
		 });
	 },
	 submit : function(formId,windowId,dataGridId){
		 $('#'+formId).form('submit',{
   			url: $(this).action,
   			onSubmit: function(){
     	   		var flag = $(this).form('validate');
     	   		if(flag){
     	   			$.messager.progress();
     	   		}
   				return flag;
   			},
   			success: function(msg){
   				var result;
   				if (!msg.match("^\{(.+:.+,*){1,}\}$")){
   					result = {msg:msg};
                 }
                 else{
                      //result = $.parseJSON(msg);
                      result = eval('('+msg+')');
                 }
   				if (result.msg){
   					$.messager.show({
   						title: '操作提示',
   						height:'auto',
   						msg: result.msg
   					});
   					if(!!dataGridId){
   						$('#'+dataGridId).datagrid('reload');    // reload the user data
   					}
   				} 
   				$.messager.progress('close'); 
   				if(!!windowId){
   					$('#'+windowId).dialog('close');        // close the dialog
   				}
   			}
   		});
	 },
	 /**
	  * 绑定指定元素的回车事件 
	  * @param id 主元素id
	  * @param element 子元素类型 (input/select/radio/...) 
	  * @param callMethod 回车后要执行的函数 
	  * @param eventName 键盘事件 (keyup/keydown/keypress...) 
	  */  
	 bindDOMEnterEvent:function(id, element, callMethod, eventName) {  
		 if(!eventName){
			 eventName = "keyup";
		 }
	     $("#" + id + " " + element).bind(eventName, function(event) {  
	         if (event.keyCode == '13') {  
	             callMethod();  
	         }   
	     });  
	 },
	 bindComboboxEnterEvent:function(id, callMethod) {  
		 $("#"+id).textbox('textbox').bind('keydown',function (event) {
	        if (event.keyCode == 13) {
	        	callMethod();
	        }
	    }); 
	 }
}