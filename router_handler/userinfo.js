const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户基本信息处理函数
exports.getUserinfo = (req, res) => {
    const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status: 0,
            message: '成功',
            data: results[0]
        })
    })
}

// 更新用户基本信息处理函数
exports.updateUserInfo = (req, res) => {
    const sql = `update ev_users set ? where id=?`
    db.query(sql, [req.body, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
        res.cc('更新成功', 0)
    })
}

// 修改用户密码处理函数
exports.updatePassWord = (req, res) => {
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在')
        const compareResult = bcrypt.compareSync(req.body.oldPW, results[0].password)
        if (!compareResult) return res.cc('原密码错误！')
        const updateSql = `update ev_users set password=? where id=?`
        const newPW = bcrypt.hashSync(req.body.newPW, 10)
        db.query(updateSql, [newPW, req.user.id], (err, results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新密码失败')
            res.cc('更新密码成功', 0)
        })
    })
}

// 更新用户头像处理函数
exports.updateAvatar = (req, res) => {
    const sql = `update ev_users set user_pic=? where id=?`
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新头像失败')
        res.cc('更新头像成功', 0)
    })
}