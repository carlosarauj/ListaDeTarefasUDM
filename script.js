let inputTarefa = document.querySelector('.inputTarefa')
let btnAddTarefa = document.querySelector('.btnAddTarefa')
let tarefas = document.querySelector('.tarefas')


function criaLi(){
    let li = document.createElement('li')
    return li
}

inputTarefa.addEventListener('keypress', function(e){
    if (e.key == 'Enter'){
    if (!inputTarefa.value)
    return
    criaTarefa(inputTarefa.value)
    }
})

function limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criaBotaoApagar(li){
    li.innerText += ''
    let botaoApagar = document.createElement('button')

    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    botaoApagar.setAttribute('title', 'Apagar tarefa')
    li.appendChild(botaoApagar)
}

function criaTarefa(textoInput){
    let li = criaLi()
    li.innerText = textoInput

    tarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas()
}

btnAddTarefa.addEventListener('click', function(){
    if (!inputTarefa.value)
    return
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function(e){
    let el = e.target

    if (el.classList.contains('apagar')){
    el.parentElement.remove()
    salvarTarefas( )
    }
})

function salvarTarefas(){
     let liTarefas = tarefas.querySelectorAll('li')
     let listaDeTarefas = []

     for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
     }

     let tarefasJSON = JSON.stringify(listaDeTarefas)
     localStorage.setItem('tarefas', tarefasJSON)
}

function addTarefasSalvas(){
    let tarefas = localStorage.getItem('tarefas')
    let listaDeTarefas = JSON.parse(tarefas)
    
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
    
}

addTarefasSalvas()