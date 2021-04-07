const fs = require('fs')
const path = require('path')

module.exports = (pathFile, fileName, callbackImgCreate) => {
    const validFiles = ['jpg','png','jpeg']
    const typeFile = path.extname(pathFile)    
    const newPath = `./assets/images/${fileName}${typeFile}`

    if(validFiles.indexOf(typeFile.substring(1)) !== -1) {
        fs.createReadStream(pathFile)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => callbackImgCreate(false, newPath))
    } else {
        const erro = {
            "msg": "arquivo inválido"
        }
        callbackImgCreate(erro)
    }
}