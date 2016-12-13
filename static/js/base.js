var _loadAttrName = "loading";

// 点击刷新验证码
$("img.checkcode").click(function () {
    $(this).attr("src", "/entry/checkcode?_=" + Math.random());
});

// Ajax执行
function DoAjax(btn, url, data, refresh) {
    if (btn.attr(_loadAttrName)) {
        return;
    }
    btn.attr(_loadAttrName, "true");
    var oTr = btn.parents("tr");
    var oTrClone = oTr.clone();
    $.ajax({
        type: "POST",
        cache: false,
        url: url,
        data: data,
        dataType: "json",
        success: function (backData) {
            alert(backData.msg);
            switch (backData.state) {
                case "0":
                    alert(backData.msg);
                    break;
                case "ok":
                    if (refresh) {
                        location.href = location.href;
                    }
                    break;
                case "addOperatorDone":
                    //添加operator成功后需要返回ID，创建时间
                    oTrClone = DealOperatorTr(oTrClone, backData.id, backData.time);
                    oTr.before(oTrClone);
                    oTr.find("input[type=text]").val("");
                    break;
                case "addCategory":
                    if (refresh) {
                        location.href = location.href;
                    } else {
                        oTrClone = DealCategoryTr(oTrClone);
                        oTr.before(oTrClone);
                        oTr.find("input[type=text]").val("");
                        ColorChange();
                        MouseOnColor();
                    }
                    break;
                case "addOperation":
                    if (refresh) {
                        location.href = location.href;
                    } else {
                        oTrClone = DealOperationTr(oTrClone);
                        oTr.before(oTrClone);
                        oTr.find("input[type=text]").val("");
                        ColorChange();
                        MouseOnColor();
                    }
                    break;
                case "editDone":
                    if (refresh) {
                        location.href = location.href;
                    } else {
                        //单个保存，去掉修改过标记
                        oTr.removeClass("isModified");
                        var oTxts = oTr.find("input[type=text]");
                        oTxts.css("border", "");
                        oTxts.each(function () {
                            $(this).attr("hidValue", $(this).val());
                        });
                    }
                    break;
                case "deleteDone":
                    if (refresh) {
                        location.href = location.href;
                    } else {
                        oTr.remove();
                        ColorChange();
                        MouseOnColor();
                    }
                    break;
                case "start":
                    if (refresh) {
                        location.href = location.href;
                    } else {
                        btn.text("停用");
                        btn.removeClass("start_using");
                        btn.addClass("block_up");
                        btn.parents("td").prev().text("√");
                    }
                    break;
                case "block":
                    if (refresh) {
                        location.href = location.href;
                    } else {
                        btn.text("启用");
                        btn.removeClass("block_up");
                        btn.addClass("start_using");
                        btn.parents("td").prev().text("×");
                    }
                    break;
                default:
                    alert(data.msg);
            }
            btn.removeAttr(_loadAttrName);
        }
    });
}

