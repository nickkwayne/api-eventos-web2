document.addEventListener("DOMContentLoaded", () => {
  // === CADASTRO DE EMPRESA ===
  const btnEmpresa = document.querySelector("#form-empresa button");
  btnEmpresa.addEventListener("click", async () => {
    const nome = document.getElementById("nome-empresa").value;
    const email = document.getElementById("email-empresa").value;
    const cnpj = document.getElementById("cnpj").value;
    const senha = document.getElementById("senha-empresa").value;

    if (!nome || !email || !cnpj || !senha) {
      alert("Preencha todos os campos da empresa.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/enterprises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          email,
          cnpj,
          pass: senha, 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao cadastrar empresa.");
      }

      alert("Cadastro de empresa realizado com sucesso!");
      console.log(data);

      localStorage.setItem("empresaCadastrada", JSON.stringify(data.enterprise));
      window.location.href = "login.html"; // redireciona após o cadastro feito
    } catch (err) {
      alert(err.message);
    }
  });

  // === CADASTRO DE USUÁRIO ===
  const btnUsuario = document.querySelector("#form-usuario button");
  btnUsuario.addEventListener("click", async () => {
    const nome = document.getElementById("nome-usuario").value;
    const email = document.getElementById("email-usuario").value;
    const gender = document.getElementById("genero-usuario").value;
    const senha = document.getElementById("senha-usuario").value;
    const cpf = document.getElementById("cpf-usuario").value;


    if (!nome || !email || !gender || !senha || !cpf ) {
      alert("Preencha todos os campos do usuário.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          email,
          gender,
          pass: senha,
          cpf: cpf
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Erro de validação:", data.errors);
        throw new Error(data.message || "Erro ao cadastrar usuário.");
      }

      alert("Cadastro de usuário realizado com sucesso!");
      console.log(data);

      localStorage.setItem("usuarioCadastrado", JSON.stringify(data.user));
      window.location.href = "login.html"; 
    } catch (err) {
      alert(err.message);
    }
  });
});
