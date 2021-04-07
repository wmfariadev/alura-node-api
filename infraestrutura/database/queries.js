const conexao = require('./conexao')

const executaQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, params, (err, result, fields) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })    
}

module.exports = executaQuery