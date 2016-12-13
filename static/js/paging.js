/*Example
----------------------
var pg = new showPages('pg','pageCount','argName');    //pg 对象名   pageCount 总页数   argName 参数名(可选,缺省为page)  
pg.printHtml(element);                                 //显示页数 element 容器的ID名 如<div id="element"></div>
*/
var _pageCount;
function showPages(name, pageCount, argName) { //初始化属性
    this.name = name;      //对象名称
    this.page = 1;         //当前页数
    this.pageCount = pageCount;    //总页数
    _pageCount = pageCount;
    argName ? this.argName = argName : this.argName = 'page'; //参数名
    this.showTimes = 1;    //打印次数
}

showPages.prototype.getPage = function () { //丛url获得当前页数,如果变量重复只获取最后一个
    var args = location.search;
    var reg = new RegExp('[\?&]?' + this.argName + '=([^&]*)[&$]?', 'gi');
    var chk = args.match(reg);
    this.page = RegExp.$1;
}
showPages.prototype.checkPages = function () { //进行当前页数和总页数的验证
    if (isNaN(parseInt(this.page))) this.page = 1;
    if (isNaN(parseInt(this.pageCount))) this.pageCount = 1;
    if (this.page < 1) this.page = 1;
    if (this.pageCount < 1) this.pageCount = 1;
    if (this.page > this.pageCount) this.page = this.pageCount;
    this.page = parseInt(this.page);
    this.pageCount = parseInt(this.pageCount);
}
showPages.prototype.createHtml = function (mode) { //生成html代码
    var strHtml = '', prevPage = this.page - 1, nextPage = this.page + 1;
    if (mode == '' || typeof (mode) == 'undefined') mode = 0;
    switch (mode) {
        case 2: //模式2 (前后缩略,页数,首页,前页,后页,尾页)
            strHtml += '<span class="page_area">';
            if (prevPage < 1) {
                strHtml += '<span class="page_start"><i></i>上一页</span>';
            } else {
                strHtml += '<a class="page_prev" href="javascript:' + this.name + '.toPage(' + prevPage + ');"><i></i>上一页</a>';
            }
            if (this.page != 1) strHtml += '<a href="javascript:' + this.name + '.toPage(1);">1</a>';
            if (this.page >= 5) strHtml += '<span>...</span>';
            if (this.pageCount > this.page + 2) {
                var endPage = this.page + 2;
            } else {
                var endPage = this.pageCount;
            }
            for (var i = this.page - 2; i <= endPage; i++) {
                if (i > 0) {
                    if (i == this.page) {
                        strHtml += '<span class="page_cur">' + i + '</span>';
                    } else {
                        if (i != 1 && i != this.pageCount) {
                            strHtml += '<a href="javascript:' + this.name + '.toPage(' + i + ');">' + i + '</a>';
                        }
                    }
                }
            }
            if (this.page + 3 < this.pageCount) strHtml += '<span>...</span>';
            //if (this.page != this.pageCount) strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a></span>';
            if (this.page != this.pageCount) strHtml += '<a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a>';
            if (nextPage > this.pageCount) {
                strHtml += '<span class="page_end">下一页</span>';
            } else {
                strHtml += '<a class="page_next" href="javascript:' + this.name + '.toPage(' + nextPage + ');">下一页<i></i></a>';
            }
            strHtml += '</span>';
            break;

        default:
            strHtml = 'Javascript showPage Error: not find mode ' + mode;
            break;
    }
    return strHtml;
}
showPages.prototype.createUrl = function (page) { //生成页面跳转url
    if (isNaN(parseInt(page))) page = 1;
    if (page < 1) page = 1;
    if (page > this.pageCount) page = this.pageCount;
    var url = location.protocol + '//' + location.host + location.pathname; 
    var args = location.search;
    var reg = new RegExp('([\?&]?)' + this.argName + '=[^&]*[&$]?', 'gi');
    args = args.replace(reg, '$1');
    if (args == '' || args == null) {
        args += '?' + this.argName + '=' + page;
    } else if (args.substr(args.length - 1, 1) == '?' || args.substr(args.length - 1, 1) == '&') {
        args += this.argName + '=' + page;
    } else {
        args += '&' + this.argName + '=' + page;
    }
    return url + args;
}
showPages.prototype.toPage = function (page) { //页面跳转
    var turnTo = 1;
    if (typeof (page) == 'object') {
        turnTo = page.options[page.selectedIndex].value;
    } else {
        turnTo = page;
    }
    self.location.href = this.createUrl(turnTo);
}
showPages.prototype.printHtml = function (element) { //显示html代码
    this.getPage();
    if (_pageCount > 1) {
        this.checkPages();
        this.showTimes += 1;
        document.getElementById(element).innerHTML = this.createHtml(2);
    }
}