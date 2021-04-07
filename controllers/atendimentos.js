const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => Atendimento.lista(res))

    app.get('/atendimentos/:id', (req, res) => Atendimento.buscaPorId(parseInt(req.params.id), res))

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => {
                res.status(201).json(atendimentoCadastrado)
            })
            .catch(erro => {
                res.status(400).json(erro)
            })
    })
}