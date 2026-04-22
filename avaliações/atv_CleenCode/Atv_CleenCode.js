const validarExistencia = (resultado, res, tipo) => {
    if (resultado.length === 0) {
        res.status(404).json({
            sucesso: false,
            mensagem: `${tipo} não encontrado(a)`
        })
        return false
    }
    return true
}
                                                    // RESOLUÇÃO GET 1
app.get('/usuarios', async (req, res) => {
    try {
        const listaUsuario = await queryAsync("SELECT * FROM usuarios")

        res.json({
            sucesso: true,
            dados: listaUsuario
        })

    } catch (erro) {
        console.error('Erro ao listar usuários:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar usuários',
            erro: erro.message
        })
    }
})


                                                            // GET 2

app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params

        const usuario = await queryAsync( "SELECT * FROM usuarios WHERE id = ?",[id]
        )

        if (!validarExistencia(usuario, res, "Usuário")) {
            return
        }

        res.json({
            sucesso: true,
            dados: usuario[0]
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar usuário',
            erro: erro.message
        })
    }
})

                                                            //RESOLUCÃO POST

const validarDados = ({ cliente, valor }) => { {}
    if (!cliente || !valor) {
    return "Cliente e valor são obrigatórios"
}

    if (typeof valor !== 'number' || valor <= 0) {
    return "Valor inválido"
}
return null
}

app.post('/pedidos', async (req, res) => {
try {
    const erro = validarDados(req.body)

if (erro) {
    return res.status(400).json({
    sucesso: false,
    mensagem: erro
})
}

await queryAsync("INSERT INTO pedido SET ?", [req.body])

    res.status(201).json({
    sucesso: true,
    mensagem: "Pedido cadastrado."
})

} catch (erro) {
    res.status(500).json({
    sucesso: false,
    mensagem: "Erro ao cadastrar pedidos."
        })
    }
})
// const{cliente,valor} = req.body // pega dois valores que voce da no body e guarda ela em dois parametros especificos nas variaveis(pega valores e salva nas variaveis )
                                        
                                                       //RESOLUÇAÕ PUT

app.put('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dados = req.body

        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?",[id]
        )

        if (!validarExistencia(sala, res, "Sala")) {
            return
        }

        if (Object.keys(dados).length === 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Nenhum dado enviado."
            })
        }

        await queryAsync( "UPDATE sala SET ? WHERE id = ?",[dados, id]
        )

        res.json({
            sucesso: true,
            mensagem: "Sala atualizada"
        })

    } catch (erro) {
        console.error('Erro ao atualizar sala:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar sala',
            erro: erro.message
        })
    }
})

                                        //RESOLUCÃO DELETE
app.delete('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params

        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?",[id]
        )

        if (!validarExistencia(sala, res, "Sala")) {
            return
        }

        await queryAsync("DELETE FROM sala WHERE id = ?", [id])

        res.status(200).json({
            sucesso: true,
            mensagem: "Sala removida com sucesso"
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao remover sala",
            erro: erro.message
        })
    }
})