// ----------------------------------------------------------------- 事件绑定
function BindEvent(type) {
    var elements;
    var typeOperator = "operator";
    var typeCategory = "operationCategory";
    var typeOperation = "operation";
    var typeAuthorization = "authorization";
    var typeOperatorTag = "operatortag";
    var typeOperatorTagMapping = "operatortagmapping";

    switch (type) {
        case typeOperator:
            elements = ".add,.block_up,.start_using,.reset_pwd,.change_category,.checkedStart,.checkedBlock";
            break;
        case typeOperatorTag:
            elements = ".add,.delete";
            break;
        case typeCategory:
            elements = ".add,.edit,.delete,.checkedDelete,.modifiedSave";
            break;
        case typeOperation:
            elements = ".add,.edit,.delete,.checkedDelete,.modifiedSave";
            break;
        case typeAuthorization:
            elements = ".edit,.authorize,.multiauthorize,.modifiedSave";
            break;
        case typeOperatorTagMapping:
            elements = ".edit";
            break;
        default: alert("未知的事件绑定类型！");
            return;
    }

    $(elements).live("click", function () {
        var btn = $(this);
        var operation = btn.attr("class").replace("btn ", "").replace("_", "");

        var url = "/" + type + "/" + operation;
        var data;
        var refresh = true;

        var tr = btn.parents("tr");
        var checkedItems;
        if (type == typeOperator) {
            switch (operation) {
                case "add":
                    data = "name=" + encodeURIComponent(btn.parents("tr").find("input[name=name]").eq(0).attr("value"));
                    break;
                case "blockup":
                case "startusing":
                case "resetpwd":
                    data = "operatorId=" + encodeURIComponent(btn.parents("tr").children("td").eq(0).text());
                    refresh = false;
                case "changecategory":
                    data = "operatorId=" + encodeURIComponent(btn.parents("tr").children("td").eq(0).text()) + "&category=" + encodeURIComponent(btn.parents("tr").find(".category").eq(0).val());
                    break;
                case "checkedStart":
                case "checkedBlock":
                    checkedItems = GetCheckedItems();
                    if (checkedItems == 0)
                        return;
                    data = "checkedItems=" + encodeURIComponent(checkedItems);
                    break;
                default: alert("未知的操作！");
                    return;
            }
        } else if (type == typeOperatorTag) {
            switch (operation) {
                case "add":
                    data = "name=" + encodeURIComponent(btn.parents("span").find("input[name=user_category_name]").eq(0).attr("value"));
                    refresh = true;
                    break;
                case "delete":
                    if (!confirm("你确定要执行该操作？")) {
                        return ;
                    }
                    data = "name=" + encodeURIComponent(btn.parents("span").children("font").eq(0).text());
                    refresh = true;
                    break;
                default: alert("未知的操作！");
                    return;
            }
        } else if (type == typeCategory) {
            switch (operation) {
                case "add":
                case "edit":
                    data = "identifier=" + (operation == "add" ? tr.find(":input[name=identifier]").eq(0).attr("value") : tr.find("td").eq(0).text());
                    data += "&name=" + encodeURIComponent(tr.find(":input[name=name]").eq(0).attr("value"));
                    data += "&ordernum=" + encodeURIComponent(tr.find(":input[name=order_num]").eq(0).attr("value"));
                    refresh = false;
                    break;
                case "delete":
                    if (!confirm("你确定要执行该操作？")) {
                        return;
                    }
                    data = "identifier=" + tr.find("td").eq(0).text();
                    refresh = false;
                    break;
                case "checkedDelete":
                    checkedItems = GetCheckedItems();
                    if (checkedItems == 0)
                        return;
                    data = "checkedItems=" + encodeURIComponent(checkedItems);
                    break;
                case "modifiedSave":
                    var modifiedItems = $(".isModified");
                    if (modifiedItems.length == 0) {
                        alert("没有改动的数据");
                        return;
                    }
                    var modifiedItemsitems = GetModifiedItems(Category, modifiedItems);
                    var strItems = JSON.stringify(modifiedItemsitems);
                    data = "modifiedItems=" + encodeURIComponent(strItems);
                    break;
                default: alert("Error");
                    return;

            }
        } else if (type == typeOperation) {
            switch (operation) {
                case "add":
                case "edit":
                    data = "categoryidentifier=" + tr.find("td").eq(0).text();
                    data += "&identifier=" + (operation == "add" ? tr.find(":input[name=identifier]").eq(0).attr("value") : tr.find("td").eq(1).text());
                    data += "&name=" + encodeURIComponent(tr.find(":input[name=name]").eq(0).attr("value"));
                    data += "&ordernum=" + encodeURIComponent(tr.find(":input[name=order_num]").eq(0).attr("value"));
                    data += "&show=" + tr.find(":input[name=show]").attr("checked");
                    refresh = false;
                    break;
                case "delete":
                    if (!confirm("你确定要删除这个操作？")) {
                        return;
                    }
                    data = "categoryidentifier=" + tr.find("td").eq(0).text();
                    data += "&identifier=" + tr.find("td").eq(1).text();
                    data += "&show=false";
                    refresh = false;
                    break;
                case "checkedDelete":
                    checkedItems = GetCheckedItems();
                    if (checkedItems == 0)
                        return;
                    data = "checkedItems=" + encodeURIComponent(checkedItems);
                    break;
                case "modifiedSave":
                    var modifiedOperations = $(".isModified");
                    if (modifiedOperations.length == 0) {
                        alert("没有改动的数据");
                        return;
                    }
                    var operations = GetModifiedItems(Operation, modifiedOperations);
                    var strOperations = JSON.stringify(operations);
                    data = "modifiedItems=" + encodeURIComponent(strOperations);
                    break;
                default: alert("Error");
                    return;
            }
        } else if (type == typeAuthorization) {
            switch (operation) {
                case "authorize":
                    data = "operatorid=" + _operatorId + "&modelOperatorId=" + $("#operator_list").val();
                    break;
                case "multiauthorize":
                    var operatorIds = "";
                    var checkboxe = $("#multi_auth span input[type=checkbox]");
                    for (var j = 0; j < checkboxe.length; j++) {
                        if (checkboxe[j].checked) {
                            operatorIds += "," + checkboxe[j].value;
                        }
                    }
                    data = "operatorids=" + operatorIds.substring(1, operatorIds.length) + "&modelOperatorId=" + $("#operator_list").val();
                    url = url.replace("multiauthorize", "authorize");
                    refresh = false;
                    break;
                case "edit":
                    data = "operatorid=" + tr.find("td").eq(0).text();
                    data += "&categoryidentifier=" + tr.find("td").eq(2).text();
                    data += "&operationidentifier=" + tr.find("td").eq(3).text();
                    data += "&authorize=" + (tr.find(":input[name=authorize]").eq(0).attr("checked"));
                    refresh = false;
                    break;
                case "modifiedSave":
                    var modifiedAuthorizations = $(".isModified");
                    if (modifiedAuthorizations.length == 0) {
                        alert("没有改动的数据");
                        return;
                    }
                    var authorizations = GetModifiedItems(Authorization, modifiedAuthorizations);
                    var strAuthorizations = JSON.stringify(authorizations);
                    data = "modifiedItems=" + encodeURIComponent(strAuthorizations);
                    break;
                default: alert("Error");
                    return;
            }
        } else if (type == typeOperatorTagMapping) {
            switch (operation) {
                case "edit":
                    var tags = "";
                    var checkboxes = $("#tag_con span input[type=checkbox]");
                    for (var i = 0; i < checkboxes.length; i++) {
                        if (checkboxes[i].checked) {
                            tags += "," + checkboxes[i].value;
                        }
                    }
                    data = "operatorid=" + _operatorId + "&tags=" + encodeURIComponent(tags);
                    refresh = false;
                    break;
                default:
                    alert("Error");
                    return;
            }
        } else {
            alert("未知的事件绑定类型！");
        }
        DoAjax(btn, url, data, refresh);
    });
}

