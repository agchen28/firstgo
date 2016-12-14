//#region 初始化grid
function InitGrid(setting) {
    var grid = setting.grid;
    var toolbar = InitToolbar(setting);
    grid.datagrid({
        url: setting.url,
        columns: [setting.columns],
        //#region 属性
        width: function () { return document.body.clientWidth * 0.9; },
        //        fitColumns: true,
        striped: true, //隔行变色
        rownumbers: true, //显示序号
        pagination: true, //显示分页
        pageSize: 20,
        pageList: [10, 15, 20, 25, 30],
        queryParams: setting.queryParams,
        //#endregion

        lastIndex: 0,
        toolbar: toolbar,
        editIndex: 0,
        //#region 事件
        onBeforeLoad: function (param) {

        },
        onSelect: function (rowIndex) {
            endEdit(grid, rowIndex);
            grid.datagrid.lastIndex = rowIndex;
        },
        onUnselect: function (rowIndex) {
            endEdit(grid, rowIndex);
            grid.datagrid.lastIndex = 0;
        },
        onCheck: function (rowIndex) {
            endEdit(grid, rowIndex);
            grid.datagrid.lastIndex = rowIndex;
        },
        onUncheck: function (rowIndex) {
            endEdit(grid, rowIndex);
            grid.datagrid.lastIndex = 0;
        },
        onBeforeEdit: function (index, row) {
            grid.datagrid.editIndex = index;
            row.editing = true;
            grid.datagrid('refreshRow', index);
        },
        onAfterEdit: function (index, row, changes) {
            row.editing = false;
            grid.datagrid('refreshRow', index);
        },
        onEndEdit: function (index, row, changes) {
            row.editing = false;
            grid.datagrid('refreshRow', index);
        },
        onCancelEdit: function (index, row) {
            row.editing = false;
            grid.datagrid('refreshRow', index);
        }
        //#endregion
    });
};
//#endregion

