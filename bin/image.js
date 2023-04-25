const images = require('images')
const path = require('path')
const inquirer = require('inquirer')
const { program } = require('commander')

const outputPath = path.resolve('')
const getFilename = filePath => {
    const arr = filePath.split('\\')
    const filename = arr[arr.length - 1]
    return filename
}

const compress = async filePath => {
    const questions = [{ type: 'input', name: 'quality', message: '图片质量', default: 10 }]
    const answers = await inquirer.prompt(questions)
    const img = images(path.resolve(filePath))
    img.save(path.join(outputPath, 'compress.' + getFilename(filePath)), {
        quality: answers.quality,
    })
}

const scale = async filePath => {
    const questions = [{ type: 'input', name: 'width', message: '缩放后的宽度' }]
    const answers = await inquirer.prompt(questions)
    const img = images(path.resolve(filePath))
    const width = parseInt(answers.width) || img.width()
    img.size(width).save(path.join(outputPath, 'size.' + getFilename(filePath)))
}

program
    .command('image')
    .description('跟图片相关的一些功能')
    .option('-c | --compress <image-path>', '图片压缩')
    .option('-s | --scale <image-path>', '图片缩放')
    .action(opt => {
        const key = Object.keys(opt)[0]
        const arg = opt[key]
        if (key == 'compress') compress(arg)
        else if (key == 'scale') scale(arg)
    })
