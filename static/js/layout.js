$(function () {

    hoverMenuItem();

    //#region 绑定tabs的右键菜单
    $("#tabs").tabs({
        onContextMenu: function (e, title) {
            e.preventDefault();
            $('#tabsMenu').menu('show', {
                left: e.pageX,
                top: e.pageY
            }).data("tabTitle", title);
        }
    });
    //#endregion

    //#region 实例化menu的onClick事件
    $("#tabsMenu").menu({
        onClick: function (item) {
            closeTab(this, item.name);
        }
    });
    //#endregion

    //#region 几个关闭事件的实现
    function closeTab(menu, type) {
        var curTabTitle = $(menu).data("tabTitle");
        var tabs = $("#tabs");

        if (type === "close") {
            tabs.tabs("close", curTabTitle);
            return;
        }

        var allTabs = tabs.tabs("tabs");
        var closeTabsTitle = [];

        $.each(allTabs, function () {
            var opt = $(this).panel("options");
            if (opt.closable && opt.title != curTabTitle && type === "Other") {
                closeTabsTitle.push(opt.title);
            } else if (opt.closable && type === "All") {
                closeTabsTitle.push(opt.title);
            }
        });

        for (var i = 0; i < closeTabsTitle.length; i++) {
            tabs.tabs("close", closeTabsTitle[i]);
        }
    }
    //#endregion
});
//#region 在右边center区域打开菜单，新增tab
function addTab(text, href) {
    var tab = $("#tabs");
    if (tab.tabs('exists', text)) {
        tab.tabs('select', text);
    } else {
        var content;
        if (href) {
            content = '<iframe scrolling="yes" frameborder="0"  src="' + href + '" style="width:100%;height:100%;"></iframe>';
        } else {
            content = '路径参数为空！';
        }
        tab.tabs('add', {
            title: text,
            closable: true,
            content: content
        });
    }
}
//#endregion

//#region 菜单项鼠标Hover
function hoverMenuItem() {
    $(".easyui-accordion").find('a').hover(function () {
        $(this).parent().addClass("hover");
    }, function () {
        $(this).parent().removeClass("hover");
    });
}
//#endregion

//退出登录
function loginOut(url) {
    $.messager.confirm('确认', '确定要退出登录吗？', function (r) {
        if (r) {
            location.href = url;
        }
    });
}