//#region 初始化工具栏
function InitToolbar(setting) {
    var grid = setting.grid;
    var toolbar = [];

    //#region 判断是否有新增按钮
    if (setting.addUrl) {
        var addButton = {
            id: 'btnAdd',
            text: '添加',
            iconCls: 'icon-add',
            handler: function () {
                insertRow(grid, setting.newRow, setting.treeId, setting.selected);
            }
        };
        toolbar.push(addButton);
    }
    //#endregion

    //#region 判断是否有编辑按钮
    if (setting.editUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var editButton = {
            id: 'btnEdit',
            text: '修改',
            iconCls: 'icon-edit',
            handler: function () {
                editRow(grid);
            }
        };
        toolbar.push(editButton);
    }
    //#endregion

    //#region 判断是否有删除按钮
    if (setting.deleteUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var deleteButton = {
            id: 'btnDelete',
            text: '删除',
            iconCls: 'icon-remove',
            handler: function () {
                deleteRows(grid, setting.deleteUrl,setting.deleteChildren);
            }
        };
        toolbar.push(deleteButton);
    }
    //#endregion

    //#region 判断是否有保存按钮
    if (setting.addUrl || setting.editUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var saveButton = {
            id: 'btnSave',
            text: '保存',
            iconCls: 'icon-save',
            handler: function () {
                saveRows(grid, setting.addUrl, setting.editUrl);
            }
        };
        toolbar.push(saveButton);
    }
    //#endregion

    //#region 判断是否有启用按钮
    if (setting.startUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var startButton = {
            id: 'btnStart',
            text: '启用',
            iconCls: 'icon-ok',
            handler: function () {
                StartRows(grid, setting.startUrl);
            }
        };
        toolbar.push(startButton);
    }
    //#endregion

    //#region 判断是否有停用按钮
    if (setting.blockUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var blockButton = {
            id: 'btnBlock',
            text: '停用',
            iconCls: 'icon-no',
            handler: function () {
                BlockRows(grid, setting.blockUrl);
            }
        };
        toolbar.push(blockButton);
    }
    //#endregion

    //#region 判断是否有重置密码按钮
    if (setting.resetPwdUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var resetButton = {
            id: 'btnReset',
            text: '重置密码',
            iconCls: 'icon-lock',
            handler: function () {
                ResetPwdRows(grid, setting.resetPwdUrl);
            }
        };
        toolbar.push(resetButton);
    }
    //#endregion

    //#region 判断是否有授权按钮
    if (setting.authorizeUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var authorizeButton = {
            id: 'btnAuthorize',
            text: '授权',
            iconCls: 'icon-lock',
            handler: function () {
                Authorize(grid, setting.authorizeUrl);
            }
        };
        toolbar.push(authorizeButton);
    }
    //#endregion 

    //#region 判断是否有为用户授权按钮
    if (setting.authorize4OperatorUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var authorize4OperatorButton = {
            id: 'btnAuthorize4Operator',
            text: '授权',
            iconCls: 'icon-lock',
            handler: function () {
                Authorize4Operator(grid, setting.authorize4OperatorUrl);
            }
        };
        toolbar.push(authorize4OperatorButton);
    }
    //#endregion

    //#region 判断是否有为用户授权按钮
    if (setting.operator2OperatorUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var operator2OperatorButton = {
            id: 'btnOperator2Operator',
            text: '以用户为模板授权',
            iconCls: 'icon-lock',
            handler: function () {
                Operator2Operator(grid, setting.operator2OperatorUrl);
            }
        };
        toolbar.push(operator2OperatorButton);
    }
    //#endregion

    //#region 判断是否有import按钮
    if (setting.importUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var importButton = {
            id: 'btnImport',
            text: '导入',
            iconCls: 'icon-import',
            handler: function () {
                Import(grid, setting.importUrl, setting.fileType);
            }
        };
        toolbar.push(importButton);
    }
    //#endregion

    //#region 判断是否有export按钮
    if (setting.exportUrl) {
        if (toolbar.length > 0)
            toolbar.push('-');
        var exportButton = {
            id: 'btnExport',
            text: '导出',
            iconCls: 'icon-export',
            handler: function () {
                Export(grid, setting.exportUrl);
            }
        };
        toolbar.push(exportButton);
    }
    //#endregion

    //#region 刷新按钮
    if (toolbar.length > 0)
        toolbar.push("-");
    var reloadButton = {
        id: 'btnReload',
        text: '刷新',
        iconCls: 'icon-reload',
        handler: function () {
//            if (typeof (tree) != "undefined") {
//                var selected = tree.tree("getSelected");
//                tree.tree("reload");
//                    tree.tree("select", selected.target);
//            }
            grid.datagrid("reload");
        }
    };
    toolbar.push(reloadButton);
    //#endregion

    return toolbar;
}
//#endregion

//#region 新增
function insertRow(grid, newRow, treeId, selected) {
    var changes = grid.datagrid('getChanges');
    for (var i = 0; i < changes.length; i++) {
        var editIndex = grid.datagrid('getRowIndex', changes[i]);
        if (!grid.datagrid('validateRow', editIndex)) {
            $.messager.alert("提示", "存在未通过验证的数据，请仔细检查", "info");
            return;
        }
    }
    var cloneRow = jQuery.extend(true, {}, newRow); //复制一个行对象
    if (selected) {
        var selectedNode = tree.tree("getSelected");
        if (!selectedNode || selectedNode.id == '-1') {
            $.messager.alert("提示", "请选择分类", "info");
            return;
        }
        cloneRow[treeId] = selectedNode.id;
    }
    endEdit(grid, grid.datagrid.lastIndex);
    grid.datagrid('unselectAll');
    grid.datagrid('uncheckAll');
    grid.datagrid('insertRow', {
        index: 0, // index start with 0
        row: cloneRow
    });
    grid.datagrid('selectRow', 0);
    grid.datagrid('checkRow', 0);
    grid.datagrid.lastIndex = 0;
    editRow(grid, 'add');
}
//#endregion

