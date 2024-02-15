const { deepEqual } = require('assert');

const DEFAULT_ITEM_CREATE = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_UPDATE = {
    nome: 'Hulk',
    poder: 'Strenght',
    id: 2
}

const database = require('./database')

describe('Suite de manipulação de Herois', () => {
    before(async () => {
        await database.create(DEFAULT_ITEM_CREATE)
        await database.create(DEFAULT_ITEM_UPDATE)
    })

    it('Should search an hero in a file', async () => {
        const expected = DEFAULT_ITEM_CREATE
        // gets the first item from a list
        const [result] = await database.list(expected.id);
        deepEqual(result, expected)
    })

    it('Should create a hero, using file data', async () => {
        const expected = DEFAULT_ITEM_CREATE
        await database.create(DEFAULT_ITEM_CREATE)
        const [actual] = await database.list(DEFAULT_ITEM_CREATE.id)
        deepEqual(actual, expected)
    })

    it('Should remove a hero by id', async () => {
        const expected = true
        const result = await database.remove(DEFAULT_ITEM_CREATE.id)
        deepEqual(result, expected)
    })

    it('Should update the hero by id', async () => {
        const expected = {
            ...DEFAULT_ITEM_UPDATE,
            nome: "Batman",
            poder: "Money"
        }

        const assertion = {
            nome: "Batman",
            poder: "Money"
        }

        await database.update(DEFAULT_ITEM_UPDATE.id, assertion)
        const [result] = await database.list(DEFAULT_ITEM_UPDATE.id)
        deepEqual(result, expected)
    })
})