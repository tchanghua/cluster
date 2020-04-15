var treemenu=[];
var childstr = [];
var qz = new RegExp("://");
$(function(){
    $.ajax({
        type: "post",
        url: ctx+"/sys/menu/indexmenulist",
        async: false,
        data: {},
        success: function (data) {
            if (data && data.mlist) {
                var temparr=[];
                $.each(data.mlist,function(index,m){
                    if(m.isShow=='1'){
                        m.id=m.id==undefined?'':m.id.replace(/^\s+|\s+$/gm,''); //去掉左右空格，去掉全部可以用.replace(/\s/g,"")
                        m.href=m.href==undefined?'':m.href.replace(/^\s+|\s+$/gm,'');
                        m.name=m.name==undefined?'':m.name.replace(/^\s+|\s+$/gm,'');
                        m.parentId=m.parentId==undefined?'':m.parentId.replace(/^\s+|\s+$/gm,'');
                        temparr.push(m);
                    }
                });
                treemenu = transData(temparr,'id', 'parentId', 'children');
                renderMainMenu();
            }
            else {
                layer.msg("获取页面信息超时！", {icon: 2});
            }
        },
        error: function () {
            layer.msg("页面出错！", {icon: 2});
        }
    });
});

/**
 * json格式转树状结构
 * @param   {json}      json数据
 * @param   {String}    后台发过来id字段名称
 * @param   {String}    后台发过来的父id的字段名称
 * @param   {String}    自定义children的名称
 * @return  {Array}     数组
 */
function transData(a, idStr, pidStr, childrenStr){
    var r = [], hash = {}, id = idStr, pid = pidStr, children = childrenStr, i = 0, j = 0, len = a.length;
    for(; i < len; i++){
        hash[a[i][id]] = a[i]; //将数据存成对象数组
    }
    for(; j < len; j++){
        var aVal = a[j], hashVP = hash[aVal[pid]]; //aVal代表一条数据，hashVP是这条数据对应的父节点数据
        if(hashVP){    //如果父节点存在
            !hashVP[children] && (hashVP[children] = []);  //如果children不存在就创建数组
            hashVP[children].push(aVal);
        }else{
            r.push(aVal);
        }
    }
    return r;
}

//切换左侧菜单
function renderChildMenu(pid){
    var childarr = [];
    if(treemenu[0].id=='bitter4d639e4c2b83c2dd07645ffff1'){
        for(var i=0;i<treemenu[0].children.length;i++){
            if(treemenu[0].children[i].id==pid){
                childarr[0]=treemenu[0].children[i];
            }
        }
    }else{//如果主菜单是第一级菜单
        for(var i=0;i<treemenu.length;i++){
            if(treemenu[i].id==pid){
                childarr[0]=treemenu[i];
            }
        }
    }
    childstr = [];
    childstr.push('<li class="header">导航菜单</li>');
    $("#forleftmenu").html(recursionMenu(childarr[0].children,1));//如果从一级菜单走起这里放childarr就行
    $(".J_menuItem").each(function (index) {
        if (!$(this).attr('data-index')) {
            $(this).attr('data-index', index);
        }
    });
    $('.J_menuItem').off('click').on('click', menuItem);
}

//组装子菜单
function recursionMenu(treedata,level){

    for(var i=0;i<treedata.length;i++){
        childstr.push('<li class=" ');      //<li>
        if(i==0 && level==1){
            childstr.push('active ');
        }
        if(treedata[i].children){
            childstr.push('treeview ');
        }
        childstr.push(' ">');               //</li>
        childstr.push('<a ');					//<a>
        if(!treedata[i].href){
            childstr.push('href="javascript:void(0)" class="ellipsis"');
        }else{
            childstr.push('href="');
            if(!qz.test(treedata[i].href)){
                if(new RegExp('[?]').test(treedata[i].href)){
                    childstr.push(ctx+treedata[i].href+'" ');
                }else{
                    childstr.push(ctx+treedata[i].href+'?forreportid='+treedata[i].id+'" ');
                }

            }
            else{
                if(new RegExp('[?]').test(treedata[i].href)){
                    childstr.push(treedata[i].href+'" ');
                }else{
                    childstr.push(treedata[i].href+'?forreportid='+treedata[i].id+'" ');
                }
            }
            childstr.push(' data-id="'+treedata[i].id+'" class="J_menuItem ellipsis" target="mainFrame"');//J_menuItem这个class是页签用的
        }
		/*if(level>2){
		 childstr.push(' style="padding-left: '+(level-2)*5+'px"'); //第三层开始缩进一些
		 }*/
        childstr.push('> ');				//</a>
        if(treedata[i].icon){
            childstr.push('<i class="fa '+treedata[i].icon+'" ></i>');  //菜单图标
        }else{
            var temp = {1:"th-list",2:"tasks",3:"reorder",4:"sort-amount-asc"}[level]||"th";
            childstr.push('<i class="fa fa-'+temp+'" ></i>'); //这里是没有图标时给个默认图标
        }
        childstr.push('<span style="font-size:15px"  title="'+treedata[i].name+'">'+treedata[i].name+'</span>');
        if(!treedata[i].href && treedata[i].children){
            childstr.push('<i class="fa fa-angle-left pull-right"></i>');
        }
        childstr.push('</a>');



        if(treedata[i].children){
            childstr.push('<ul class="treeview-menu" ');
            if(level>2){
                //childstr.push('style="background-color:#28413a;margin-right: 5px"'); //第三层
            }
            childstr.push('>');
            recursionMenu(treedata[i].children,level+1);
            childstr.push("</ul>");
        }
        childstr.push("</li>");
    }
    return childstr.join('');
}

function renderMainMenu(){
    var mainmenu = [];
    //当前最高节点是功能菜单，页面要的是第二级。
    if(treemenu[0].id=='bitter4d639e4c2b83c2dd07645ffff1'){
        for(var i=0;i<treemenu[0].children.length;i++){
            mainmenu.push(treemenu[0].children[i]);
        }
    }else{//如果页面要的是第一级菜单
        for(var i=0;i<treemenu.length;i++){
            mainmenu.push(treemenu[i]);
        }
    }
    var mmstr = [];
    $.each(mainmenu,function(index,menu){
        mmstr.push('<li class="forclick">');
        mmstr.push('   <a href="javascript:;" ');
        mmstr.push(' 	  onclick="renderChildMenu(\''+menu.id+'\')">'+menu.name);
        mmstr.push('   </a>');
        mmstr.push('</li>');
    });
    $("#mainmenuul").html(mmstr.join(" "));

    renderChildMenu(mainmenu[0].id);
    $('.forclick').on('click','#mainmenuul',function(){
        $('.forclick').removeClass('active');
        $(this).addClass('active');
    });
}
		 