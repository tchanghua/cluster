<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<head>
    <title></title>
    <meta name="decorator" content="default"/>
    <script src="<%=basePath%>/static/adminlte/plugins/jQuery/jquery-1.10.2.min.js"></script>
    <%@include file="tableList.jsp" %>
    <script type="text/javascript">
        $(document).ready(function() {
            var table = $('#contentTable').DataTable({
                searching: false, //是否开启搜索功能
                ordering: false,//是否排序
                processing: true,//获取数据过程中是否出现加载指示
                bPaginate: true,//是否允许分页
                bInfo: true,//是否显示表格相关信息
                destroy: true,//销毁一个实例
                iDisplayLength: 5,//分页时每页显示的行数
                bLengthChange: false,
                serverSide: true,//当用ajax请求数据源时，这个属性必须添加，切记
                ajax: { //使用ajax记得要引入jquery.min.js
                    url: '<%=basePath%>/resume/qryAll', //请求路径，也就是控制器里方法
                    type: "post",
                    async: true,
                    dataSrc:function (result) {
                        return result.resumes;
                    }
                    // data: {"authorityId": authorityId} //请求参数
                },
                columns: [  //绑定的数据源，后台的json数据里必须有这些属性，保持一致性
                    {"data": "id"},
                    {"data": "name"},
                    {"data": "address"},
                    {"data": "phone"}
                ],
                columnDefs: [
                    {
                        targets: 5,  //对数据源中的第六行进行渲染
                        render: function (data, type, row) {
                            var html = '<a href="javascript:qryById(' + row.id + ');">编辑</a>';
                            return html;
                        }
                    },
                    {
                        targets: 6,  //对数据源中的第六行进行渲染
                        render: function (data, type, row) {
                            var html = '<a href="javascript:del(' + row.id + ');">删除</a>';
                            return html;
                        }
                    }
                ]
            })
        });

        function del(id) {
            $.ajax({
                url: '<%=basePath%>/resume/delById',//地址
                dataType: 'json',//数据类型
                type: 'POST',//类型
                timeout: 2000,//超时
                data:{"id":id},
                //请求成功
                success: function (data, status) {
                    //alert(data);
                    //alert(status);
                },
                //失败/超时
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (textStatus === 'timeout') {
                        alert('請求超時');
                        setTimeout(function () {
                            alert('重新请求');
                        }, 2000);
                    }
                    //alert(errorThrown);
                }
            })
        }

        function qryById(id) {
            $.ajax({
                url: '<%=basePath%>/resume/qryById',//地址
                dataType: 'json',//数据类型
                type: 'POST',//类型
                timeout: 2000,//超时
                data:{"id":id},
                //请求成功
                success: function (data, status) {
                    //alert(data);
                    //alert(status);
                },
                //失败/超时
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (textStatus === 'timeout') {
                        alert('請求超時');
                        setTimeout(function () {
                            alert('重新请求');
                        }, 2000);
                    }
                    //alert(errorThrown);
                }
            })
        }


    </script>
</head>
<body>

<div class="panel panel-default" style="margin-bottom: 0px;">
    <div class="panel-heading list-title">
			<span>
				<h5 class="panel-title">结果列表</h5>
			</span>

        <div id="buttontoolbar">
            <a href="<%=basePath%>/resumeForm.jsp" class="btn btn-info btn-xs"><i class="fa fa-plus"></i>&nbsp;新增</a>
        </div>

    </div>
    <div class="panel-body" style="padding: 0px;">
        <table id="contentTable" class="table table-bordered table-hover nowrap" style="width:100%" ></table>
    </div>
</div>
</body>
</html>