<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<title>登录</title>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
    System.out.println(basePath);
%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
</head>

<style type="text/css">
    html,body{height:100%; overflow-y:auto; overflow-x:hidden;}
    .global-login{ width:300px; height:400px;margin:110px auto 0 auto;}
    .global-wx{ width:300px; height:400px;margin:140px auto 0 auto;}
</style>
<body>
<div class="login-warp">
    <div class="plat-logobar">
        <a href="#" class="plat-icon plat-logo"></a>
    </div>
    <!--header 结束-->
    <div class="global-login" style="float:left;padding-left:600px;">
        <h1 class="title">登录</h1>
        <form id="loginForm" action="/ssm_war_exploded/login/login.do" method="post">
            <ul>
                <li class="userbox">
                    <em class="plat-icon user-icon"></em>
                    <label for="username"></label>
                    <input type="text" name="username" id="username" class="username" >
                </li>
                <li>
                    <em class="plat-icon pw-icon"></em>
                    <label for="password"></label>
                    <input type="password" name="password" id="password" class="password"/>
                </li>
                <!--
                 <li class="v-code">
                    <em class="plat-icon code-icon"></em>
                    <label for="textfield3"></label>
                    <input type="text" name="textfield3" id="textfield3" class="Verification-code">
                    <a href="#" class="img"><img src="image/v-code.png"></a>
                </li> -->

                <li class="correct-tips error-tips"><!--加 error-tips 显示错误提示-->
                    <span id="tix">

				</span>
                </li>
                <li class="submit-btn border-radius ">
                    <input type="button" onclick="javascript:$('#loginForm').submit();" value="登录" class="ime-disabled-">
                    <!--ime-disabled 不可点击状态-->
                </li>

            </ul>
        </form>
    </div>
    <div class="global-wx" style="float:left;padding-left:30px;">
        <ul>
            <li>

                <div id="showewm_td">

                </div>
            </li>
        </ul>
    </div>

</div>
</body>
<script src="<%=basePath%>/static/adminlte/plugins/jQuery/jquery-1.10.2.min.js"></script>
<script src="<%=basePath%>/static/layer/layer/layer.js"></script>
<script src="<%=basePath%>/static/jquery-validation/1.15.0/jquery.validate.min.js" type="text/javascript"></script>
<script src=<%=basePath%>/static/jquery-validation/1.15.0/localization/messages_zh.js" type="text/javascript"></script>
<script type="text/javascript">
    /*$(document).ready(function () {


        $("#loginForm").validate({
            rules: {
                validateCode: {remote: "/servlet/validateCodeServlet"}
            },
            messages: {
                username: {required: "请填写用户名."}, password: {required: "请填写密码."},
                validateCode: {remote: "验证码不正确.", required: "请填写验证码."}
            },
            errorLabelContainer: "#tix"
        });
        // 如果在框架或在对话框中，则弹出提示并跳转到首页
        if (self.frameElement && self.frameElement.tagName == "IFRAME" || $('#left').length > 0 || $('.jbox').length > 0) {
            layer.msg('未登录或登录超时。请重新登录，谢谢！', {icon: 2});
            top.location = "";
        }
        //回车登录
        $(this).keydown(function(evt) {
            var k = window.event ? evt.keyCode : evt.which;
            if (k == 13) {
                $('#loginForm').submit();
            }
        });

    });
*/
</script>
</html>