//获取多选框选中的元素
function GetCheckedItems() {
    var checkedNames = "";
    var oCheckeds = $("input:checkbox[name=checkName]:checked");
    if (oCheckeds.length == 0) {
        alert("请选择要操作的行");
        return 0;
    }
    if (!confirm("你确定要执行该操作？")) {
        return 0;
    }
    oCheckeds.each(function (index) {
        if (0 == index) {
            checkedNames = $(this).val();
        } else {
            checkedNames += ("," + $(this).val());
        }
    });
    return checkedNames;
}

//为修改过的元素创建对象数组
function GetModifiedItems(model, modifiedItems) {
    var jsonItems = [];
    var item;
    var i;
    var identifier;
    var name;
    var orderNum;
    var categoryIdentifier;
    switch (model) {
        case Category:
            for (i = 0; i < modifiedItems.length; i++) {
                identifier = $(modifiedItems[i]).children("td").eq(0).text();
                name = $(modifiedItems[i]).find(".checkModify").eq(0).val();
                orderNum = $(modifiedItems[i]).find(".checkModify").eq(1).val();
                item = new model(identifier, name, orderNum);
                jsonItems.push(item);
            }
            break;
        case Operation:
            for (i = 0; i < modifiedItems.length; i++) {
                categoryIdentifier = $(modifiedItems[i]).children("td").eq(0).text();
                identifier = $(modifiedItems[i]).children("td").eq(1).text();
                name = $(modifiedItems[i]).find(".checkModify").eq(0).val();
                orderNum = $(modifiedItems[i]).find(".checkModify").eq(1).val();
                var isShow = $(modifiedItems[i]).find(".checkModify").eq(2).attr("checked");
                item = new model(categoryIdentifier, identifier, name, orderNum, isShow);
                jsonItems.push(item);
            }
            break;
        case Authorization:
            for (i = 0; i < modifiedItems.length; i++) {
                var operatorId = $(modifiedItems[i]).children("td").eq(0).text();
                categoryIdentifier = $(modifiedItems[i]).children("td").eq(2).text();
                var operationIdentifier = $(modifiedItems[i]).children("td").eq(3).text();
                name = $(modifiedItems[i]).children("td").eq(4).text();
                var isAuthorized = $(modifiedItems[i]).find(".checkModify").eq(0).attr("checked");
                item = new model(operatorId, categoryIdentifier, operationIdentifier, isAuthorized, name);
                jsonItems.push(item);
            }
            break;
        default:
            alert("无此对象模型!");
            break;
    }
    return jsonItems;
}

