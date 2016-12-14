package controllers

import (
	"hello/common"
	"hello/models"

	"github.com/astaxie/beego"
)

//EntryController 控制器
type EntryController struct {
	beego.Controller
}

// Login 登录
func (c *EntryController) Login() {
	if c.Ctx.Request.Method == "GET" {
		c.Render()
	} else {
		user := models.User{Name: c.Ctx.Request.Form["username"][0]}
		result := user.Read()
		if result {
			sess, _ := common.GlobalSessions.SessionStart(c.Ctx.ResponseWriter, c.Ctx.Request)
			sess.Set("username", user.Name)
			c.Ctx.Redirect(302, "/home/index")
		} else {
			c.Data["Message"] = "不存在该用户"
			c.Render()
		}
	}
}

// Logout 登出
func (c *EntryController) Logout() {
	sess, _ := common.GlobalSessions.SessionStart(c.Ctx.ResponseWriter, c.Ctx.Request)
	defer sess.SessionRelease(c.Ctx.ResponseWriter)
	sess.Delete("username")
	c.Ctx.Redirect(302, "/entry/login")
}
