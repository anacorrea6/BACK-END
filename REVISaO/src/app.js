import express from 'express'

const app = express()

export default app

const musicas = [
    {
        id: 123,
        titulo: "ainda bem",
        artista:"marisa monte",
        genero: mpb,
        ano_publicacao:2014

    }
    {
        id: 654,
        titulo: "velha infancia",
        artista: "tribalistas",
        genero: "mpb",
        anopublicacao:2012
    }
]
function buscarMusica(id){
    return musicas.findIndex(m => {
        return m.id == Number (id)
    })
}

app.get("/musicas", (req,res) => {
    res.status(200).json(musicas)
})


export default app
