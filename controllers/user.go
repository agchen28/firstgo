package controllers

import (
	"hello/common"
	"hello/models"
)

//UserController 控制器
type UserController struct {
	BaseController
}

//Index 用户首页
func (c *UserController) Index() {
	c.ReturnDefaultView()
}

//Create 创建
func (c *UserController) Create() {
	result := common.SimpleResult{}
	result.Error()
	u := []models.User{}
	if err := c.ParseRequest("data", &u); err == nil {
		if len(u) == 1 && u[0].Create() {
			result.Bingo()
		}
		if len(u) > 1 {
			if _, err := models.InsertMultiu(u); err == nil {
				result.Bingo()
			}
		}
	}
	c.ReturnSimpleResult(&result)
}

//Update 更新
func (c *UserController) Update() {
	result := common.SimpleResult{}
	result.Error()
	u := []models.User{}
	if err := c.ParseRequest("data", &u); err == nil {
		if len(u) > 0 {
			updateResult := true
			for _, user := range u {
				updateResult = user.Update()
			}
			if updateResult {
				result.Bingo()
			}
		}
	}
	c.ReturnSimpleResult(&result)
}

//Delete 删除
func (c *UserController) Delete() {
	result := common.SimpleResult{}
	result.Error()
	u := models.User{}
	if err := c.ParseRequest("data", &u); err == nil {
		if u.Delete() {
			result.Bingo()
		}
	}
	c.ReturnSimpleResult(&result)
}

//Page 分页数据
func (c *UserController) Page() {
	u := models.User{}
	if err := c.ParseForm(&u); err != nil {
		//handle error
		result := common.SimpleResult{}
		result.Error()
		c.ReturnSimpleResult(&result)
	} else {
		pageIndex, _ := c.GetInt("page")
		pageSize, _ := c.GetInt("rows")
		users, count := u.Paging(pageIndex, pageSize)
		c.ReturnPageResult(count, users)
	}
}
