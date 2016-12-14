package models

import (
	"fmt"

	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql" // import your used driver
)

func init() {
	// set default database
	orm.RegisterDataBase("default", "mysql", "root:Abcd123456*@tcp(115.29.146.103:3306)/test?charset=utf8", 30)

	// register model
	orm.RegisterModel(new(User))

	// create table
	orm.RunSyncdb("default", false, true)
}

//User 测试用
type User struct {
	ID   int
	Name string `form:"username"`
}

//Add 测试用
func (u *User) Add() bool {
	o := orm.NewOrm()
	// insert
	id, err := o.Insert(u)
	fmt.Printf("ID: %d, ERR: %v\n", id, err)
	if err != nil {
		return false
	}
	return true
}

//Update 测试用
func (u *User) Update(name string) bool {
	o := orm.NewOrm()
	// update
	u.Name = name
	num, err := o.Update(u)
	fmt.Printf("NUM: %d, ERR: %v\n", num, err)
	if err != nil {
		return false
	}
	return true
}

//Read 测试用
func (u *User) Read() bool {
	o := orm.NewOrm()
	// read one
	err := o.Read(u, "Name")
	fmt.Printf("ERR: %v\n", err)
	if err != nil {
		return false
	}
	return true
}

//Delete 测试用
func (u *User) Delete() bool {
	o := orm.NewOrm()
	// delete
	num, err := o.Delete(u)
	fmt.Printf("NUM: %d, ERR: %v\n", num, err)
	if err != nil {
		return false
	}
	return true
}

//Paging 分页数据
func (u *User) Paging(page int, pageSize int) ([]*User, int64) {
	o := orm.NewOrm()
	// 获取 QuerySeter 对象，user 为表名
	qs := o.QueryTable("user")
	// 也可以直接使用对象作为表名
	user := new(User)
	qs = o.QueryTable(user) // 返回 QuerySeter
	offset := (pageSize * (page - 1))
	qs.Limit(pageSize, offset)
	var users []*User
	if u.Name != "" {
		qs = qs.Filter("name__contains", u.Name)
	}
	qs.All(&users)
	count, _ := qs.Count()
	return users, count
}
