let gatos = [];
let lista = document.getElementById("lista-gatos");
let listaTitulo = document.getElementById("titulolista");
let apagaTodos = document.getElementById("apaga-todos");

function adicionarGato() {
  apagaTodos.classList.remove("invisivel")
  listaTitulo.classList.remove("invisivel")
  let novoGato = document.getElementById("novoGato").value;
  if (novoGato.trim() !== "") {
    gatos.push(novoGato);
    mostrarGatos();
    document.getElementById("novoGato").value = "";
  }
}

function mostrarGatos() {
  lista.innerHTML = "";
  for (i = 0; i < gatos.length; i++) {
    let linhaGato = document.createElement("p");
    linhaGato.innerHTML = `
     <img src="icone.png" alt="">
     <span class="nome" id="gato-${i}">${gatos[i]}</span> 
     <button class= 'btnlista editar' onclick="editarGato(${i})" id="editBtn-${i}">Editar
     </button>
     <button class= 'btnlista excluir' onclick="removerGato(${i})">
     <img src="lixo.png" alt="">
     </button> `;
    lista.appendChild(linhaGato);
  }
}

function removerGato(index) {
  if (confirm(`Deseja apagar ${gatos[index]}?`)) {
    gatos.splice(index, 1);
    mostrarGatos(); 
    if (gatos.length === 0) {
      listaTitulo.classList.add("invisivel");
      apagaTodos.classList.add("invisivel");
    }
  }
}

function editarGato(index) {
  let spanGato = document.getElementById(`gato-${index}`);
  let input = document.createElement("input");
  let btnEdit = document.getElementById(`editBtn-${index}`);
  btnEdit.classList.add("invisivel")
  input.type = "text";
  input.setAttribute("id", "alteraGato");
  input.autocomplete = "off";
  input.value = gatos[index];
  spanGato.replaceWith(input);
  let botaoSalvar = document.createElement("button");
  botaoSalvar.textContent = "Alterar";
  botaoSalvar.classList.add("confirmar");
  botaoSalvar.onclick = function () {
    if(confirm("Deseja alterar o nome do gato?")){
      gatos[index] = input.value;
      mostrarGatos();
    }
  }
  input.insertAdjacentElement("afterend", botaoSalvar);
}

function apagarTodos() {
  if(confirm("Isso vai excluir toda a lista, tem certeza?")){
    gatos.length = 0;
    mostrarGatos();
    listaTitulo.classList.add("invisivel");
    apagaTodos.classList.add("invisivel");
  }
}

document
  .getElementById("novoGato")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      adicionarGato();
    }
  });