//#region 编辑
function editRow(grid, action) {
    var selections = grid.datagrid('getSelections'); //获取选中的行
    if (selections == null || selections.length <= 0) {
        $.messager.alert("提示", "请选择要操作的行", "info");
        return;
    }
    if (selections.length > 1) {
        $.messager.alert("提示", "只能编辑一行", "info");
        return;
    }
    var index = grid.datagrid('getRowIndex', selections[0]);
    grid.datagrid('beginEdit', index);

    //添加操作时关闭主键编辑器
    if (action != 'add') {
        var ed = grid.datagrid('getEditor', { index: index, field: 'Identifier' });
        //    var editors = grid.datagrid('getEditors', index);
        //    var ed = editors[1];   
        //        $(ed.target).validatebox('setValue', '123');
        //    ed.actions.destroy(ed.target);
        if (ed) {
            $(ed.target).textbox({ editable: false, height: 'auto' });
        }
    }
}
//#endregion

//#region 删除
function deleteRows(grid, url,deleteChildren) {
    var selections = grid.datagrid('getSelections'); //获取选中的行
    if (selections == null || selections.length <= 0) {
        $.messager.alert("提示", "请选择要操作的行", "info");
        return;
    }
    var message = "确定要删除选中的数据吗?";
    if (deleteChildren)
        message = '确定要删除选中的数据吗（包括选中数据下的所有子数据）?';
    $.messager.confirm('提示', message, function (r) {
        if (r) {
            //循环所选的行
            for (var j = 0; j < selections.length; j++) {
                var index = grid.datagrid('getRowIndex', selections[j]); //获取某行的行号
                grid.datagrid('deleteRow', index); //通过行号移除该行
            }
            var deleted = grid.datagrid('getChanges', 'deleted');
            if (deleted != null && deleted.length > 0) {
                var strDeleted = JSON.stringify(deleted[0]);
                var data = {
                    'data': strDeleted
                }
                doAjax(url, data, function () {
                    grid.datagrid("reload");
                });
            }
        }
    });
}
//#endregion

//#region 保存
function saveRows(grid, addUrl, editUrl) {
    endEdit(grid, grid.datagrid.editIndex);
    var changes = grid.datagrid('getChanges');

    if (changes == null || changes.length <= 0) {
        $.messager.alert("提示", "没有需要保存的数据", "info");
        return;
    }
    for (var i = 0; i < changes.length; i++) {
        var editIndex = grid.datagrid('getRowIndex', changes[i]);
        if (!grid.datagrid('validateRow', editIndex)) {
            $.messager.alert("提示", "存在未通过验证的数据，请仔细检查", "info");
            return;
        }
    }

    var inserts = grid.datagrid('getChanges', 'inserted');
    var updated = grid.datagrid('getChanges', 'updated');
    var data;
    if (inserts != null && inserts.length > 0) {
        var strInserts = JSON.stringify(inserts);
        data = {
            'data': strInserts
        };
        doAjax(addUrl, data, function () {
            grid.datagrid("reload");
        });
    }
    if (updated != null && updated.length > 0) {
        var strUpdated = JSON.stringify(updated);
        data = {
            'data': strUpdated
        };
        doAjax(editUrl, data, function () {
            grid.datagrid("reload");
        });
    }
}
//#endregion

//#region 启用
function StartRows(grid, url) {
    var selections = grid.datagrid('getSelections'); //获取选中的行
    if (selections == null || selections.length <= 0) {
        $.messager.alert("提示", "请选择要操作的行", "info");
        return;
    }
    var strStarts = JSON.stringify(selections);
    var data = {
        'data': strStarts
    }
    doAjax(url, data, function () {
        grid.datagrid("reload");
    });
}
//#endregion

