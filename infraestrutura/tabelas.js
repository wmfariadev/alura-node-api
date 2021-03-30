class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos() {
        const sql = `CREATE TABLE IF NOT EXISTS atendimento (
            id INT NOT NULL AUTO_INCREMENT,
            cliente VARCHAR(50) NOT NULL,
            pet VARCHAR(20),
            servico VARCHAR(20) NOT NULL,
            status VARCHAR(20) NOT NULL,
            observacao TEXT,
            data DATETIME NOT NULL,
            dataCriacao DATETIME NOT NULL,
            PRIMARY KEY(id)
        )`
        this.conexao.query(sql, erro => {
            if(erro) {
                console.error(erro)
            } else {
                console.log('tabelas atendimento criada com sucesso!')
            }
        })
    }

    criarPets() {
        const sql = `CREATE TABLE IF NOT EXISTS pets (
            id INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(50),
            imagem VARCHAR(200),

            PRIMARY KEY(id)
        )`

        this.conexao.query(sql, erro => {
            if(erro) {
                console.error(erro)
            } else {
                console.log('tabelas pets criada com sucesso!')
            }
        } )
    }
}

module.exports = new Tabelas