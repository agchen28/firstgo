package controllers

import (
	"hello/models"

	"github.com/astaxie/beego"
)

//UserController 测试用
type UserController struct {
	beego.Controller
}

//Index 用户首页
func (c *UserController) Index() {
	c.Layout = "layout.tpl"
	c.Render()
}

//Update 测试用
func (c *UserController) Update() {
	id, _ := c.GetInt("Id")
	user := models.User{ID: id}
	if user.Update(c.GetString("name")) {
		c.Ctx.WriteString(user.Name)
	}
}

//Add 测试用
func (c *UserController) Add() {
	name := c.GetString("name")
	user := models.User{Name: name}
	result := user.Add()
	if result {
		c.Ctx.WriteString("成功")
	} else {
		c.Ctx.WriteString("失败")
	}
}

//Delete 测试用
func (c *UserController) Delete() {
	id, _ := c.GetInt("Id")
	user := models.User{ID: id}
	if user.Delete() {
		c.Ctx.WriteString("删除成功")
	}
}

//Read 测试用
func (c *UserController) Read() {
	// id, _ := c.GetInt("Id")
	// user := models.User{ID: id}
	name := c.GetString("name")
	user := models.User{Name: name}
	result := user.Read()
	if result {
		c.Ctx.WriteString(user.Name)
	} else {
		c.Ctx.WriteString("不存在")
	}
}
