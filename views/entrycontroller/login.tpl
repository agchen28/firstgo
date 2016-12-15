<!DOCTYPE html>
<html>
<head>
    <title>{{.Title}}</title>
    <link href="/static/css/base.css" type="text/css" rel="stylesheet" />
    <link href="/static/jquery-easyui-1.5/themes/icon.css" rel="stylesheet" type="text/css" />
    <link href="/static/jquery-easyui-1.5/themes/gray/easyui.css" rel="stylesheet" type="text/css" />
    <script src="/static/jquery-easyui-1.5/jquery.min.js" type="text/javascript"></script>
    <script src="/static/jquery-easyui-1.5/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="/static/jquery-easyui-1.5/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <meta name="robots" content="noarchive" />
    <script type="text/javascript">
        if (window != top) {
            top.location.href = location.href;
        }
    </script>
</head>
<body>
    <div id="entry_box">
        <div id="log_box">
            <form method="post" action="/entry/login">
            <input type="hidden" name="cat" value="login" />
            <table>
                <tr>
                    <th>
                        用户名：
                    </th>
                    <td>
                        <input type="text" name="username" class="easyui-textbox" data-options="iconCls:'icon-man'" />
                    </td>
                </tr>
                <tr>
                    <th>
                        密码：
                    </th>
                    <td>
                        <input type="password" name="password" class="easyui-textbox" data-options="iconCls:'icon-lock'" />
                    </td>
                </tr>
                <tr>
                    <th>
                    </th>
                    <td>
                        <div class="btn_outerline">
                            <input type="submit" value="登录" class="btn" /></div>
                    </td>
                </tr>
            </table>
            </form>
        </div>
    </div>
    <script type="text/javascript">
        var marginTop = ($(document).height() - $("#entry_box").height()) * 2 / 5;
        $("#entry_box").css("margin-top", (marginTop > 0 ? marginTop : 0) + "px").css("display", "block");
        var message = "{{.Message}}";
        if (message != "") {
            alert(message);
        }
    </script>
</body>
</html>