//处理新增类型的TR元素
function DealCategoryTr(oTrClone) {
    var identifier = oTrClone.find("input[name=identifier]").val();
    var name = oTrClone.find("input[name=name]").val();
    var orderNum = oTrClone.find("input[name=order_num]").val();
    var oinputs = oTrClone.find("input");
    oinputs.eq(0).remove();
    oinputs.eq(1).addClass("checkModify").attr("hidValue", name).val(name);
    oinputs.eq(2).addClass("checkModify").attr("hidValue", orderNum).val(orderNum);
    oTrClone.find("input[type=button]").remove();
    var oTds = oTrClone.find("td");
    oTds.eq(0).text(identifier);
    oTds.eq(1).append("<input type='checkbox' name='checkName' value='" + identifier + "'/>");
    oTds.eq(2).text(identifier);
    var aEdit = $("<a href='javascript:' class='btn edit'>编辑</a>");
    var aDelete = $("<a href='javascript:' class='btn delete'>删除</a>");
    var aShow = $("<a target = '_blank' class = 'btn'>查看操作</a>").attr("href", "/operation/?category=" + identifier);
    oTds.eq(5).append(aEdit, aDelete, aShow);
    return oTrClone;
}

//处理新增操作的TR元素
function DealOperationTr(oTrClone) {
    var oTds = oTrClone.find("td");
    var categoryIdentifier = oTds.eq(0).text();
    var identifier = oTrClone.find("input[name=identifier]").val();
    var name = oTrClone.find("input[name=name]").val();
    var orderNum = oTrClone.find("input[name=order_num]").val();

    var oinputs = oTrClone.find("input");
    oinputs.eq(0).remove();
    oinputs.eq(1).addClass("checkModify").attr("hidValue", name).val(name);
    oinputs.eq(2).addClass("checkModify").attr("hidValue", orderNum).val(orderNum);
    oinputs.eq(3).addClass("checkModify");
    oTrClone.find("input[type=button]").remove();
    oTds.eq(1).text(identifier);
    oTds.eq(2).append("<input type='checkbox' name='checkName' value='" + categoryIdentifier + ";" + identifier + "'/>");
    oTds.eq(3).text(categoryIdentifier);
    oTds.eq(4).text(identifier);
    var oCheckShow = oTds.eq(7).find("input[type=checkbox]").eq(0);
    oCheckShow.addClass("show").attr("hidState", oCheckShow.attr("checked"));
    var aEdit = $("<a href='javascript:' class='btn edit'>编辑</a>");
    var aDelete = $("<a href='javascript:' class='btn delete'>删除</a>");
    var aShow = $("<a target = '_blank' class = 'btn'>查看操作</a>").attr("href", "/operation/?category=" + identifier);
    oTds.eq(8).append(aEdit, aDelete, aShow);
    return oTrClone;
}

//处理新增操作员的TR元素
function DealOperatorTr(oTrClone, id, time) {
    var name = oTrClone.find("input[name=name]").val();
    oTrClone.find("input").remove();
    var oTds = oTrClone.find("td");
    oTds.eq(0).text(id);
    oTds.eq(1).append("<input type='checkbox' name='checkName' value='" + id + "'/>");
    oTds.eq(2).text(id);
    oTds.eq(3).text(name);
    var tag = $("<a target='_blank'>修改标签</a>").attr("href", "/operatortagmapping?operatorid=" + id);
    oTds.eq(4).append(tag);
    oTds.eq(5).text(time);
    oTds.eq(6).text("×");
    var aEdit = $("<a href='javascript:' class='btn start_using'>启用</a>");
    var aDelete = $("<a href='javascript:' class='btn reset_pwd'>重置密码</a>");
    var aShow = $("<a target = '_blank' class = 'btn'>授权</a>").attr("href", "/authorization/show/?operatorid=" + id);
    oTds.eq(7).append(aEdit, aDelete, aShow);
    return oTrClone;
}