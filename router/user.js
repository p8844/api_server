const express = require('express')

const router = express.Router()

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 导入路由处理函数
const user_handler = require('../router_handler/user')

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser)

// 登录
router.post('/login', expressJoi(reg_login_schema), user_handler.login)

module.exports = router