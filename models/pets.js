const conexao = require('../infraestrutura/conexao')
const uploadDeArquivo = require('../arquivos/uploadDeArquivos')
class Pet {
    adiciona(pet, res) {
        const sql = "INSERT INTO pets SET ?"

        uploadDeArquivo(pet.imagem, pet.nome, (erro, newPath) => {

            if (erro) {
                res.status(400).json(erro.msg)
                return
            }

            const newPet = {
                nome: pet.nome,
                imagem: newPath
            }

            conexao.query(sql, newPet, err => {
                if (err) {
                    res.status(400).json(err.sqlMessage)
                } else {
                    res.status(201).json(newPet)
                }
            })
        })

    }
}

module.exports = new Pet()