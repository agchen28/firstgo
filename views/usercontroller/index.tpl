<body class="easyui-layout">
    <div region="center" border="true" split="true" title="">
         name:<input id="tbName" type="text" style="width: 300px"><a id="btnSearch" href="#">查询</a>
        <table id="grid">
        </table>
    </div>
    <div id="dialog">
        <input id="fb" type="text" name="file1" style="width: 300px; display: none" />
    </div>
</body>
<script type="text/javascript" src="/static/js/grid.js"></script>
<script type="text/javascript" src="/static/js/tree.js"></script>
<script type="text/javascript" src="/static/js/dialog.js"></script>
<script type="text/javascript" src="/static/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="/static/js/fileupload.js"></script>
<script type="text/javascript" src="/static/js/validatebox.extend.js"></script>
<script type="text/javascript">
    $(function () {
        var setting = {
            grid: $('#grid'),
            url: '/user/page',
            columns: [
            { field: 'ck', checkbox: true },
            { field: 'ID', title: 'ID'},
            { field: 'Name', title: 'Name',
                editor: {
                    type: 'validatebox',
                    options: {
                        required: true, //必填
                        validType: "length[0,50]"//限制长度
                    }
                }
            }
        ],
            queryParams: {},
            newRow: {
                ID: 0,
                Name: ''
            },
            addUrl: "/user/create",
            editUrl: '/user/update',
            deleteUrl: '/user/delete'
        }
        InitGrid(setting);
        $('#tbName').textbox({
            width: 100
        });
        $('#btnSearch').linkbutton({
            iconCls: 'icon-search',
            onClick: function () {
                var name = $('#tbName').textbox('getText');
                var param = {
                    Name: name
                };
                setting.grid.datagrid("reload", param);
            }
        });
    });
</script>