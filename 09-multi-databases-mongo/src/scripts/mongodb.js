

// databases
show dbs
// mudando o contexto para uma database
use heroes
// mostrar tables (collections)
show collections



db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})