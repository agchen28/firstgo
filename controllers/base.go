package controllers

import (
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

//Prepare runs after Init before request function execution.
func (c *BaseController) Prepare() {
	c.Layout = "layout.tpl"
	checkLogin(c)
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
