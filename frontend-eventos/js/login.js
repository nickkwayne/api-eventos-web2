document.addEventListener("DOMContentLoaded", () => {
  // === LOGIN DE EMPRESA ===
  const btnEmpresa = document.querySelector("#form-empresa button");
  btnEmpresa.addEventListener("click", async () => {
    const cnpj = document.getElementById("cnpj").value;
    const senha = document.getElementById("senha-empresa").value;

    if (!cnpj || !senha) {
      alert("Preencha CNPJ e senha.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/enterprises/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cnpj, pass: senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao fazer login da empresa.");
      }

      alert("Login de empresa bem-sucedido!");
      console.log(data);

      localStorage.setItem("empresaLogada", JSON.stringify(data.empresa));
      // window.location.href = "/empresa-dashboard.html"; // redirecionar se quiser
    } catch (err) {
      alert(err.message);
    }
  });

  // === LOGIN DE USUÁRIO ===
  const btnUsuario = document.querySelector("#form-usuario button");
  btnUsuario.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha-usuario").value;

    if (!email || !senha) {
      alert("Preencha email e senha.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass: senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao fazer login do usuário.");
      }

      alert("Login de usuário bem-sucedido!");
      console.log(data);

      localStorage.setItem("usuarioLogado", JSON.stringify(data.user));
      // window.location.href = "/usuario-dashboard.html"; // redirecionar se quiser
    } catch (err) {
      alert(err.message);
    }
  });
});
