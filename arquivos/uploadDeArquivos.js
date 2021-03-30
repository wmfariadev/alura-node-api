const fs = require('fs')

fs.createReadStream('./assets/cachorro.jpg')
    .pipe(fs.createWriteStream('./assets/salsicha.jpg'))
    .on('finish', () => console.log('Imagem salva com sucesso'))