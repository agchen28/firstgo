package controllers

//HomeController 控制器
type HomeController struct {
	BaseController
}

// Index 首页
func (c *HomeController) Index() {
	c.Data["UserName"] = c.CurrentUser.Name
	c.ReturnDefaultView()
}
