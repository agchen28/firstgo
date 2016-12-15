package controllers

import (
	"encoding/json"
	"hello/common"
	"hello/models"
	"strings"

	"github.com/astaxie/beego"
)

//BaseController 控制器
type BaseController struct {
	beego.Controller
	CurrentUser models.User
}

func checkLogin(c *BaseController) {
	if strings.Contains(c.Ctx.Request.RequestURI, beego.AppConfig.String("loginurl")) {
		return
	}
	sess, _ := common.GlobalSessions.SessionStart(c.Ctx.ResponseWriter, c.Ctx.Request)
	defer sess.SessionRelease(c.Ctx.ResponseWriter)
	username := sess.Get(beego.AppConfig.String("loginsessionkey"))
	if username == nil {
		c.Ctx.Redirect(302, beego.AppConfig.String("loginurl"))
	} else {
		if u, ok := username.(string); ok {
			c.CurrentUser.Name = u
		}
	}
}

//Prepare runs after Init before request function execution.
func (c *BaseController) Prepare() {
	checkLogin(c)
	c.Layout = "layout.tpl"
	c.Data["Title"] = beego.AppConfig.String("appname")
}

//ParseRequest 解析json数据到struct
func (c *BaseController) ParseRequest(key string, obj interface{}) error {
	return json.Unmarshal([]byte(c.GetString(key)), obj)
}

//ReturnDefaultView 返回默认视图
func (c *BaseController) ReturnDefaultView() {
	c.Render()
}

//ReturnView 返回视图
func (c *BaseController) ReturnView(view string) {
	c.TplName = view
	c.Render()
}

//ReturnSimpleResult 返回json结果
func (c *BaseController) ReturnSimpleResult(result *common.SimpleResult) {
	c.Data["json"] = &result
	c.ServeJSON()
}

//ReturnPageResult 返回json分页结果
func (c *BaseController) ReturnPageResult(count int64, rows interface{}) {
	c.Data["json"] = &common.PageList{
		Total: count,
		Rows:  rows,
	}
	c.ServeJSON()
}
