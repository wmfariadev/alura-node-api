const conexao = require('../infraestrutura/conexao')

class Pet {
    adiciona(pet, res) {
        const sql = "INSERT INTO pets SET ?"
        conexao.query(sql, pet, err => {
            if (err) {
                res.status(400).json(err.sqlMessage)
            } else {
                res.status(201).json(pet)
            }
        })
    }
}

module.exports = new Pet()