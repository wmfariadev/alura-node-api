const fs = require('fs')

fs.readFile('./assets/cachorro.jpg', (erro, buffer) => {
    console.log('Imagem bufferizada')
    
    fs.writeFile('./assets/kiara.jpg', buffer, erro => {
        console.log('kiara escrita')
    })
})