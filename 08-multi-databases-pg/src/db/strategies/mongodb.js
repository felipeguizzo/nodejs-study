const ICrud = require('../interfaces/interfaceCrud')

class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('item saved on MongoDB')
    }

}

module.exports = MongoDB