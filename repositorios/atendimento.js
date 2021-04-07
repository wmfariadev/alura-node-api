const query = require('../infraestrutura/database/queries')

class Atendimento {
    adiciona(atendimento) {
        const sql = `INSERT INTO atendimento SET ?`
        return query(sql, atendimento)
    }
}

module.exports = new Atendimento()