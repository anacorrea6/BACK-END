
// Função utilitária para validar existência de uma entidade
const validarExistencia = (resultado, res, tipo) => {
    if (resultado.length === 0) {
        res.status(404).json({
            sucesso: false,
            mensagem: `${tipo} não encontrado`
        });
        return false; // Indica que a validação falhou
    }
    return true; // Indica que a validação passou
};

//Exercício 1 - Usuários

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await queryAsync("SELECT * FROM usuario")

        res.json({
            sucesso: true,
            dados: usuarios
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar usuários"
        })
    }
})

app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params

        const usuario = await queryAsync(
            "SELECT * FROM usuario WHERE id = ?",
            [id]
        )

        if (!validarExistencia(usuario, res, "Usuario")) {
            return; // Para a execução se a validação falhar
        }

        res.json({
            sucesso: true,
            dados: usuario[0]
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao buscar usuário"
        })
    }
})

//Exercício 2 - Pedidos

const validarPedido = ({ cliente, valor }) => {
    if (!cliente || valor === undefined) {
        return "Cliente e valor são obrigatórios"
    }

    if (typeof valor !== "number" || valor <= 0) {
        return "Valor inválido"
    }

    return null
}

app.post('/pedidos', async (req, res) => {
    try {
        const erro = validarPedido(req.body)

        if (erro) {
            return res.status(400).json({
                sucesso: false,
                mensagem: erro
            })
        }

        await queryAsync("INSERT INTO pedido SET ?", [req.body])

        res.status(201).json({
            sucesso: true,
            mensagem: "Pedido criado com sucesso"
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao criar pedido"
        })
    }
})

//Exercício 3 - Salas

const buscarSalaPorId = async (id) => {
    return await queryAsync(
        "SELECT * FROM sala WHERE id = ?",
        [id]
    )
}

// ATUALIZAR SALA
app.put('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dadosAtualizados = req.body

        const sala = await buscarSalaPorId(id)

        if (!validarExistencia(sala, res, "Sala")) {
            return; 
        }

        if (Object.keys(dadosAtualizados).length === 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Nenhum dado enviado"
            })
        }

        await queryAsync(
            "UPDATE sala SET ? WHERE id = ?",
            [dadosAtualizados, id]
        )

        res.json({
            sucesso: true,
            mensagem: "Sala atualizada com sucesso"
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao atualizar sala"
        })
    }
})

// DELETAR SALA
app.delete('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params

        const sala = await buscarSalaPorId(id)

        if (!validarExistencia(sala, res, "Sala")) {
            return; // Para a execução se a validação falhar
        }

        await queryAsync(
            "DELETE FROM sala WHERE id = ?",
            [id]
        )

        res.json({
            sucesso: true,
            mensagem: "Sala removida com sucesso"
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao remover sala"
        })
    }
})