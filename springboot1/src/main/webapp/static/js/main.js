var zTree;
var setting = {
	view: {
		dblClickExpand: false,
		showLine: true,
		selectedMulti: false,
		expandSpeed: ($.browser.msie && parseInt($.browser.version)<=6)?"":"fast"
	},
	data: {
		key: {
			name: "resname"
		},
		simpleData: {
			enable:true,
			idKey: "resid",
			pIdKey: "parentid",
			rootPId: ""
		}
	},
	callback: {
		beforeClick: function(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("tree");
			if (treeNode.isParent) {
				zTree.expandNode(treeNode);
				return false;
			} else {
				addTab(treeNode.Id,treeNode.resname,treeNode.action);
				return true;
			}
		}
	
	}
};

/**
 * 创建新选项卡
 * @param tabId    选项卡id
 * @param title    选项卡标题
 * @param url      选项卡远程调用路径
 */
function addTab(tabId,title,url,icon){
	if(!url||url.length<12){
		return;
	}
	//如果当前id的tab不存在则创建一个tab
	if($('#centerTab').tabs("exists",title)==false){//if($("#"+tabId).html()==null)
		var name = 'iframe_'+tabId;
		$('#centerTab').tabs('add',{
			title: title,         
			closable:true,
			cache : false,
			iconCls:icon,
			//注：使用iframe即可防止同一个页面出现js和css冲突的问题
			content : '<iframe name="'+name+'"id="'+tabId+'"src="'+url+'" width="100%" height="100%" frameborder="0" scrolling="auto" ></iframe>'
		});
	}else{//选中	并重新加载		 
		$('#centerTab').tabs("select",title);
        var tab = $('#centerTab').tabs('getSelected');// 获取选中的 tab panel
        //var tab = tab22.panel('options').tab;    // 相应的 tab 对象????
        $('#centerTab').tabs('update',{
	        tab:tab,
	        options:{
	           title:title,
	           style:{padding:'1px'},
	       	   // 使用href:URL会导致页面加载两次，所以使用content代替
	           content:'<iframe name="'+tab.panel('options').name+'" id="'+tab.panel('options').id+'" src="'+$(tab.panel('options').content).attr('src')+'" frameborder="0" style="width:100%;height:100%;" scrolling="auto"></iframe>',
		       closable:true,
		       cache : false
	        }
        }); 
	}
}



//绑定tab的双击事件、右键事件  
function bindTabEvent(){  
	//绑定tab的双击事件
	$(".tabs-inner").live('dblclick',function(){  
		var subtitle = $(this).children("span").text();  
		if($(this).next().is('.tabs-close')){  
		$('#centerTab').tabs('close',subtitle);  
		}  
	});  
	//绑定tab的右键事件  
	$(".tabs-inner").live('contextmenu',function(e){  
		$('#tab_menu').menu('show', {  
		left: e.pageX,  
		top: e.pageY  
	});  
	//获取当前右键点击的tab标签的title
	var subtitle =$(this).children("span").text();  
	$('#tab_menu').data("currtab",subtitle);  
	//取消浏览器默认右键事件
	return false;  	
});  


}  

//绑定tab右键菜单事件
function bindTabMenuEvent() {
 //刷新    
 $("#tab_menu-refresh").click(function(){ 
 		var currtab_title = $('#tab_menu').data("currtab");
 		$('#centerTab').tabs('select',currtab_title);
        var tab = $('#centerTab').tabs('getSelected');   
        $('#centerTab').tabs('update',{
	        tab:tab,
	        options:{
	           title:currtab_title,
	           style:{padding:'1px'},
	       	   // 使用href:URL会导致页面加载两次，所以使用content代替
	           content:'<iframe name="'+tab.panel('options').name+'" id="'+tab.panel('options').id+'" src="'+$(tab.panel('options').content).attr('src')+'" frameborder="0" style="width:100%;height:100%;" scrolling="auto"></iframe>',
		       closable:true,
		       cache : false
	        }
        });               
  });
 //关闭当前
 $('#tab_menu-tabclose').click(function() {
  var currtab_title = $('#tab_menu').data("currtab");
  delTab(currtab_title);
 });
 //全部关闭
 $('#tab_menu-tabcloseall').click(function() {
  $('.tabs-inner span').each(function(i, n) {
   if ($(this).parent().next().is('.tabs-close')) {
    	var t = $(n).text();
    	$('#centerTab').tabs('close', t);
   }
  });
 });
 //关闭除当前之外的TAB
 $('#tab_menu-tabcloseother').click(function() {
  var currtab_title = $('#tab_menu').data("currtab");
  $('.tabs-inner span').each(function(i, n) {
   if ($(this).parent().next().is('.tabs-close')) {
    var t = $(n).text();
    if (t != currtab_title)
    	$('#centerTab').tabs('close', t);
   }
  });
 });
 //关闭当前右侧的TAB
 $('#tab_menu-tabcloseright').click(function() {  
    var index=-1;
    var rightArr=new Array();
 	var currtab_title = $('#tab_menu').data("currtab");
  	var tabs=$('#centerTab').tabs("tabs");	
	for(var i=0;i<tabs.length;i++){  
		var curTitle=tabs[i].panel('options').title;
		if(curTitle==currtab_title){
			index=i;
		}else{
			if(index>-1){
				rightArr.push(curTitle);
			}
				
		}
	}
	for(var j=0;j<rightArr.length;j++){  
		var rightTitle=rightArr[j];
		if($('#centerTab').tabs("exists",rightTitle)){  
  			$('#centerTab').tabs("close",rightTitle);
  		}		
	}	
	return false;
 });
 //关闭当前左侧的TAB
 $('#tab_menu-tabcloseleft').click(function() {
  var index=9999;
    var leftArr=new Array();
 	var currtab_title = $('#tab_menu').data("currtab");
  	var tabs=$('#centerTab').tabs("tabs");	
	for(var i=0;i<tabs.length;i++){  
		var curTitle=tabs[i].panel('options').title;
		if(curTitle==currtab_title){
			index=i;
		}else{
			if(i<index){
				leftArr.push(curTitle);
			}				
		}
	}
	for(var j=1;j<leftArr.length;j++){  
		var leftTitle=leftArr[j];
		if($('#centerTab').tabs("exists",leftTitle)){  
  			$('#centerTab').tabs("close",leftTitle);
  		}		
	}
 });
}

