//#region ajax上传
function AjaxFileUpload(url, id, fileType, fn) {
    if (!CheckFile(id, fileType)) return;
    $.messager.progress();
    $.ajaxFileUpload({
        url: url,                                    //用于文件上传的服务器端请求地址
        secureuri: false,                            //是否需要安全协议，一般设置为false
        fileElementId: id,                           //文件上传域的ID
        dataType: 'json',
        type: 'post',
        success: function (data, status) {
            if (data.state == '0') {
                $.messager.alert('提示', data.msg, 'error');
                if (fn) {
                    fn();
                }
            } else if (data.state == '1') {
                $.messager.show({
                    title: '提示',
                    msg: data.msg,
                    timeout: 2000,
                    showType: 'slide'
                });
                if (fn) {
                    fn();
                }
            }
            $.messager.progress('close');
        },
        error: function (data, status, e) {
            $.messager.alert('提示', e, 'error');
            $.messager.progress('close');
        }
    });
}
//#endregion

//#region 检查上传文件
function CheckFile(id, fileType) {
    var uploadObj = $('#' + id).get(0);
    var file = uploadObj.files[0];
    if (!file) {
        alert("请选择上传的文件");
        return false;
    }

//    var fileName = file.name;
//    var fileTypename = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
//    if (fileTypename == fileType) {//这里限定上传文件文件类型

        if (file.size > 1024 * 1024) {
            uploadObj.files = null;
            alert("文件大小不能超过1MB");
            return false;
        }
        return true;
//    }
//    else {
//        alert("请上传{" + fileType + "}格式的文件！");
//        return false;
//    }
}
//#endregion 