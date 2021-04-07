const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/database/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

conexao.connect(err => {
    if (!err) {
        console.log('Conexão com banco de dados feita com sucesso')

        Tabelas.init(conexao)

        const app = customExpress()
        app.listen(3000, () => console.log('API is running port 3000'))
    } else {
        console.error(err)
    }
})