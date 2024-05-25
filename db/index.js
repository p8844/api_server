const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'lwhlwh',
    database: 'heima'
})

// db.query('select * from ev_users', (err, result) => {
//     if(err) return console.log(err.message)
//     console.log(result);
// })

module.exports = db