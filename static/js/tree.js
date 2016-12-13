var FH = FH || {};
FH.tree = {
    treeSetting: {
        parentNode: true,
        param: {}
    },
    init: function (setting, grid) {
        var that = this;
        setting.tree.tree({
            url: setting.url,
            animate: true,
            lines: true,
            //checkbox:true,
            onSelect: function (node) {
                var param;
                if (node.id == '-1') {
                    param = {
                        id: node.id
                    };
                } else {
                    if (setting.parentNode) {
                        var pNode = setting.tree.tree('getParent', node.target);
                        param = {
                            id: node.id,
                            pId: pNode.id
                        };
                    } else {
                        param = {
                            id: node.id
                        };
                    }
                }
                $.extend(true, that.treeSetting.param, param);
                grid.datagrid("reload", that.treeSetting.param);
            }
        });
    }
};