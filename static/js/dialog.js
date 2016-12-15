var MD = MD || {};
MD.dialog = {
    init: function (setting) {
        setting.dialog.dialog({
            title: setting.title,
            width: setting.width,
            height: setting.height,
            resizable: true,
            maximizable: true,
            collapsible: true,
            closed: false,
            draggable: false,
            cache: false,
            modal: true,
            buttons: setting.buttons,
            onClose: setting.onClose
        });
    }
};