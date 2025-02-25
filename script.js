let gatos = [];
let lista = document.getElementById("lista-gatos");
let listaTitulo = document.getElementById("titulolista");


function adicionarGato() {
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
    linhaGato.innerHTML = `${gatos[i]} <button class= 'btnlista' onclick="removerGato(${i})">- Remover</button> `;
    lista.appendChild(linhaGato);
  }
}

function removerGato(index) {
  gatos.splice(index, 1);
  mostrarGatos();
}


document
  .getElementById("novoGato")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      adicionarGato();
    }
  });
