const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'Flexas'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Batman',
    poder: 'Dinheiro'
}

describe('Postgres Strategy', async function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        await context.connect()
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('Postgres Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Cadastrar', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Listar', async () => {
        const [result] = await context.read(MOCK_HEROI_CADASTRAR.nome)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    // it('Atualizar', async () => {
    //     const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
    //     const novoItem = {
    //         ...MOCK_HEROI_ATUALIZAR,
    //         nome: 'Mulher Maravilha'
    //     }
    //     const [result] = await context.update(itemAtualizar.id, novoItem)
    //     const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
    //     assert.deepEqual(result, 1)
    //     assert.deepEqual(itemAtualizado.nome, novoItem.nome)
    // })

    it('remove por id', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})