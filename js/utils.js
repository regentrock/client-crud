export function criarElementoCliente(cliente, onDelete) {
    const item = document.createElement("tr");
    item.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td><button class="button delete">Excluir</button></td>
    `;
    item.querySelector("button").addEventListener("click", () => onDelete(cliente.id, item));
    return item;
}
