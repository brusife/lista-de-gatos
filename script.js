let gatos = [];
let lista = document.getElementById("lista-gatos");
let listaTitulo = document.getElementById("titulolista");
let apagaTodos = document.getElementById("apaga-todos");

mostrarGatos();

async function adicionarGato() {
  let novoGato = document.getElementById("novoGato").value;
  if (novoGato.trim() !== "") {
    const response = await fetch("http://localhost:3000/adicionar-gato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: novoGato }),
    });
    const gatoAdicionado = await response.json();
    gatos.push(gatoAdicionado);
    mostrarGatos();
    document.getElementById("novoGato").value = "";
  }
}

async function mostrarGatos() {
  try {
    const response = await fetch("http://localhost:3000/listar-gatos");
    if (!response.ok) {
      throw new Error("Erro ao carregar a lista de gatos");
    }
    const gatos = await response.json();
    lista.innerHTML = "";
    gatos.forEach((gato) => {
      const linhaGato = document.createElement("p");
      linhaGato.innerHTML = `
      <img src="icone.png" alt="">
                <span class="nome" id="gato-${gato.id}">${gato.nome}</span>
                <button class='btnlista editar' onclick="editarGato(${gato.id})">Editar</button>
                <button class='btnlista excluir' onclick="removerGato(${gato.id})">
                    <img src="lixo.png" alt="">
                </button>`;
      lista.appendChild(linhaGato);
    });
  } catch (error) {
    console.error(error);
  }
}

async function removerGato(id) {
  if (confirm(`Deseja apagar ?`)) {
    const response = await fetch(`http://localhost:3000/excluir-gato/${id}`, {
      method: "DELETE",
    });
    const index = gatos.findIndex(gato => gato.id === id)
    gatos.splice(index, 1);
    mostrarGatos();
  }
}

function editarGato(index) {
  let spanGato = document.getElementById(`gato-${index}`);
  let input = document.createElement("input");
  let btnEdit = document.getElementById(`editBtn-${index}`);
  btnEdit.classList.add("invisivel");
  input.type = "text";
  input.setAttribute("id", "alteraGato");
  input.autocomplete = "off";
  input.value = gatos[index];
  spanGato.replaceWith(input);
  let botaoSalvar = document.createElement("button");
  botaoSalvar.textContent = "Alterar";
  botaoSalvar.classList.add("confirmar");
  botaoSalvar.onclick = function () {
    if (confirm("Deseja alterar o nome do gato?")) {
      gatos[index] = input.value;
      mostrarGatos();
    }
  };
  input.insertAdjacentElement("afterend", botaoSalvar);
}

document
  .getElementById("novoGato")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      adicionarGato();
    }
  });
