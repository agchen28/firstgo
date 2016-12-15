package controllers

import (
	"hello/common"
	"hello/models"

	"github.com/astaxie/beego"
)

//EntryController 控制器
type EntryController struct {
	BaseController
}

//Prepare 重写
func (c *EntryController) Prepare() {
	c.Data["Title"] = beego.AppConfig.String("appname")
}

// Login 登录
func (c *EntryController) Login() {
	if c.Ctx.Request.Method == "GET" {
		c.ReturnDefaultView()
	}
	user := models.User{Name: c.Ctx.Request.Form["username"][0]}
	result := user.Read()
	if !result {
		c.Data["Message"] = "不存在该用户"
		c.ReturnDefaultView()
	}
	sess, err := common.GlobalSessions.SessionStart(c.Ctx.ResponseWriter, c.Ctx.Request)
	if err != nil {
		c.Data["Message"] = err.Error
		c.ReturnDefaultView()
	}
	if err := sess.Set(beego.AppConfig.String("loginsessionkey"), user.Name); err != nil {
		c.Data["Message"] = err.Error
		c.ReturnDefaultView()
	}
	c.Ctx.Redirect(302, beego.AppConfig.String("homeurl"))
}

// Logout 登出
func (c *EntryController) Logout() {
	sess, _ := common.GlobalSessions.SessionStart(c.Ctx.ResponseWriter, c.Ctx.Request)
	defer sess.SessionRelease(c.Ctx.ResponseWriter)
	sess.Delete("username")
	c.Ctx.Redirect(302, beego.AppConfig.String("loginurl"))
}
