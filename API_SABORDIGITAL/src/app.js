const express = require('express')
const pool = require('./config/database')

const app = express()

const queryAsync = (sql,values = []) => {
    return new Promise((resolve,reject) => {
        pool.query(sql, values, (err, results) => {
            if(err) reject(err)
                else resolve(results)
        })
    })
}   

app.use(express.json())

app.get('/', (req,res) => {
    res.send('API SaborDigital está funcionando!')
})

app.get('/produtos', async (req,res) => {
   try {
    const produtos = await queryAsync('SELECT * FROM produto')
    res.json({
        sucesso: true,
        dados: produtos,
        total:produtos.length
   })
   } catch(erro) {
    console.error('Erro ao listar produtos:', erro)
    res.status(500).json({
    sucesso:false,
    mensagem: 'Erro ao listar produtos',
    erro: erro.message
    })
   }
})

app.get('produtos/:id', async (req,res) => {
    try{
        const {id} = req.params

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de produto inválido'
            })
        }

        const produto = await queryAsync('SELECT * FROM produto WHERE id = ?', [id])

        if(produto.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'produto não encontrado'
            })
        }

        res.json({
            sucesso: true,
            dados: produto[0]
        })
    } catch (erro) {
        console.error('Erro ao listar produtos:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar produtos',
            erro: erro.message
        })
    }
})

app.post('/produtos', async (req,res) => {
    try {
        const {nome, descricao, preco, disponivel} = req.body

        if(!nome || !descricao || !preco || !disponivel) {
            return res.status(400).json({
              sucesso: false,
              mensagem: 'nome, descricao,preco, disponivel são obrigatórios'    
            })
        
        }
        
        if(typeof preco !== 'number' || preco  <=0)
            return res.status(400).json({
                sucesso:false,
                mensagem:'Preço inválido. O preço deve ser um número maior que zero'
        })

        const novoProduto = {
            nome:nome.trim(),
            descricao:descricao.trim(),
            preco:preco,
            disponivel:disponivel || null,
        }

        const resultado = await queryAsync('INSERT INTO produto SET ?', [novoProduto]) 

        res.status(201).json({
            sucesso:true,
            mensagem:'produto criado com sucesso',
            id:resultado.insertId
        })

    }catch (erro){
        console.error('Erro ao listar produtos:', erro)
        res.status(500).json({
            sucesso:false,
            mensagem: 'Erro ao listar produtos',
            erro: erro.message
        })
    }
})

app.put('/produtos/:id', async (req,res) => {
    try {
        const{id} = req.params
        const {nome, descricao, preco, disponivel} = req.body

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de produtos inválido'
            })
        }

        const produtoExiste = await queryAsync ('SELECT * FROM produto WHERE id = ?', [id])

        if(produtoExiste.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'produto não encontrado'
            })
        }
        const produtoAtualizado = {}

         if(nome !== undefined) produtoAtualizado.nome = nome.trim()

        if (descricao !== undefined) produtoAtualizado.descricao = descricao.trim()

        if (preco !== undefined) {
            if(typeof preco !== 'number' || preco <= 0)
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'preco deve ser um número positivo.'
                })
                produtoAtualizado.preco = preco
    }
        if(disponivel !== undefined) produtoAtualizado.disponivel = disponivel
       

        if(Object.keys(produtoAtualizado).length === 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nenhum campo para atualizar'
            })
        }

        await queryAsync('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado,id])
        res.json({
            sucesso: true,
            mensagem: 'produto atualizado!'
        })
            
    } catch (erro) {
        console.error('Erro ao atualizar produtos', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar produtos',
            erro: erro.message,
        })
        
    }
})

app.delete('/produtos/:id', async (req,res)=> {
try {
    const{id} = req.params

    if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de produto inválido'
            })
        }

        const produtoExiste = await queryAsync ('SELECT * FROM produto WHERE id = ?', [id])

        if(produtoExiste.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'produto não encontrado'
            })
        }

        await queryAsync('DELETE FROM produto WHERE id = ?', [id])

        res.json({
            sucesso: true,
            mensagem:'produto deletado com sucesso'
        })



} catch (erro) {
    console.error('Erro ao apagar produto', erro)
    res.status(500).json({
        sucesso: false,
        mensagem: 'produto apagado com sucesso',
        erro: erro.message
    })

}
})

module.exports = app