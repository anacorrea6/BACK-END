// =============================================================================
// MÉTODO PARA ATUALIZAR PRODUTO NO BANCO
// =============================================================================
const buscarProdutoPorId = async (id) => {
    return await queryAsync(
        "SELECT * FROM produto WHERE id = ?", [id]
    )
}


app.put('/produto/:id', async (req, res) => {
    try{
        const { id } = req.params
        const dadosAtualizadas = req.body

        const produto = await buscarProdutoPorId(id)

        if (!produtoExistente(produto, res, "produto")) {
            return;
        }

        if(Object.keys(produtoAtualizado).length === 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: "Nenhuma informação enviada"
            })
        }
         await queryAsync ("UPDATE produtos SET ? WHERE id = ?"
         [id, dadosAtualizados]
        )

        res.json({
            sucesso: true,
            mensagem: "Produto atualizado com sucesso"
        })

    }catch (erro){
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao atualizar produtos. Nome é OBRIGATÓRIO"
        })

        if (typeof preco !== "number" || preco <= 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: "preco invalido"
            })
        }
    }
})