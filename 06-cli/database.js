const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.NOME_ARQUIVO = `heroes.json`
    }

    async getDataFromFile() {
        const file = await readFileAsync(this.NOME_ARQUIVO, { encoding: 'utf-8' });
        return JSON.parse(file.toString())
    }

    async writeInFile(data) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(data))
        return true
    }

    async create(hero) {
        const data = await this.getDataFromFile()
        // for test purposes
        const id = hero.id <= 2 ? hero.id : Date.now()

        const newHero = {
            id,
            ...hero
        }

        const newData = [
            ...data,
            newHero
        ]

        const result = await this.writeInFile(newData)
        return result
    }

    async list(id) {
        const data = await this.getDataFromFile()
        return data.filter(item => (id ? (item.id === id) : true))
    }

    async remove(id) {
        if (!id) return await this.writeInFile([])

        const data = await this.getDataFromFile()
        const index = data.findIndex(item => item.id === parseInt(id))
        if (index === -1) throw Error('This hero does not exists')
        data.splice(index, 1)
        return await this.writeInFile(data)
    }

    async update(id, modifications) {
        const data = await this.getDataFromFile()
        const index = data.findIndex(item => item.id === parseInt(id))
        if (index === -1) throw Error('This hero does not exists')
        const current = data[index]
        const updateHero = {
            ...current,
            ...modifications
        }
        data.splice(index, 1)
        return await this.writeInFile([...data, updateHero])
    }
}

module.exports = new Database()