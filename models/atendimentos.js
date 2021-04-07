const axios = require('axios')
const moment = require('moment')

const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimento')

class Atendimento {
    adiciona(atendimento) {
        const dateFormatSend = 'YYYY-MM-DD HH:mm:ss'
        const dateFormatReq = 'DD/MM/YYYY HH:mm'
        
        const data = moment(atendimento.data, dateFormatReq).format(dateFormatSend)
        const dataCriacao = moment().format(dateFormatSend)

        let validacoes = [
            {
                campo:"cliente",
                valido: atendimento.cliente.length >= 5,
                descricao: "Nome do cliente tem que ser maior que 4 caracteres"
            },
            {
                campo:"data",
                valido: moment(data).isSameOrAfter(dataCriacao),
                descricao: "Data de atendimento não pode ser menor que a data atual"
            },
        ]

        let erros = validacoes.filter(item => !item.valido)

        console.log(validacoes)
        console.log(erros)

        if (erros.length > 0) {
            return new Promise((resolve, reject) => reject(erros))
        }

        const atendimentoDatado = {...atendimento, dataCriacao, data}
        return repositorio.adiciona(atendimentoDatado)
            .then(result => {
                const id = result.insertId
                return { ...atendimento, id }
            })

    }

    lista(res) {
        const sql = `SELECT * FROM atendimento`
        this.executeQueryGet(sql, res)
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimento WHERE id = ${id}`
        conexao.query(sql, async (err, result) => {
            const atendimento = result[0]
            const cpf = atendimento.cliente
            if (err) {
                res.status(400).json(err.sqlMessage)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
                res.status(200).json(atendimento)
            }
        })
    }

    executeQueryGet(sql, res) {
        conexao.query(sql, (err, result) => {
            if (err) {
                res.status(400).json(err.sqlMessage)
            } else {
                res.status(200).json(result)
            }
        })
    }

    executeQueryPost(sql, object, res) {
        conexao.query(sql, object, (err, result) => {
            if (err) {
                res.status(400).json(err.sqlMessage)
            } else {
                res.status(201).json({
                    "Atendimento": result.insertId
                })
            }
        })
    }
}

module.exports = new Atendimento