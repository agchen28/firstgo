package controllers

import (
	"hello/common"
	"hello/models"
)

//UserController 测试用
type UserController struct {
	BaseController
}

//Index 用户首页
func (c *UserController) Index() {
	c.Render()
}

//Update 更新
func (c *UserController) Update() {
	id, _ := c.GetInt("Id")
	user := models.User{ID: id}
	if user.Update(c.GetString("name")) {
		c.Ctx.WriteString(user.Name)
	}
}

//Add 添加
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

//Delete 删除
func (c *UserController) Delete() {
	id, _ := c.GetInt("Id")
	user := models.User{ID: id}
	if user.Delete() {
		c.Ctx.WriteString("删除成功")
	}
}

//Page 测试用
func (c *UserController) Page() {
	u := models.User{}
	if err := c.ParseForm(&u); err != nil {
		//handle error

	} else {
		pageIndex, _ := c.GetInt("page")
		pageSize, _ := c.GetInt("rows")
		users, count := u.Paging(pageIndex, pageSize)
		c.Data["users"] = users
		mystruct := common.PageList{
			Total: count,
			Rows:  users,
		}
		c.Data["json"] = &mystruct
		c.ServeJSON()
	}
}