function delTab(currtab_title){
  if($('#centerTab').tabs("exists",currtab_title)){  
  		$('#centerTab').tabs('close', currtab_title);
  }
}

function openwin(win,option,callback){
	$(win).dialog(option);
	$(win).dialog({
		onClose:function(){
			if(callback&&$(this).dialog("options").callback){
				callback.call($(this));
			}
			$(this).dialog("destroy");
			$(".validatebox-tip").remove();
		},
		onMove:function(){
			$(".validatebox-tip").remove();
		}
	});
}

function topOpenMeg(head,mes,info){
	$.messager.alert(head,mes,info);
}

function showtips(data){
	for(var i=0;i<data.length;i++){
		var box=$(data[i].id);	
		tip=$("<div class=\"validatebox-tip\">"+"<span class=\"validatebox-tip-content\">"+"</span>"+"<span class=\"validatebox-tip-pointer\">"+"</span>"+"</div>").appendTo("body");
		tip.find(".validatebox-tip-content").html(data[i].msg);
		var _3af=tip.find(".validatebox-tip-pointer");
		var _3b0=tip.find(".validatebox-tip-content");
		tip.css("display","block");
		tip.css("top",box.offset().top-(_3b0._outerHeight()-box._outerHeight())/2);
		tip.css("left",box.offset().left+box._outerWidth());
	}
};

function showtip(selector,msg){
	var box=$(selector);	
	tip=$("<div class=\"validatebox-tip\">"+"<span class=\"validatebox-tip-content\">"+"</span>"+"<span class=\"validatebox-tip-pointer\">"+"</span>"+"</div>").appendTo("body");
	tip.find(".validatebox-tip-content").html(msg);
	var _3af=tip.find(".validatebox-tip-pointer");
	var _3b0=tip.find(".validatebox-tip-content");
	tip.css("display","block");
	tip.css("top",box.offset().top-(_3b0._outerHeight()-box._outerHeight())/2);
	tip.css("left",box.offset().left+box._outerWidth());
};


function getWidth(percent){ 
	var minWidth=0;
	if ( window.sidebar && "object" == typeof( window.sidebar ) && "function" == typeof( window.sidebar.addPanel ) ) {// firefox   
		minWidth=document.documentElement.clientWidth* percent;
	}else {//if ( document.all && "object" == typeof( window.external ) ){ //  ie   
	 	minWidth=document.body.clientWidth* percent;
	}
	if(minWidth<600)
		return 600;
    return minWidth;  
} 

function getHeight(percent){ 
	var minHeight=document.body.clientHeight-16;//* percent;
	if(minHeight<340)
		return 340;
    return minHeight;  
} 

function setBodyWidth(){
	document.getElementsByTagName('body')[0].style.width=getWidth(0.98);
	//document.getElementsByTagName('body')[0].style.height=getHeight(0.97);
}

function fitFrameWidth(){
	return document.body.clientWidth + 6;
}

function newWindow(winName,formName){
	$("#"+winName).show();
	$("#"+winName).dialog({
                width: 400,
                height: 300,
                draggable: true,
                resizable: false,
                modal: true,
                buttons:
                 [
 			        {text: '保存',handler: function() {
 			        	$('#'+formName).submit();
 			        }},
					{text: '取消',handler: function() {
						$("#"+winName).dialog('close');
 			        }}
   			    ]
            });
}

/*$(function(){
		$(window).resize(function(){
			$('#schPanel').panel('resize',{width:getWidth(0.96)});
			$("#grid").datagrid("resize",{width:getWidth(0.96)});
			setBodyWidth();
		}); 		
		setBodyWidth();			
		$('#schPanel').panel('resize',{width:getWidth(0.96)});
});*/