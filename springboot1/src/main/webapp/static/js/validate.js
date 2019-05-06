// datagrid validate
$.extend($.fn.validatebox.defaults.rules, {
   	 isPhone: {
   	    validator: function(value){
    	    return /^[1][3|5]\d{9}$/.test(value);
   	    },
   	    message: '手机号码格式有误'
   	  },
   	  
   	  isMoney: {
 	    validator: function(value){
   		  return (/^(-?\d+)(([.]?\d{1,2}$)|(\d*$))/).test(value);
 	    },
 	    message: '金额格式有误'
   	  },
   	  
   	isDouble: {
	    validator: function(value){
	 		  return (/^(-?\d+)(([.]?\d{1,2}$)|(\d*$))/).test(value);
	    },
	    message: '浮点型格式有误'
 	  },
   	  
   	 isRate: {
   	    validator: function(value){
     		  return (/^(([0]{1}[.]\d{1,2})|[1])$/).test(value);
   	    },
   	    message: '折扣格式有误'
     },
     CHS: {  
         validator: function (value) {  
             return /^[\u0391-\uFFE5]+$/.test(value);  
         },  
         message: '只能输入汉字'  
     },  
     checkIp : {
         validator : function(value) {  
             var reg = /^((1?\d?\d|(2([0-4]\d|5[0-5])))\.){3}(1?\d?\d|(2([0-4]\d|5[0-5])))$/ ;  
             return reg.test(value);  
         },  
         message : 'IP地址格式不正确'  
     },
   	 length: {
 	    validator: function(value,y){
   		  	var i,j;
   		  	var idx = y.toString().indexOf(',');
   		  	if(idx!=-1){
   		  		i = parseInt(y.toString().substring(0,idx));
   		  		j = parseInt(y.toString().substring(idx+1,y.toString().length));
   		  		return ("number" == typeof i ? value.length >= i : false) && ("number" == typeof j ? value.length <= j : false);
   		  	}else{
   		  		i = parseInt(y.toString());
   		  		return value.length == i;
   		  	}
 	    },
 	    message: '字符长度不符合要求'
   	  },
   	  isDigit: {
   	    validator: function(value){
     		  return (/^\d+$/).test(value);
   	    },
   	    message: '必须为数字'
 	  },
 	 isNDigit: {
	    validator: function(value){
		  return (/^-?\d+$/).test(value);
	    },
	    message: '必须为自然数'
 	  },
      equalTo: {
 		  validator: function (value, param) { 
 		  		return $(param[0]).val() == value; 
 		  }, 
 		  message: '字段不匹配' 
 	  },
 	  
 	   ajax : {
 	    	// remote效验参数说明:(url*,提示语*,编辑时辅助验证的表单元素ID)
 	        validator : function(value, param) {
 	    		// 编辑效验原始值是否修改
 	           if(value==$('#'+param[2]).val()){
 			  		return true;
		  		}
 	           var data = {};
 	           data[$(this)[0].name] = value;
 	            var ret = " ";
 	            $.ajax({
 	                type : 'post',
 	                async : false,
 	                url : param[0],
 	                data : data,
 	                success : function(data) {
 	                    ret = data;
 	                    $('#'+param[2]).val('');
 	                }
 	            });
 	            return ret.indexOf("false");
 	        },
 	        message : '{1}'
 	    }
});


