const { program } = require('commander')
const database = require('./database')

async function main() {
    program
        .version('v1')
        .option('-n, --nome [value]', "Hero name")
        .option('-p, --poder [value]', "Hero power")
        .option('-c, --create', "Create a hero")
        .option('-l, --list', "List heroes")
        .option('-r, --remove', "Remove a hero by id")
        .option('-i, --id [value]', "Hero id")
        .option('-u, --update', "Update hero by id")
        .parse()

    const opts = program.opts()

    try {
        if (opts.create) {
            const hero = {
                nome: opts.nome,
                poder: opts.poder
            }
            const result = await database.create(hero)
            if (!result) {
                console.error('Hero not created!')
                return;
            }
            console.error('Hero was succesfully created!')
        }
        if (opts.list) {
            const result = await database.list()
            console.log(result)
            return;
        }
        if (opts.remove) {
            const result = await database.remove(opts.id)
            if (!result) {
                console.error("The hero was not removed!")
            }
            console.error('Hero was succesfully removed!')
        }
        if (opts.update) {
            const idToUpdate = parseInt(opts.id);

            const hero = {
                id: idToUpdate,
                nome: opts.nome ?? delete opts.nome,
                poder: opts.poder ?? delete opts.poder
            }

            console.log(hero)

            const result = await database.update(idToUpdate, hero);
            if (!result) {
                console.error("The hero was not updated!")
            }
            console.log("Hero was succesfully updated!")
        }
    } catch (error) {
        console.error('deu ruim', error)
    }
}

main()