import { Cliente } from "./classes.js";
import { criarElementoCliente } from "./utils.js";

const clientList = document.querySelector(".client-list tbody");
const API_URL = "https://crudcrud.com/api/ebe2c793a2a9496cb7f02b5bcd81af94/clientes";

// Renderiza a lista de clientes recebida da API
function renderListaClientes(clientes) {
    clientList.innerHTML = "";
    clientes.forEach((data) => {
        const c = new Cliente(data.cliente, data.emailCliente, data._id);
        const item = criarElementoCliente(c, deletarCliente);
        clientList.appendChild(item);
    });
}

// Busca clientes da API ao carregar a página
function carregarClientes() {
    fetch(API_URL)
        .then(res => res.json())
        .then(renderListaClientes)
        .catch(error => console.error("Erro ao carregar clientes:", error));
}

// Envia novo cliente para a API
function cadastrarCliente(event) {
    event.preventDefault();
    const nome = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !email) return;

    const cliente = new Cliente(nome, email);

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente: cliente.nome, emailCliente: cliente.email })
    })
    .then(res => res.json())
    .then((data) => {
        const novoCliente = new Cliente(data.cliente, data.emailCliente, data._id);
        const item = criarElementoCliente(novoCliente, deletarCliente);
        clientList.appendChild(item);
        document.getElementById("clientForm").reset();
    })
    .catch(error => console.error("Erro ao cadastrar cliente:", error));
}

// Deleta cliente da API e da tabela
function deletarCliente(id, itemRow) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => itemRow.remove())
        .catch(error => console.error("Erro ao deletar cliente:", error));
}

document.getElementById("clientForm").addEventListener("submit", cadastrarCliente);
carregarClientes();
