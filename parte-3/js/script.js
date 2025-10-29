document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  const campos = {
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    cpf: document.getElementById("cpf"),
    telefone: document.getElementById("telefone"),
    nascimento: document.getElementById("nascimento"),
    cep: document.getElementById("cep"),
    cidade: document.getElementById("cidade"),
    estado: document.getElementById("estado"),
  };

  // Cria elemento de erro abaixo de cada campo
  function criarErro(input) {
    let erro = input.nextElementSibling;
    if (!erro || !erro.classList.contains("erro-msg")) {
      erro = document.createElement("small");
      erro.classList.add("erro-msg");
      erro.style.color = "red";
      erro.style.display = "none";
      input.parentNode.insertBefore(erro, input.nextSibling);
    }
    return erro;
  }

  // Atualiza texto do erro
  function mostrarErro(input, mensagem) {
    const erro = criarErro(input);
    erro.textContent = mensagem;
    erro.style.display = "block";
  }

  // Oculta o erro
  function limparErro(input) {
    const erro = input.nextElementSibling;
    if (erro && erro.classList.contains("erro-msg")) {
      erro.style.display = "none";
    }
  }

  // ======== MÁSCARAS ========
  function mascaraCPF(valor) {
    return valor
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function mascaraTelefone(valor) {
    return valor
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }

  function mascaraCEP(valor) {
    return valor
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/^(\d{5})(\d)/, "$1-$2");
  }

  campos.cpf.addEventListener("input", () => {
    campos.cpf.value = mascaraCPF(campos.cpf.value);
    limparErro(campos.cpf);
  });

  campos.telefone.addEventListener("input", () => {
    campos.telefone.value = mascaraTelefone(campos.telefone.value);
    limparErro(campos.telefone);
  });

  campos.cep.addEventListener("input", () => {
    campos.cep.value = mascaraCEP(campos.cep.value);
    limparErro(campos.cep);
  });

  // ======== DATA DE NASCIMENTO ========
  campos.nascimento.addEventListener("input", () => {
    let valor = campos.nascimento.value.replace(/[^\d-]/g, "").slice(0, 10);
    campos.nascimento.value = valor;
    const partes = valor.split("-");
    if (partes.length >= 1 && partes[0].length > 4) {
      partes[0] = partes[0].slice(0, 4);
      campos.nascimento.value = partes.join("-");
    }
    limparErro(campos.nascimento);
  });

  // ======== VALIDAÇÃO FINAL ========
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let valido = true;

    // Limpa mensagens antigas
    Object.values(campos).forEach((campo) => limparErro(campo));

    // Validações individuais
    if (!campos.nome.value.trim()) {
      mostrarErro(campos.nome, "Preencha seu nome completo.");
      valido = false;
    }

    if (!campos.email.value.includes("@")) {
      mostrarErro(campos.email, "Informe um e-mail válido.");
      valido = false;
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(campos.cpf.value)) {
      mostrarErro(campos.cpf, "CPF inválido. Use o formato 000.000.000-00.");
      valido = false;
    }

    const telRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    if (!telRegex.test(campos.telefone.value)) {
      mostrarErro(campos.telefone, "Telefone inválido. Use o formato (00) 00000-0000.");
      valido = false;
    }

    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(campos.cep.value)) {
      mostrarErro(campos.cep, "CEP inválido. Use o formato 00000-000.");
      valido = false;
    }

    if (!campos.cidade.value.trim()) {
      mostrarErro(campos.cidade, "Informe a cidade.");
      valido = false;
    }

    if (!campos.estado.value.trim()) {
      mostrarErro(campos.estado, "Selecione o estado.");
      valido = false;
    }

    const nasc = campos.nascimento.value.trim();
    if (!nasc) {
      mostrarErro(campos.nascimento, "Informe sua data de nascimento.");
      valido = false;
    } else {
      const partes = nasc.split("-");
      const ano = parseInt(partes[0], 10);
      const anoAtual = new Date().getFullYear();

      if (isNaN(ano) || ano < 1900 || ano > anoAtual) {
        mostrarErro(campos.nascimento, `Ano inválido (entre 1900 e ${anoAtual}).`);
        valido = false;
      } else {
        const dataNasc = new Date(nasc);
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const m = hoje.getMonth() - dataNasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) idade--;

        if (idade < 18) {
          mostrarErro(campos.nascimento, "Você precisa ter pelo menos 18 anos.");
          valido = false;
        }
      }
    }

    if (valido) {
      alert("✅ Cadastro enviado com sucesso!");
      form.reset();
    }
  });
});


