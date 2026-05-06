

const express = require('express')
const app = express()

app.use(express.json())

// Simulação da função de banco (já deve existir no seu projeto)
const queryAsync = async (sql, params) => {
    // implementação do banco aqui
}


// ==============================
// UTILS (FUNÇÕES REUTILIZÁVEIS)
// ==============================

// Função para padronizar respostas de sucesso
const respostaSucesso = (res, dados, mensagem = null, status = 200) => {
    return res.status(status).json({
        sucesso: true,
        mensagem,
        dados
    })
}

// Função para padronizar respostas de erro
const respostaErro = (res, mensagem, status = 400) => {
    return res.status(status).json({
        sucesso: false,
        mensagem
    })
}

// Função para validar se entidade existe
const validarExistencia = (entidade, nome = "Registro") => {
    if (!entidade) {
        return `${nome} não encontrado`
    }
    return null
}


// ==============================
// REPOSITORIES (ACESSO AO BANCO)
// ==============================

// USUÁRIOS
const buscarUsuarios = async () => {
    return await queryAsync("SELECT * FROM usuario")
}

const buscarUsuarioPorId = async (id) => {
    const resultado = await queryAsync(
        "SELECT * FROM usuario WHERE id = ?",
        [id]
    )
    return resultado[0] || null
}

// PEDIDOS
const criarPedido = async (pedido) => {
    return await queryAsync("INSERT INTO pedido SET ?", [pedido])
}

// SALAS
const buscarSalaPorId = async (id) => {
    const resultado = await queryAsync(
        "SELECT * FROM sala WHERE id = ?",
        [id]
    )
    return resultado[0] || null
}

const atualizarSala = async (id, dados) => {
    return await queryAsync(
        "UPDATE sala SET ? WHERE id = ?",
        [dados, id]
    )
}

const deletarSala = async (id) => {
    return await queryAsync(
        "DELETE FROM sala WHERE id = ?",
        [id]
    )
}


// ==============================
// SERVICES (REGRAS DE NEGÓCIO)
// ==============================

// Validação de pedido
const validarPedido = ({ cliente, valor }) => {
    if (!cliente || valor === undefined) {
        return "Cliente e valor são obrigatórios"
    }

    if (typeof valor !== "number" || valor <= 0) {
        return "Valor inválido"
    }

    return null
}


// ==============================
// CONTROLLERS (ROTAS)
// ==============================

// ---------- USUÁRIOS ----------

// Listar usuários
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await buscarUsuarios()

        return respostaSucesso(res, usuarios)

    } catch (erro) {
        console.error(erro)
        return respostaErro(res, "Erro ao listar usuários", 500)
    }
})

// Buscar usuário por ID
app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params

        const usuario = await buscarUsuarioPorId(id)

        const erro = validarExistencia(usuario, "Usuário")
        if (erro) return respostaErro(res, erro, 404)

        return respostaSucesso(res, usuario)

    } catch (erro) {
        console.error(erro)
        return respostaErro(res, "Erro ao buscar usuário", 500)
    }
})


// ---------- PEDIDOS ----------

// Criar pedido
app.post('/pedidos', async (req, res) => {
    try {
        const erro = validarPedido(req.body)
        if (erro) return respostaErro(res, erro)

        // Evita passar req.body direto (segurança e controle)
        const { cliente, valor } = req.body

        const novoPedido = {
            cliente,
            valor
        }

        await criarPedido(novoPedido)

        return respostaSucesso(res, null, "Pedido criado com sucesso", 201)

    } catch (erro) {
        console.error(erro)
        return respostaErro(res, "Erro ao criar pedido", 500)
    }
})


// ---------- SALAS ----------

// Atualizar sala
app.put('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dados = req.body

        // Valida se veio algum dado
        if (Object.keys(dados).length === 0) {
            return respostaErro(res, "Nenhum dado enviado")
        }

        const sala = await buscarSalaPorId(id)

        const erro = validarExistencia(sala, "Sala")
        if (erro) return respostaErro(res, erro, 404)

        await atualizarSala(id, dados)

        return respostaSucesso(res, null, "Sala atualizada com sucesso")

    } catch (erro) {
        console.error(erro)
        return respostaErro(res, "Erro ao atualizar sala", 500)
    }
})

// Deletar sala// 
app.delete('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params

        const sala = await buscarSalaPorId(id)

        const erro = validarExistencia(sala, "Sala")
        if (erro) return respostaErro(res, erro, 404)

        await deletarSala(id)

        return respostaSucesso(res, null, "Sala removida com sucesso")

    } catch (erro) {
        console.error(erro)
        return respostaErro(res, "Erro ao remover sala", 500)
    }
})


// ==============================
// INICIALIZAÇÃO DO SERVIDOR
// ==============================

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

