// EXERCICIO 1 - CLASSE SIMPLES (pessoa)

// enunciado:
// Crie uma classe chamada Pessoa que possua:
// - Nome 
// - idade 

// Crie um metodo apresentar() que exiba no console o nome e a idade da pessoa.

// class Pessoa{
//     constructor(nome, idade){
//         this.nome =nome
//         this.idade = idade
//     }
//     apresentar(){
//         console.log(`Nome:${this.nome}, Idade:${this.idade}`)
//     }
// }

// const pessoa1 = new Pessoa("Ana", 17)
// pessoa1.apresentar()



// EXERCICO 2- CLASSE SIMPLES (produto)
// enunciado:
// Crie um Produto com:
// -nome
// -Preco 

// Crie um metodo mostrarPreco() que exiba o nome do produto e seu preco 

// class Produto{
//     constructor(nomeProduto, preco){
//         this.nomeProduto = nomeProduto
//     this.preco = preco
//     }
// MostrarPreco(){
//     console.log(`nomeProduto: ${this.nomeProduto}, Preco:${this.preco.toFixed(2)}`)
   
// }
// }

// const produto1= new Produto("lip combo", 30.00)
// produto1.MostrarPreco()




// EXERCICIO 3- Heranca 
// enunciado:
// Cire uma classe Funcionado com:
// - Nome

// Crie uma classe Gerente que herda de Funcionario que possui:
// -setor
// Crie um metodo que exiba o nome e o setor do gerente

// class Funcionario{
//     constructor(nome){
//         this.nome =  nome
//     }
// }

// class Gerente extends Funcionario{
//     constructor(nome,setor){
//      super(nome,setor)
//     }
// }

// exibirDados(){
// console.log(`Funcionario: ${this.nome}, Setor: ${this.setor}`)
// }

// const Funcionario1 = new Gerente("Brenda", "odontologia")
// funcionario1.exibirDados




// EXERCICIO 4- HERANÇA VEICULO
// enunciado:
// Crie uma classe Veiculo com:
// Marca 
// Crie uma classe Carro que herde de Veiculo e possui:
// modelo
// crie um metodo que exib a marca e o modelo do Carro


// class Veiculo{
//     constructor(marca){
// this.marca = marca
//     }
// }

// class Carro extends Veiculo{
//     constructor(marca,modelo){
//         this.modelo = modelo
//     }
// }

// mostrarInfo(){
//     console.log(`Marca: ${this.marca}, Modelo: ${this.modelo}´)
//     }
// const carro1 = new Carro("nivus", "2025")




// EXERCICIO 5 ENCAPSULAMENTO

// enunciado:
// Crie uma classe Conta onde:
//  o saldo seja um atributo privado
//  exista um método depositar(valor)
//  exista um método mostrarSaldo()

// class Conta{
//     #saldo
// }

// constructor(){
//     this.#saldo= 0
// }
// depositar(valor){
//     if (valor > 0){
//         this.#saldo += valor
//     }else{
//         console.log("valor incorreto")
//     }
// }
// mostrarSaldo(){
//     console.log(`Saldo atual: R$${this.#saldo.toFixed(2)}`)
// }


// const conta1 = new conta("560000")
// conta1.depositar(50);
// conta1.mostrarSaldo();
// conta1.depositar(-90)




// ecercicio 6 encapsulamento

// Crie uma classe aluno onde:
// - a nota seja um atributo privado
// -exista um metodo definirNota(nota)
// exista um metodo mostraeNota()

// class Aluno{
//     #nota
// }

// constructor(){
//     this.#nota=0
// }
// definirNota(nota){
//    if(nota > 0){np 
//     this.#nota += valor
//    }else{
//     console.log()
//    }
// }

// definirNota(){
//     console.log(`Nota: ${this.#nota}´)
// }

// const aluno1 = new Aluno()
// // nota1.definirNota(10)
// aluno1.mostrarNota()