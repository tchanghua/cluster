<%--
  Created by IntelliJ IDEA.
  User: tch
  Date: 2020/3/16
  Time: 15:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<script src="<%=basePath%>/static/adminlte/plugins/jQuery/jquery-1.10.2.min.js"></script>
<script type="text/javascript">
    $(document).ready(function() {

    });

    function save() {
        console.log($("#id").val())
        $.ajax({
            url: '<%=basePath%>/resume/save',//地址
            dataType: 'json',//数据类型
            type: 'POST',//类型
            data:{'id': $("#id").val(),
                  'name': $("#name").val(),
                  'address':$("#address").val(),
                  'phone' : $("#phone").val()
            },
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
<body>
<form id="resume" action="<%=basePath%>/resume/save" method="post">
    <input id="id" value="" hidden="hidden">
    <label>姓名</label><input  id="name" value="" ><br>
    <label>地址</label><input id="address" value=""><br>
    <label>电话</label><input id="phone" value=""><br>
    <button  onclick="javascript:save()">保存</button>
</form>
</body>
</html>
