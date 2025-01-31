let precoChopp = 0;
let quantidade = 0;
let total = 0;
let precoHappyHour = 0;
let happyHourQtd = 0;
let semHappyHourQtd = 0;
let happyHourAtivo = false;

function iniciarContagem() {
    const valor = prompt("Informe o valor do Chopp:");
    if (valor && !isNaN(valor)) {
        precoChopp = parseFloat(valor);
        localStorage.setItem("precoChopp", precoChopp);
        localStorage.setItem("quantidade", 0);
        localStorage.setItem("happyHourQtd", 0);
        localStorage.setItem("semHappyHourQtd", 0);
        localStorage.setItem("happyHourAtivo", false);
        window.location.href = "contador.html";
    } else {
        alert("Por favor, informe um valor válido.");
    }
}

function carregarDados() {
    precoChopp = parseFloat(localStorage.getItem("precoChopp")) || 0;
    quantidade = parseInt(localStorage.getItem("quantidade")) || 0;
    happyHourQtd = parseInt(localStorage.getItem("happyHourQtd")) || 0;
    semHappyHourQtd = parseInt(localStorage.getItem("semHappyHourQtd")) || 0;
    happyHourAtivo = localStorage.getItem("happyHourAtivo") === "true";

    atualizarTela();
}

function alterarQuantidade(qtd) {
    if (qtd < 0 && quantidade === 0) return;

    quantidade += qtd;
    
    if (happyHourAtivo) {
        happyHourQtd += qtd;
    } else {
        semHappyHourQtd += qtd;
    }

    total = semHappyHourQtd * precoChopp + happyHourQtd * precoHappyHour;

    document.getElementById("quantidade").innerText = quantidade;
    document.getElementById("total").innerText = total.toFixed(2);
    document.getElementById("happyHourQtd").innerText = happyHourQtd;
    document.getElementById("semHappyHourQtd").innerText = semHappyHourQtd;
    document.getElementById("totalConta").innerText = total.toFixed(2);

    salvarDados();
}

function atualizarValor() {
    const novoValor = prompt("Informe o valor do Chopp no Happy Hour:");
    if (novoValor && !isNaN(novoValor)) {
        precoHappyHour = parseFloat(novoValor);
        happyHourAtivo = true;

        document.getElementById("resumo").classList.remove("hidden");
        document.getElementById("happyHourQtd").innerText = happyHourQtd;
        document.getElementById("semHappyHourQtd").innerText = semHappyHourQtd;
        document.getElementById("totalConta").innerText = total.toFixed(2);

        salvarDados();
    } else {
        alert("Por favor, informe um valor válido.");
    }
}

function salvarDados() {
    localStorage.setItem("quantidade", quantidade);
    localStorage.setItem("happyHourQtd", happyHourQtd);
    localStorage.setItem("semHappyHourQtd", semHappyHourQtd);
    localStorage.setItem("happyHourAtivo", happyHourAtivo);
}

document.addEventListener("DOMContentLoaded", carregarDados);