//#region 停用
function BlockRows(grid, url) {
    var selections = grid.datagrid('getSelections');
    if (selections == null || selections.length <= 0) {
        $.messager.alert("提示", "请选择要操作的行", "info");
        return;
    }
    var strBlocks = JSON.stringify(selections);
    var data = {
        'data': strBlocks
    }
    doAjax(url, data, function () {
        grid.datagrid("reload");
    });
}
//#endregion

//#region 重置密码
function ResetPwdRows(grid, url) {
    var selections = grid.datagrid('getSelections'); //获取选中的行
    if (selections == null || selections.length <= 0) {
        $.messager.alert("提示", "请选择要操作的行", "info");
        return;
    }
    $.messager.confirm('提示', '确定要重置选中用户的密码吗?', function (r) {
        if (r) {
            var strResets = JSON.stringify(selections);
            var data = {
                'data': strResets
            }
            doAjax(url, data, function () {
                grid.datagrid("reload");
            });
        }
    });
}
//#endregion

//#region 为操作授权
function Authorize(grid, url) {
    var param = FH.tree.treeSetting.param;
    if (param.pId == '-1' || param.id == '-1' || param.id == null || param.id == "") {
        $.messager.alert("提示", "请选中要授权的操作", "info");
        return;
    }
    $("#dialog").show();
    var dialogSetting = {
        dialog: $("#dialog"),
        title: '对操作授权',
        width: 670,
        height: 625,
        onClose: function () {
            grid.datagrid("reload");
        }
    };
    FH.dialog.init(dialogSetting);
    var setting = {
        grid: $("#grid1"),
        url: '/Authorization/AuthorizeForOperations',
        columns: [
            { field: 'ck', checkbox: true },
            { field: 'OperatorId', title: 'OperatorId' },
            { field: 'OperatorName', title: 'OperatorName' },
            { field: 'CategoryIdentifier', title: 'CategoryIdentifier' },
            { field: 'OperationIdentifier', title: 'OperationIdentifier' },
            { field: 'Name', title: 'Name' },
            { field: 'IsAuthorized', title: 'IsAuthorized', align: 'center' }
        ],
        queryParams: param,
        startUrl: '/Authorization/AuthorizeRows'
    }
    InitGrid(setting);
    $('#ss1').searchbox({
        searcher: function (value, name) {
            var param1 = {
                name: value
            };
            $.extend(true, param, param1);
            $("#grid1").datagrid('reload', param);
        },
        menu: '#mm1',
        width: 300,
        prompt: 'Please Input Value'
    });
}
//#endregion

//#region 为用户授权
function Authorize4Operator(grid, url) {
    var selections = grid.datagrid('getSelections'); //获取选中的行
    if (selections == null || selections.length <= 0) {
        $.messager.alert("提示", "请选择要操作的行", "info");
        return;
    }
    if (selections.length > 1) {
        $.messager.alert("提示", "只能对一个用户授权", "info");
        return;
    }
    var id = selections[0]["Id"];
    var dialogSetting = {
        dialog: $("#dialog"),
        title: '对用户授权',
        width: 300,
        height: 600,
        buttons: [{
            text: '保存',
            handler: function () {
                var nodes = $("#tree1").tree("getChecked");
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].target = null;//target引发谷歌报错：Converting circular structure to JSON。循环引用异常
                }
                var jsonify = function(obj){
                    var seen = [];
                    var json = JSON.stringify(obj, function(key, value){
                        if (typeof value === 'object') {
                            if ( !seen.indexOf(value) ) {
                                return '__cycle__' + (typeof value) + '[' + key + ']'; 
                            }
                            seen.push(value);
                        }
                        return value;
                    }, 4);
                    return json;
                };
                var strNodes =jsonify(nodes);//避免出现循环引用异常
                var data = {
                    'data': strNodes,
                    'operatorId': id
                };
                doAjax(url, data, function () {
                    $("#dialog").dialog("close");
                });
            }
        }, {
            text: '关闭',
            handler: function () {
                $("#dialog").dialog("close");
            }
        }]
    };
    FH.dialog.init(dialogSetting);
    $("#tree1").tree({
        url: "/Operation/GetOperationTree?Id=" + id,
        animate: true,
        lines: true,
        checkbox: true
    });
}

