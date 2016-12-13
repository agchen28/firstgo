package routers

import (
	"hello/controllers"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
)

func init() {
	beego.AutoRouter(&controllers.UserController{})
	beego.AutoRouter(&controllers.HomeController{})
	beego.Router("/", &controllers.MainController{})
	beego.Router("/user", &controllers.UserController{})
	beego.Router("/home", &controllers.HomeController{})
	beego.Get("/be", func(ctx *context.Context) {
		ctx.Output.Body([]byte("hello world"))
	})
	beego.Post("/post", func(ctx *context.Context) {
		ctx.Output.Body([]byte("bob"))
	})
	beego.Any("/foo", func(ctx *context.Context) {
		ctx.Output.Body([]byte("bar"))
	})
}
