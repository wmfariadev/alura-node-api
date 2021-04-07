const axios = require('axios')
const moment = require('moment')

const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimento')

class Atendimento {
    constructor() {
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = (tamanho) => tamanho >= 5

        this.validacoes = [
            {
                nome:"cliente",
                valido: this.clienteEhValido,
                descricao: "Nome do cliente tem que ser maior que 4 caracteres"
            },
            {
                nome:"data",
                valido: this.dataEhValida,
                descricao: "Data de atendimento não pode ser menor que a data atual"
            },
        ]

        this.valida = parametros => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })
    }

    adiciona(atendimento) {
        const dateFormatSend = 'YYYY-MM-DD HH:mm:ss'
        const dateFormatReq = 'DD/MM/YYYY HH:mm'
        
        const data = moment(atendimento.data, dateFormatReq).format(dateFormatSend)
        const dataCriacao = moment().format(dateFormatSend)

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        let erros = this.valida(parametros)

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