//#endregion

//#region 根据模板授权
function Operator2Operator(grid, url) {
    var selections = grid.datagrid('getSelections'); //获取选中的行
    if (selections == null || selections.length <= 0) {
        $.messager.alert("提示", "请选择要操作的行", "info");
        return;
    }
    if (selections.length > 1) {
        $.messager.alert("提示", "只能对一个用户授权", "info");
        return;
    }
    var id = selections[0]["Id"];
    var dialogSetting = {
        dialog: $("#dialog1"),
        title: '请选择模板',
        width: 200,
        height: 100,
        buttons: [{
            text: '确定',
            handler: function () {
                var value = $("#combobox").combo("getValue");
                var data = {
                    'id': id,
                    'modelId': value
                };
                doAjax(url, data, function () {
                    $("#dialog1").dialog("close");
                });
            }
        }, {
            text: '关闭',
            handler: function () {
                $("#dialog1").dialog("close");
            }
        }]
    };
    FH.dialog.init(dialogSetting);
    $('#combobox').combobox({
        url: '/Operator/GetOperatorsForCombobox',
        valueField: 'id',
        textField: 'text'
    });
}
//#endregion

//#region import操作
function Import(grid, url, fileType) {
    var dialogSetting = {
        dialog: $("#dialog"),
        title: '请选择要导入的文件',
        width: 350,
        height: 100,
        onClose: function () {
            grid.datagrid("reload");
        },
        buttons: [{
            text: '确定',
            handler: function () {
                $("input[name='file1']").attr('id', 'file1');
                AjaxFileUpload(url, 'file1', fileType, function () {
                    $("#dialog").dialog("close");
                    var tree = $("#tree");
                    if (tree) {
                        tree.tree("reload");
                    }
                });
            }
        }, {
            text: '关闭',
            handler: function () {
                $("#dialog").dialog("close");
            }
        }]
    };
    FH.dialog.init(dialogSetting);
    $('#fb').filebox({
        buttonText: '请选择文件'
    });
}
//#endregion

//#region export操作
function Export(grid, url) {
    $.messager.confirm('提示', '确定要将本模块数据导出吗?', function (r) {
        if (r) {
            if (typeof (tree) != "undefined") {
                var categoryId;
                if (tree.tree("getSelected") != null) {
                    categoryId = tree.tree("getSelected").id;
                } else {
                    categoryId = 1;
                }
                document.location.href = url + "?categoryIds=" + categoryId;
            } else {
                var selections = grid.datagrid('getSelections'); //获取选中的行
                if (selections == null || selections.length <= 0) {
                    $.messager.alert("提示", "请选择要导出的分类", "info");
                    return;
                }
                var categoryIds = [];
                for (var i = 0; i < selections.length; i++) {
                    categoryIds.push(selections[i].Identifier);
                }
                document.location.href = url + "?categoryIds=" + categoryIds.join(",");
            }
        }
    });
}
//#endregion

//#region 结束编辑
function endEdit(grid, index) {
    grid.datagrid('endEdit', index);
}
//#endregion

//#region 取消编辑
function cancelEdit(grid, index) {
    grid.datagrid('cancelEdit', index);
}
//#endregion

//#region ajax操作
function doAjax(url, data, fn) {
    $.messager.progress();
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: "json",
        success: function (backData) {
            if (backData.state == '0') {
                $.messager.alert('提示', backData.msg, 'error');
                if (fn) {
                    fn();
                }
            } else if (backData.state == '1') {
                $.messager.show({
                    title: '提示',
                    msg: backData.msg,
                    timeout: 2000,
                    showType: 'slide'
                });
                if (fn) {
                    fn();
                }
            }
            $.messager.progress('close');
        },
        error: function (msg) {
            $.messager.alert('提示', msg.responseText, 'error');
            $.messager.progress('close');
        }
    });
}
//#endregion