const clientList = document.querySelector('.client-list tbody');

clientList.innerHTML = '';

fetch("https://crudcrud.com/api/57e1310af0e048c591c9ee7981e05541/clientes")
.then(resposta => resposta.json())
.then((listaDeClientes) => {
    listaDeClientes.forEach(cliente => {
        const item = document.createElement("tr");
        
        item.innerHTML = `
            <td>${cliente.cliente}</td>
            <td>${cliente.emailCliente}</td>
            <td>
                <button class="button delete" onclick="deleteCliente('${cliente._id}')">Excluir</button>
            </td>
        `;
        
        clientList.appendChild(item);
    });
});

document.getElementById("clientForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    fetch("https://crudcrud.com/api/57e1310af0e048c591c9ee7981e05541/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cliente: name, 
            emailCliente: email
        })
    })
    .then(resposta => resposta.json())
    .then((novoCliente) => {
        const item = document.createElement("tr");
        
        item.innerHTML = `
            <td>${novoCliente.cliente}</td>
            <td>${novoCliente.emailCliente}</td>
            <td>
                <button class="button delete" onclick="deleteCliente('${novoCliente._id}')">Excluir</button>
            </td>
        `;
        
        clientList.appendChild(item);
        
        // Limpa o formulário
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
    });
});

function deleteCliente(id) {
    fetch(`https://crudcrud.com/api/57e1310af0e048c591c9ee7981e05541/clientes/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        const rows = document.querySelectorAll('.client-list tbody tr');
        rows.forEach(row => {
            if (row.querySelector('.button.delete').getAttribute('onclick').includes(id)) {
                row.remove();
            }
        });
    });
}