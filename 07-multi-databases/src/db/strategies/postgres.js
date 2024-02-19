const ICrud = require('../interfaces/interfaceCrud')

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('item saved on Postgres')
    }

    read(query) {
        console.log('item saved on Postgres')
    }

    update(id, item) {
        console.log('item saved on Postgres')
    }

    delete(id) {
        console.log('item saved on Postgres')
    }

}

module.exports = Postgres