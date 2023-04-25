const qr = require('qr-image')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const { program } = require('commander')
const jimp = require('jimp')
const QrReader = require('qrcode-reader')
const create = async () => {
    const outputPath = path.resolve('')
    const ext = 'png'
    const questions = [{ type: 'input', name: 'text', message: '文本', default: '' }]
    const answers = await inquirer.prompt(questions)
    const qrImage = qr.imageSync(answers.text, {
        type: ext,
    })
    fs.writeFileSync(path.join(outputPath, 'qrcode.' + ext), qrImage)
}

const decode = filePath => {
    const buffer = fs.readFileSync(filePath)
    jimp.read(buffer, (err, image) => {
        if (err) console.error(err)
        const qrcode = new QrReader()
        qrcode.callback = (err, value) => {
            if (err) console.error(err)
            console.log(value.result)
        }
        qrcode.decode(image.bitmap)
    })
}

program
    .command('qrcode')
    .description('跟二维码相关的一些功能')
    .option('-c | --create', '根据文本创建二维码')
    .option('-d | --decode <image-path>', '解析二维码')
    .action(opt => {
        const key = Object.keys(opt)[0]
        const arg = opt[key]
        if (key == 'create') {
            create()
        } else if (key == 'decode') {
            decode(arg)
        }
    })
