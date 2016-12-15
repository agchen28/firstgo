package common

//PageList 分页数据结构
type PageList struct {
	Total int64       `json:"total"`
	Rows  interface{} `json:"rows"`
}

//SimpleResult 接口返回信息
type SimpleResult struct {
	State int64  `json:"state"`
	Msg   string `json:"msg"`
}

//Bingo 成功
func (s *SimpleResult) Bingo() {
	s.State = 1
	s.Msg = "成功"
}

//Error 失败
func (s *SimpleResult) Error() {
	s.State = 0
	s.Msg = "失败"
}
