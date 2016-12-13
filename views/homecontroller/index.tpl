<body class="easyui-layout">
    <div region="center" border="true" split="true" title="">
        <div class="easyui-tabs" fit="true" border="false" id="tabs">
            <div title="首页">
            </div>
        </div>
       
    </div>
    <div region="west" border="true" split="true" class="west" title="导航菜单" style="padding: 0 0 0 0">
        <div id="aa" class="easyui-accordion" fit="true" border="false">
            <div title="操作管理">
                <ul>
                    <li class="iconnav">
                        <div>
                            <a href="javascript:addTab('操作分类','/user/index')">操作分类</a>
                        </div>
                    </li>
                    <li class="iconnav">
                        <div>
                            <a href="javascript:addTab('操作管理','/Operation/Index')">操作管理</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div title="权限管理">
                <ul>
                    <li class="iconnav">
                        <div>
                            <a href="javascript:addTab('用户管理','/Operator/Index')">用户管理</a>
                        </div>
                    </li>
                    <li class="iconnav">
                        <div>
                            <a href="javascript:addTab('标签管理','/OperatorTag/Index')">标签管理</a>
                        </div>
                    </li>
                    <li class="iconnav">
                        <div>
                            <a href="javascript:addTab('权限设置','/Authorization/Index')">权限设置</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div title="系统设置">
                <ul>
                    <li class="iconnav">
                        <div>
                            <a href="javascript:addTab('操作日志','/OperationLog/Index')">操作日志</a>
                        </div>
                    </li>
                    <li class="iconnav">
                        <div>
                            <a href="javascript:loginOut('/Entry/Logout')">退出登录</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div region="south" border="true" split="true" style="overflow: hidden; height: 40px;">
        <div class="footer">
            版权所有：<a href="http://www.edisonchen.xyz" target="_blank">zzz</a>
        </div>
    </div>
    <div id="tabsMenu" class="easyui-menu" style="width: 120px;">
        <div name="close">
            关闭
        </div>
        <div name="Other">
            关闭其他
        </div>
        <div name="All">
            关闭所有
        </div>
    </div>
</body>
