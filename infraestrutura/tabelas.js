class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarAtendimentos()
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
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.error(erro)
            } else {
                console.log('tabelas criadas com sucesso!')
            }
        })
    }
}

module.exports = new Tabelas