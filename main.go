package main

import (
	"hello/common"
	_ "hello/routers"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/session"
)

func init() {
	config := session.ManagerConfig{
		CookieName:      "gosessionid",
		EnableSetCookie: true,
		Gclifetime:      3600,
		Maxlifetime:     3600,
		Secure:          false,
		CookieLifeTime:  3600,
	}
	common.GlobalSessions, _ = session.NewManager("memory", &config)
	go common.GlobalSessions.GC()

}
func main() {
	// beego.InsertFilter("/*", beego.BeforeRouter, filters.LoginFilter)
	beego.Run()
}
