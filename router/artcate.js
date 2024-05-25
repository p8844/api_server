const express = require('express');
const router = express.Router();

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate');

// 导入文章分类路由处理函数模块
const article_handler = require('../router_handler/artcate');

// 获取文章分类列表
router.get('/cates', article_handler.getArticleCates);
// 添加文章分类
router.post('/addcates', expressJoi(add_cate_schema), article_handler.addCates);
// 根据id删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), article_handler.deleteCateById);
// 根据 Id 获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), article_handler.getArtCateById);
// 根据 Id 更新文章分类
router.post('/updatecate', expressJoi(update_cate_schema), article_handler.updateCateById);

module.exports = router;