
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/groups/list")
    .then((res) => res.json())
    .then((data) => {
      const lista = document.getElementById("lista-groups");
      data.forEach((grupo) => {
        const li = document.createElement("li");
        li.textContent = grupo.name + " - " + grupo.description;
        lista.appendChild(li);
      });
    })
    .catch((err) => console.error("Erro ao buscar grupos:", err));
});