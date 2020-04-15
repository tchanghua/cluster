/*!
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 * 
 * 通用公共方法
 * @author ThinkGem
 * @version 2014-4-29
 */
$(document).ready(function() {
	try{
		//所有下拉框使用select2，绑定reset方法  清空select2
		//$("select").select2({theme: "bootstrap",placeholder: "请选择...",});
		$("select").select2({theme: "bootstrap",width: "100%",language: "zh-CN", placeholder: "请选择...",allowClear: true}).closest('form').on('reset', function(){
			$(this).find('select option').prop('selected', function(){ return this.defaultSelected; });
			$(this).find('select').trigger('change.select2');
			return true;
		});
		
		//页面一打开 关闭已经打开的loading层
		layer.ready(function(){
		  //var index = top.layer.load();
		  var index2 = top.layer.msg();
		  if(index2){top.layer.close(index2)};
		  //top.layer.closeAll('loading'); //关闭加载层
		  //top.layer.closeAll('msg'); //关闭消息提示层
		});
	}catch(e){
		// blank
	}
});
   
/*****************************************************************
                  jQuery Validate扩展验证方法      
*****************************************************************/
$(function(){
	// 身份证号码验证 
	jQuery.validator.addMethod("isIdCardNo", function(value, element) { 
		  return this.optional(element) || idCardNoUtil.checkIdCardNo(value);     
		}, "请正确输入您的身份证号码"); 
	// 手机号码验证 
	jQuery.validator.addMethod("isMobile", function(value, element) { 
	  var length = value.length; 
	  //var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
      var mobile = /^\d{11,20}$/;
	  return this.optional(element) || (mobile.test(value));
	}, "请正确填写您的手机号码(11-20位数字)");
	// 联系电话(手机/电话皆可)验证 
	jQuery.validator.addMethod("isPhone", function(value,element) { 
	  var length = value.length; 
	  //var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	  //var mobile = /^1\d{10}$/;
	  var mobile = /^\d{11,20}$/;
	  //var tel = /^\d{3,4}-?\d{7,9}$/;
	  var tel = /^\d{3,9}-?\d{3,9}$/;
	  return this.optional(element) || (tel.test(value) || mobile.test(value));

	}, "请正确填写您的联系电话(11-20位手机号或XXXXX-XXXXX的固话)");
	//验证值不允许与特定值等于
	jQuery.validator.addMethod("notEqual", function(value, element,param) {
	return value != param;
	}, $.validator.format("输入值不允许为{0}!"));
	
    $.validator.addMethod("checkPwd",function(value,element,params){
    	//必须是字母+数字+特殊字符的密码 不做长度验证
        //var checkPwd = /^(?![a-zA-Z]+$)(?!\d+$)(?![_!@#$%^&*]+$)(?![a-zA-Z\d]+$)(?![a-zA-Z_!@#$%^&*]+$)(?![\d_!@#$%^&*]+$)[a-zA-Z\d_!@#$%^&*]+$/g; 
        //字母+数字，字母+特殊字符，数字+特殊字符
        var checkPwd = /^(?![a-zA-Z]+$)(?!\d+$)(?![!@#$%&*_\-]+$)[a-zA-Z\d!@#$%&*_\-]+$/g;  
        return this.optional(element)||(checkPwd.test(value));  
    },"*密码必须有字母、数字、特殊字符(_!@#$%&*-)的两项");  
});
// 引入js和css文件
function include(id, path, file){
	if (document.getElementById(id)==null){
        var files = typeof file == "string" ? [file] : file;
        for (var i = 0; i < files.length; i++){
            var name = files[i].replace(/^\s|\s$/g, "");
            var att = name.split('.');
            var ext = att[att.length - 1].toLowerCase();
            var isCSS = ext == "css";
            var tag = isCSS ? "link" : "script";
            var attr = isCSS ? " type='text/css' rel='stylesheet' " : " type='text/javascript' ";
            var link = (isCSS ? "href" : "src") + "='" + path + name + "'";
            document.write("<" + tag + (i==0?" id="+id:"") + attr + link + "></" + tag + ">");
        }
	}
}

/**
 * 重写alert
 */
window.alert = function(msg, callback){
	top.layer.alert(msg, function(index){
		top.layer.close(index);
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}

/**
 * ajax全局培训
 */
$.ajaxSetup({
	contentType:"application/x-www-form-urlencoded;charset=utf-8",
    type:'post',
    error: function (xhr, e) {
		if(xhr.status == 403){
			alert("页面已过期，请重新登陆！");
            window.top.location.href = ctx+'/login';
		}
    },
	complete: function(xhr, ts){
        if('timeout' == xhr.getResponseHeader('sessionStatus')) {
            alert('页面已过期，请重新登录!');
            window.top.location.href = ctx+'/login';
        }
    }
});

/**
 * 得到一个Map对象， 有get/set/Contains/Remove方法
 * @returns
 */
function getHashMap(){
	var hashMap = {  
			Set : function(key,value){this[key] = value},  
			Get : function(key){return this[key]},  
			Contains : function(key){return this.Get(key) == null?false:true},  
			Remove : function(key){delete this[key]}  
	};
	
	return hashMap;
}

// 获取URL地址参数
function getQueryString(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (!url || url == ""){
	    url = window.location.search;
    }else{	
    	url = url.substring(url.indexOf("?"));
    }
    r = url.substr(1).match(reg)
    if (r != null) return unescape(r[2]); return null;
}

//获取字典标签
function getDictLabel(data, value, defaultValue){
	for (var i=0; i<data.length; i++){
		var row = data[i];
		if (row.value == value){
			return row.label;
		}
	}
	return defaultValue;
}

// 打开一个窗体
function windowOpen(url, name, width, height){
	var top=parseInt((window.screen.height-height)/2,10),left=parseInt((window.screen.width-width)/2,10),
		options="location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,"+
		"resizable=yes,scrollbars=yes,"+"width="+width+",height="+height+",top="+top+",left="+left;
	window.open(url ,name , options);
}

// 恢复提示框显示
/*function resetTip(){
	//top.$.jBox.tip.mess = null;
}
*/

// 关闭提示框 不能定义全局
//var _layer_loading_index_jeedcp;
function closeTip(_layer_loading_index_jeedcp){
	//top.$.jBox.closeTip();
	if(_layer_loading_index_jeedcp == null){return};

    top.layer.close(_layer_loading_index_jeedcp);

	_layer_loading_index_jeedcp = null;
}

//显示提示框
/*function showTip(mess, type, timeout, lazytime){
	resetTip();
	setTimeout(function(){
		layer.msg(mess, {opacity:0, time:  timeout == undefined ? 2000 : timeout});
	}, lazytime == undefined ? 500 : lazytime);
}*/

function showtips(mess, obj, location, bgcolor){
	if(typeof(location) =='undefined' || location == ''){
		location = 2; //1 - top; 2-right; 3-below ; 4- left
	}
	if(typeof(bgcolor) =='undefined' || bgcolor == ''){
		bgcolor = '#3595CC';
	}
	
	layer.open({
		  type: 4,
		  content: [mess, obj], //数组第二项即吸附元素选择器或者DOM
		  tips: [location, bgcolor],
		  time: 4000,
		  shade: 0,
		});
}

// 显示加载框
function loading(mess){
	if (mess == undefined || mess == ""){
		mess = "正在提交，请稍等...";
	}
	//resetTip();
	
	_layer_loading_index_jeedcp = top.layer.msg(mess, {
		icon: 16,
		shade: 0.01,
		time: 0
	});

	return _layer_loading_index_jeedcp;
}

// 关闭提示框
/*function closeLoading(){
	// 恢复提示框显示
	//resetTip();
	// 关闭提示框
	closeTip();
}
*/

// 警告对话框
function alertx(mess, closed){
	layer.msg(mess ,{icon : 2, cancel:function(index){
		//cancle button
		layer.close(index);
		if((closed != null) && (typeof closed) == 'function' ){
			closed();
		}
	}});
}

//use the layer as prompt by TRB
function confirmx(mess, href, closed){
	layer.confirm(mess,{
		icon : 3
		,title: '提示'
		,yes: function(index){
			//confirm button
			layer.close(index);
			if(typeof href == 'function'){
				href();
			}else{
				location = href;
			}
			}
		,cancel:function(index){
			//cancle button
			layer.close(index);
			if((closed != null) && (typeof closed) == 'function' ){
				closed();
			}
		}
	});
	return false;
}

// 提示输入对话框
function promptx(title, lable, href, closed){
	top.$.jBox("<div class='form-search' style='padding:20px;text-align:center;'>" + lable + "：<input type='text' id='txt' name='txt'/></div>", {
			title: title, submit: function (v, h, f){
	    if (f.txt == '') {
	        top.$.jBox.tip("请输入" + lable + "。", 'error');
	        return false;
	    }
		if (typeof href == 'function') {
			href();
		}else{
			resetTip(); //loading();
			location = href + encodeURIComponent(f.txt);
		}
	},closed:function(){
		if (typeof closed == 'function') {
			closed();
		}
	}});
	return false;
}

// 添加TAB页面
/*function addTabPage(title, url, closeable, $this, refresh){
	top.$.fn.jerichoTab.addTab({
        tabFirer: $this,
        title: title,
        closeable: closeable == undefined,
        data: {
            dataType: 'iframe',
            dataLink: url
        }
    }).loadData(refresh != undefined);
}*/

// cookie操作
function cookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

// 数值前补零
function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

// 转换为日期
function strToDate(date){
	return new Date(date.replace(/-/g,"/"));
}

// 日期加减
function addDate(date, dadd){  
	date = date.valueOf();
	date = date + dadd * 24 * 60 * 60 * 1000;
	return new Date(date);  
}

//截取字符串，区别汉字和英文
function abbr(name, maxLength){  
 if(!maxLength){  
     maxLength = 20;  
 }  
 if(name==null||name.length<1){  
     return "";  
 }  
 var w = 0;//字符串长度，一个汉字长度为2   
 var s = 0;//汉字个数   
 var p = false;//判断字符串当前循环的前一个字符是否为汉字   
 var b = false;//判断字符串当前循环的字符是否为汉字   
 var nameSub;  
 for (var i=0; i<name.length; i++) {  
    if(i>1 && b==false){  
         p = false;  
    }  
    if(i>1 && b==true){  
         p = true;  
    }  
    var c = name.charCodeAt(i);  
    //单字节加1   
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {  
         w++;  
         b = false;  
    }else {  
         w+=2;  
         s++;  
         b = true;  
    }  
    if(w>maxLength && i<=name.length-1){  
         if(b==true && p==true){  
             nameSub = name.substring(0,i-2)+"...";  
         }  
         if(b==false && p==false){  
             nameSub = name.substring(0,i-3)+"...";  
         }  
         if(b==true && p==false){  
             nameSub = name.substring(0,i-2)+"...";  
         }  
         if(p==true){  
             nameSub = name.substring(0,i-2)+"...";  
         }  
         break;  
    }  
 }  
 if(w<=maxLength){  
     return name;  
 }  
 return nameSub;  
}


var prompt_window_opts={
		title:' ',
		mode: 'view', //default view mode; mode can be "view" "edit"
		close_btn: '关闭',
		save_btn:'保存',
		valid_fail:'页面验证失败，请检查内容',
		submit_success:'提交成功！',
		submit_fail:'提交失败,请联系管理员！',
		height: 0.8,
		width: 0.9,
//		confirmbtncallback:function(index,layero){},
//		successcallback:function(){},
//		errorcallback:function(){},
};


/**
 * 利用layer 弹出窗口， 主要用在列表页弹窗式的增删改查
 * @param url 弹窗的iframe URL
 * @param opts 可配置选项， json格式的, 默认的配置参加上面的prompt_window_opts 变量。 
 */
function open_prompt_window(url, opts){
	
	var opt = $.extend(true, {}, prompt_window_opts, opts);
	
	var h,w;
	
	if(opt.height <= 1){
		//h = document.documentElement.clientHeight * opt.height;
		h = getWindowSize().toString().split(",")[0] * opt.height;
	}else{
		h = opt.height;
	}
	if(opt.width <= 1){
		//w = document.documentElement.clientHeight * opt.width;
		w = getWindowSize().toString().split(",")[1] * opt.width;
	}else{
		w = opt.width;
	}

  	top.layer.open({
		type: 2,
		title:[opt.title,'font-size:18px;'],
		area: [w+'px',h+'px'],
		scrollbar:true,
		shade:0.1,
		closeBtn:1,
		btn: opt.mode!='edit'?[opt.close_btn]:[opt.save_btn,opt.close_btn],
		maxmin:true,
		content:url,
		success: function(layero, index){
			if(opt.mode!='edit'){
				$(layero).find("iframe")[0].contentWindow.$('#inputForm :input').attr("readOnly","true");
				$(layero).find("iframe")[0].contentWindow.$('#inputForm select').attr("disabled","disabled");
				$(layero).find("iframe")[0].contentWindow.$('#inputForm a').attr("disabled","disabled");
			}	 
		  },
		yes: opt.mode!='edit'? function(index,layero){
				// if(typeof(opt.mode)!='undefined'&&opt.mode=='1view'){
				// 	$(layero).find("iframe")[0].contentWindow.excelExport();
				// }
				top.layer.close(index);
			}:function(index,layero){
			if((typeof opt.confirmbtncallback ) == 'function'){
				opt.confirmbtncallback(index,layero);
				return;
			}
			var form = $(layero).find("iframe")[0].contentWindow.$('#inputForm');

            var iframeContent = $(layero).find("iframe")[0].contentWindow;
            if((typeof iframeContent.preValidateCallback )  == 'function'){
                if(!iframeContent.preValidateCallback()){
                    return;
                }
            }

			if(!$(form).valid()){
                top.layer.msg(opt.valid_fail ,{icon : 2});
                return;
			}

            if((typeof iframeContent.postValidateCallback )  == 'function'){
                if(!iframeContent.postValidateCallback()){
                    return;
                }
            }

            var loadingIndex = loading('正在提交，请稍等...');
            $(form).ajaxSubmit({
				timeout: 60000,
                async: true,
				success:function(data){
					top.layer.close(index);
					if(typeof(data.msg) != 'undefined' && data.msg != ''){
						top.layer.msg(data.msg ,{icon : 1});
					}else{
						top.layer.msg(opt.submit_success ,{icon : 1});
					}			
					if((typeof opt.successcallback ) == 'function'){
						opt.successcallback();
					}

                    closeTip(loadingIndex);
				},
				error:function(resdata, statusText){
                    if(statusText=='timeout'){
                        top.layer.msg("服务器繁忙，请稍后再试！", {icon : 5});
                        closeTip(loadingIndex);
                        return;
                    }

                    if(typeof(resdata.responseJSON) != 'undefined' &&typeof(resdata.responseJSON.msg) != 'undefined' && resdata.responseJSON.msg != ''){
						top.layer.msg(resdata.responseJSON.msg ,{icon : 2});
					}else{
						top.layer.msg(opt.submit_fail ,{icon : 2});
					}
					if((typeof opt.errorcallback) == 'function'){
						opt.errorcallback();
					}

                    closeTip(loadingIndex);
				},
			});

		  },btn2:function(index,layero){
            if(!window.confirm('您确定不保存就关闭此窗口吗？')){
                return false;
            }
            top.layer.close(index);
		  }
	});
}



//改变单个属性状态（放弃 跟踪）按钮事件， 编辑之后自动刷新列表页。
function update_btn_click(url, tableobj){
	if(typeof(tableobj) =='undefined' || tableobj == ''){
		tableobj = $('#contentTable');
	}
	table = $(tableobj).DataTable();
	var selectdata = table.rows( { selected: true } ).data();
	if(selectdata.length > 0){
		layer.confirm("确认要放弃跟踪么？",{
			icon : 3
			,title: '提示'
			,yes: function(index){
				layer.close(index);
 		        $.ajax({
		            url: url,
		            type:'post',
		            data: {
		                "id": selectdata[0].id,
		            }, success: function (data) {		                
		                top.layer.msg("放弃跟踪成功",{icon : 1});
		                table.ajax.reload();
		            }, error: function(data){
		            	top.layer.msg("放弃跟踪失败",{icon : 2});
		            }
		        });
			}
			,cancel:function(index){
				//cancle button
				layer.close(index);
			}
		});
	}else{
		top.layer.msg("请选择一行数据！" ,{icon : 2});
		return false;
	}
}


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,
        //月份
        "d+": this.getDate(),
        //日
        "h+": this.getHours(),
        //小时
        "m+": this.getMinutes(),
        //分
        "s+": this.getSeconds(),
        //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

//窗口大小
var getWindowSize = function(){
	return ["Height","Width"].map(function(name){
	  return window["inner"+name] ||
		document.compatMode === "CSS1Compat" && document.documentElement[ "client" + name ] || document.body[ "client" + name ];
	});
};


/**
 * 附件验证
 */
function fileChange(target) {
    var fileSize = 0;         
    fileSize = target.files[0].size;     
    var size = fileSize / 1024;  
    if(size>30000){  
   	 top.layer.msg("附件不能大于30M" ,{icon : 2});
      	 target.value="";
        return
    }
    var name=target.value;
    var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
    if(!fileName.match(/zip|png|jpg|pdf|PDF|doc|docx|xlsx|xls|rar|ZIP|DOC|DOCX|XLSX|XLS|RAR/i)){
        top.layer.msg("请选择正确的格式文件上传！" ,{icon : 2});
        target.value="";
        return
    }
}

/**
 * 将金额转为万元并保留两位小数
 */
function bllwxs(jine){
    return jine && Math.floor(jine/10000*100)/100 || 0;
}

/**
 * 获取上期周期值
 * zq 把正确周期传过来这里不处理转换
 * type 1年报 2中报 3季报 4月报 5半月报
 */
function getsqs(zq,type){
	var fh = 0;
    zq=zq+"";
	if(type==1){
        fh = zq-1;
	}
	else if(type==2){
        if(zq.substring(4,6) == '06'){
            fh = zq.substring(0,4)-1+""+"12";
        }else{
            fh = zq.substring(0,4)+""+"06";
        }
	}
	else if(type==3){
        if(zq.substring(5,7)<=3){
            fh=zq.substring(0,4)-1+""+"12";
        }else if(zq.substring(5,7)<=6){
            fh=zq.substring(0,4)+""+"03";
        }else if(zq.substring(5,7)<=9){
            fh=zq.substring(0,4)+""+"06";
        }else{
            fh=zq.substring(0,4)+""+"09";
        };
    }
    else if(type==4){
        if(zq.substring(4,6) == '01'){
            fh = zq.substring(0,4)-1+""+"12";
        }else{
            fh = zq-1;
        }
	}
	else if(type==5){
        if(zq.substring(4,8) == '0115'){
            fh = zq.substring(0,4)-1+""+"1230";
        }
        else if(zq.substring(6,8) == '30'){
            fh = zq.substring(0,6)+"15";
		}
		else if(zq.substring(4,6)<10){
            fh = zq.substring(0,4)+"0"+(zq.substring(4,6)-1)+"30";
		}
        else{
            fh = zq.substring(0,4)+""+(zq.substring(4,6)-1)+"30";
        }
	}
    else if(type==6){
        if(zq.substring(4,8) == '0110'){
            fh = zq.substring(0,4)-1+""+"1230";
        }
        else if(zq.substring(6,8) <= 30 && zq.substring(6,8) > 20){
            fh = zq.substring(0,6)+"20";
        }
        else if(zq.substring(6,8) <= 20 && zq.substring(6,8) > 10){
            fh = zq.substring(0,6)+"10";
        }
        else if(zq.substring(4,6)<10){
            fh = zq.substring(0,4)+"0"+(zq.substring(4,6)-1)+"30";
        }
        else{
            fh = zq.substring(0,4)+""+(zq.substring(4,6)-1)+"30";
        }
    }
	return fh;
}

function formatzq(zq,zqtype){
	if(zq=='' || zq==undefined) return '';
	var frzq=zq.substring(0,4);
	switch(zqtype)
	{

	    case '1': 
	           break;

	    case '2':
		   if(zq.substring(5,7)<=6){
			frzq=frzq+'06';
		   }else{
			frzq=frzq+'12';
		   };	 
	           break;

	    case '3':
		   if(zq.substring(5,7)<=3){
			frzq=frzq+'03';
		   }else if(zq.substring(5,7)<=6){
			frzq=frzq+'06';
		   }else if(zq.substring(5,7)<=9){
			frzq=frzq+'09';
		   }else{
			frzq=frzq+'12';
		   };	
	           break;

	    case '4':
		  frzq=frzq+zq.substring(5,7);
	           break;

	    default: 
	           frzq='';

	}
	return frzq;
}


function toThousands(num) {
	
    var num = (num || 0).toString(), result = '';
    var minus = num.slice(0,1);
    var a=1;
    if( minus == '-'){
    	num = num.slice(1,num.length);
    	while (num.length > 3) {
    	if(a==1){
    		result = num.slice(-3) + result;
    		a=2;
    	}else{
    		result = ',' + num.slice(-3) + result;
    	}
        
        num = num.slice(0, num.length - 3);
    }
    num='-'+num;
    }else{
    	while (num.length > 3) {
    	if(a==1){
    		result = num.slice(-3) + result;
    		a=2;
    	}else{
    		result = ',' + num.slice(-3) + result;
    	}
        
        num = num.slice(0, num.length - 3);
    }
    }
    
    if (num) { result = num + result; }
    return result;
}

