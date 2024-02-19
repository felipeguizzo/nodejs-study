const ICrud = require('../interfaces/interfaceCrud')

const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._heroes = null
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.log('fail', error)
            return false
        }
    }

    async create(item) {
        const { dataValues } = await this._heroes.create(item, { raw: true })
        return dataValues
    }

    async read(item) {
        const result = await this._heroes.findAll({
            where: { nome: item },
            raw: true
        })
        return result
    }

    async update(id, item) {
        const result = await this._heroes.update(
            item,
            {
                where: { id }
            }
        )
        return result
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._heroes.destroy({ where: query })
    }

    async defineModel() {
        this._heroes = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
        await this._heroes.sync()
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'postgres',
            'buscafacil',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
        await this.defineModel()
    }

}

module.exports = Postgres