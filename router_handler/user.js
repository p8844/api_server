const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 用户注册处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) return res.cc('用户名或密码为空!')
    // console.log(userinfo);
    const sqlStr = `select * from ev_users where username=?`
    // db.query('select * from ev_users where username = "d"', (err, results) => {
    //     console.log(results);
    // })
    db.query(sqlStr, [userinfo.username], (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('用户名已被占用')
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // console.log(userinfo);
        // res.send('666')
        const insertSql = `insert into ev_users set ?`
        db.query(insertSql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('注册失败')
            res.cc('注册成功', 0)
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = `select * from ev_users where username=?`
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败，用户不存在')
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码错误登录失败！')
        }
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn
        })
        res.send({ status: 0, message: '登录成功', token: 'Bearer ' + tokenStr})
    })
}