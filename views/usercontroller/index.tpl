<body class="easyui-layout">
    <div region="west" border="true" split="true" class="west" title="操作类别" style="padding: 0 0 0 0">
        <ul id="tree">
        </ul>
    </div>
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
        var treeSetting = {
            tree: $("#tree"),
            url: '/OperationCategory/GetCategoryTree',
            param: {}
        };
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
                ID: '',
                Name: ''
            },
            addUrl: "/user/add",
            editUrl: '/user/update',
            deleteUrl: '/user/delete',
            importUrl: '/user/Import',
            exportUrl: '/user/Export',
            fileType: '.user',
            treeId: 'CategoryIdentifier',
            selected: true,
            deleteChildren:true
        }
        InitGrid(setting);
        FH.tree.init(treeSetting, setting.grid);
        $('#tbName').textbox({
            width: 100
        });
        $('#btnSearch').linkbutton({
            iconCls: 'icon-search',
            onClick: function () {
                var name = $('#tbName').textbox('getText');
                var param = {
                    username: name
                };
                $.extend(true, FH.tree.treeSetting.param, param);
                setting.grid.datagrid("reload", FH.tree.treeSetting.param);
            }
        });
    });
</script>