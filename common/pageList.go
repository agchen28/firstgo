package common

//PageList 分页数据结构
type PageList struct {
	Total int64       `json:"total"`
	Rows  interface{} `json:"rows"`
}
