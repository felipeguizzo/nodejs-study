const Mongoose = require('mongoose')
Mongoose.connect('mongodb://heroes-user:admin@localhost:27017/heroes',
    { useNewUrlParser: true }
)

const connection = Mongoose.connection

connection.once('open', () => {
    console.log('Database running.')
})

setTimeout(() => {
    const state = connection.readyState
    console.log(`State: ${state}`)
}, 1000);






const heroeSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('heroe', heroeSchema)

async function main() {
    const result = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log(result)
}

main()