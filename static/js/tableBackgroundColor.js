// 表单特效
window.onload = function () {
    ColorChange();
    MouseOnColor();
    //全选
    $(".checkAll").click(function () {
        if (this.checked) {
            $("input[name='checkName']").attr('checked', true);
        } else {
            $("input[name='checkName']").attr('checked', false);
        }
    });

    //operation模块批量设置显示,权限模块批量授权
    $(".checkAllShow").click(function () {
        if (this.checked) {
            $(".show").attr('checked', true);
        } else {
            $(".show").attr('checked', false);
        }
    });
    $(".checkAllShow").blur(function () {
        $(".show").each(function () {
            if ($(this).attr("hidState") != $(this).attr("checked")) {
                $(this).parents("tr").addClass("isModified");
            }
        });
    });

    //修改后标记,验证不能为空
    $(".checkModify").live("blur", function () {
        var _this = $(this);
        var type = _this.attr("type");
        if (type == "text") {
            var currentValue = _this.val();
            var hidValue = _this.attr("hidValue");
            if ((currentValue == "") || (currentValue == null)) {
                alert("不能为空");
                _this.val(hidValue);
                return;
            }
            if (currentValue == hidValue) {
                _this.css("border-color", "");
                //                _this.parents("tr").removeClass("isModified");
            } else {
                _this.css("border-color", "red");
                _this.parents("tr").addClass("isModified");
            }
        } else if (type == "checkbox") {
            //设置复选框边框颜色的变化。没有效果？？？
            var currentState = _this.attr("checked");
            var hidState = _this.attr("hidState");
            if (currentState == hidState) {
                //                _this.css("border-color", "");
                //                _this.parents("tr").removeClass("isModified");
            } else {
                //                _this.css("border-color", "red");
                _this.parents("tr").addClass("isModified");
            }
        }
    });

    //只能输入数字的文本框
    $(".numTxt").live("keydown", function (oEvent) {
        if (oEvent.keyCode != 8 && (oEvent.keyCode < 48 || oEvent.keyCode > 57) && (oEvent.keyCode < 96 || oEvent.keyCode > 105)) {
            return false;
        }
        return true;
    });
}

//隔行变色
function ColorChange() {
    var oTrs = document.getElementsByTagName('tr');
    for (var i = 0; i < oTrs.length; i++) {
        if (i % 2 == 0) {
            oTrs[i].style.background = '#f4f4f4';
        } else {
            oTrs[i].style.background = '';
        }
    }
}

//鼠标经过变色
function MouseOnColor() {
    var oTrs = document.getElementsByTagName('tr');
    for (var i = 0; i < oTrs.length; i++) {
        oTrs[i].index = i;
        oTrs[i].onmouseover = function () {
            this.style.background = '#a9a9a9';
        }
        oTrs[i].onmouseout = function () {
            if (this.index % 2 == 0) {
                this.style.background = '#f4f4f4';
            } else {
                this.style.background = '#ffffff';
            }
        }
    }
}