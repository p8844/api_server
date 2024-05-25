const express = require('express')
const router = express.Router()

const article_handler = require('../router_handler/article')

// 添加文章
// router.post('/add', upload.single('cover_img'), article_handler.addArticle)


module.exports = router