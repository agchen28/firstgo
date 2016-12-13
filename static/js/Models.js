//Category类
function Category(identifier, name, orderNum) {
    this.Identifier = identifier;
    this.Name = name;
    this.OrderNum = orderNum;
}

//Operation类
function Operation(categoryIdentifier, identifier, name, orderNum, isShow) {
    this.CategoryIdentifier = categoryIdentifier;
    this.Identifier = identifier;
    this.Name = name;
    this.OrderNum = orderNum;
    this.IsShow = isShow;
}

//Authorization类
function Authorization(operatorId, categoryIdentifier, operationIdentifier, isAuthorized, name) {
    this.OperatorId = operatorId;
    this.CategoryIdentifier = categoryIdentifier;
    this.OperationIdentifier = operationIdentifier;
    this.IsAuthorized = isAuthorized;
    this.Name = name;
}