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
	if !strings.Contains(c.Ctx.Request.RequestURI, "entry/login") && !strings.Contains(c.Ctx.Request.RequestURI, "static") {
		sess, _ := common.GlobalSessions.SessionStart(c.Ctx.ResponseWriter, c.Ctx.Request)
		defer sess.SessionRelease(c.Ctx.ResponseWriter)
		username := sess.Get("username")
		if username == nil {
			c.Ctx.Redirect(302, "/entry/login")
		} else {
			u, ok := username.(string)
			if ok {
				c.CurrentUser.Name = u
			}
		}
	}
}

//Prepare runs after Init before request function execution.
func (c *BaseController) Prepare() {
	c.Layout = "layout.tpl"
	checkLogin(c)
}

//ParseRequest 解析json数据到struct
func (c *BaseController) ParseRequest(key string, obj interface{}) error {
	s := c.GetString("data")
	data := []byte(s)
	return json.Unmarshal(data, obj)
}

//ReturnView 返回视图
func (c *BaseController) ReturnView() {
	c.Render()
}

//ReturnSimpleResult 返回json结果
func (c *BaseController) ReturnSimpleResult(result *common.SimpleResult) {
	c.Data["json"] = &result
	c.ServeJSON()
}

//ReturnPageResult 返回json分页结果
func (c *BaseController) ReturnPageResult(count int64, rows interface{}) {
	pageList := common.PageList{
		Total: count,
		Rows:  rows,
	}
	c.Data["json"] = &pageList
	c.ServeJSON()
}
