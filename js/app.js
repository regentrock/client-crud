import { Cliente } from "./classes.js";
import { criarElementoCliente } from "./utils.js";

const clientList = document.querySelector(".client-list tbody");
const API_URL = "https://crudcrud.com/api/57e1310af0e048c591c9ee7981e05541/clientes";

function renderListaClientes(clientes) {
    clientList.innerHTML = "";
    clientes.forEach(({ cliente, emailCliente, _id }) => {
        const c = new Cliente(cliente, emailCliente, _id);
        const item = criarElementoCliente(c, deletarCliente);
        clientList.appendChild(item);
    });
}

function carregarClientes() {
    fetch(API_URL)
        .then(res => res.json())
        .then(renderListaClientes);
}

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
    .then(({ cliente, emailCliente, _id }) => {
        const novoCliente = new Cliente(cliente, emailCliente, _id);
        const item = criarElementoCliente(novoCliente, deletarCliente);
        clientList.appendChild(item);

        document.getElementById("clientForm").reset();
    });
}

function deletarCliente(id, itemRow) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => itemRow.remove());
}

document.getElementById("clientForm").addEventListener("submit", cadastrarCliente);

carregarClientes();
