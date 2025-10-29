document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const cpfInput = document.getElementById("cpf");
  const telefoneInput = document.getElementById("telefone");
  const cepInput = document.getElementById("cep");

  // Máscaras automáticas
  function mascaraCPF(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }

  function mascaraTelefone(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1")
      .slice(0, 15);
  }

  function mascaraCEP(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1")
      .slice(0, 9);
  }

  // Aplicar máscaras enquanto digita
  if (cpfInput) cpfInput.addEventListener("input", () => cpfInput.value = mascaraCPF(cpfInput.value));
  if (telefoneInput) telefoneInput.addEventListener("input", () => telefoneInput.value = mascaraTelefone(telefoneInput.value));
  if (cepInput) cepInput.addEventListener("input", () => cepInput.value = mascaraCEP(cepInput.value));

  // Validação do formulário
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const cpf = cpfInput.value.trim();
      const telefone = telefoneInput.value.trim();
      const nascimento = document.getElementById("nascimento").value.trim();
      const cep = cepInput.value.trim();
      const cidade = document.getElementById("cidade").value.trim();
      const estado = document.getElementById("estado").value.trim();

      if (!nome || !email || !cpf || !telefone || !nascimento || !cep || !cidade || !estado) {
        alert("⚠️ Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!cpfRegex.test(cpf)) {
        alert("❌ CPF inválido! Use o formato 000.000.000-00");
        return;
      }

      const telRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
      if (!telRegex.test(telefone)) {
        alert("❌ Telefone inválido! Use o formato (00) 00000-0000");
        return;
      }

      const cepRegex = /^\d{5}-\d{3}$/;
      if (!cepRegex.test(cep)) {
        alert("❌ CEP inválido! Use o formato 00000-000");
        return;
      }

      // Validação de idade mínima (18 anos)
      const nasc = new Date(nascimento);
      const hoje = new Date();
      let idade = hoje.getFullYear() - nasc.getFullYear();
      const m = hoje.getMonth() - nasc.getMonth();
      if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

      if (idade < 18) {
        alert("🚫 É necessário ter pelo menos 18 anos para se cadastrar.");
        return;
      }

      alert("✅ Cadastro enviado com sucesso!");
      form.reset();
    });
  }
});

// 🌙 Controle do modo escuro e alto contraste
document.addEventListener("DOMContentLoaded", () => {
  const modoEscuroBtn = document.getElementById("modoEscuro");
  const altoContrasteBtn = document.getElementById("altoContraste");

  function atualizarBotoes() {
    modoEscuroBtn.classList.toggle("active", document.body.classList.contains("dark-mode"));
    altoContrasteBtn.classList.toggle("active", document.body.classList.contains("high-contrast"));
  }

  modoEscuroBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.remove("high-contrast");
    atualizarBotoes();
  });

  altoContrasteBtn.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
    document.body.classList.remove("dark-mode");
    atualizarBotoes();
  });

  atualizarBotoes();
});
