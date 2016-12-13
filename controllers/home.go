package controllers

import (
	"github.com/astaxie/beego"
)

type HomeController struct {
	beego.Controller
}

func (c *HomeController) Index() {
	c.Layout = "layout.tpl"
	c.Render()
}
