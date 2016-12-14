package filters

import (
	"hello/common"
	"strings"

	"github.com/astaxie/beego/context"
)

//LoginFilter 登录过滤器
func LoginFilter(c *context.Context) {
	if !strings.Contains(c.Request.RequestURI, "entry/login") && !strings.Contains(c.Request.RequestURI, "static") {
		sess, _ := common.GlobalSessions.SessionStart(c.ResponseWriter, c.Request)
		defer sess.SessionRelease(c.ResponseWriter)
		username := sess.Get("username")
		if username == nil {
			c.Redirect(302, "/entry/login")
		}
	}
}
