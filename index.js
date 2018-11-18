const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./utils/config')
const http = require('http')

app.use(bodyParser.json())

const createCharList = (text) => {
    
    let charArray = text.toLowerCase().split("").filter(e => /[a-z]/.test(e))
    charArray.sort()

    const characters = []
    let counter = 0
    for (let i = 0; i < charArray.length; i++) {
        let character = charArray[i]

        counter++
        let nextChar = charArray[i + 1]


        if (character.localeCompare(nextChar)) {

            characters.push({ [character]: counter })
            counter = 0;
        }
    }
    return characters
}

app.post('/analyze/', (req, res) => {

    const body = req.body
    const text = body.text

    const textWithoutSpaces = text.replace(/\s/g, "")
    const textLength = {
        withSpaces: text.length,
        withoutSpaces: textWithoutSpaces.length
    }

    let splittedText = text.split(" ").filter(String)
    const wordCount = splittedText.length

    const characters = createCharList(text)

    const response = {
        textLength: textLength,
        wordCount: wordCount,
        characterCount: characters
    }


    res.json(response)
})

const server = http.createServer(app)

server.listen(config.port, () => {
    console.log(`server running on port ${config.port}`)
})


module.exports = {app, server, createCharList}