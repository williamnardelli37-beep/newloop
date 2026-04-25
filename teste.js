function verificarDominio() {
    const input = document.getElementById('domain-input').value.trim();
    const tld = document.getElementById('tld-select').value;
    const resultDiv = document.getElementById('domain-result');
    const statusCard = document.getElementById('status-card');
    const statusText = document.getElementById('status-text');
    const btnReservar = document.getElementById('btn-reservar');

    if (input === "") {
        alert("Por favor, digite um nome de domínio.");
        return;
    }

    // Limpa caracteres especiais e espaços
    const cleanDomain = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    const fullDomain = cleanDomain + tld;

    // Mostra o carregamento
    resultDiv.style.display = "block";
    statusText.innerText = "Consultando disponibilidade...";
    statusCard.style.background = "#f5f5f7";
    btnReservar.style.display = "none";

    // Simulação de busca (em um sistema real, você usaria fetch() para uma API)
    setTimeout(() => {
        const disponivel = Math.random() > 0.3; // 70% de chance de estar livre

        if (disponivel) {
            statusText.innerHTML = `✅ O domínio <strong>${fullDomain}</strong> está disponível!`;
            statusCard.style.background = "#eafff0";
            statusCard.style.border = "1px solid #25d366";
            btnReservar.style.display = "inline-block";
        } else {
            statusText.innerHTML = `❌ Desculpe, <strong>${fullDomain}</strong> já está em uso.`;
            statusCard.style.background = "#fff0f0";
            statusCard.style.border = "1px solid #ff4b4b";
            btnReservar.style.display = "none";
        }
    }, 1200);
}

function reservarDominio() {
    const input = document.getElementById('domain-input').value;
    const tld = document.getElementById('tld-select').value;
    const msg = `Olá! Verifiquei a disponibilidade do domínio ${input}${tld} no site e gostaria de seguir com o projeto.`;
    
    // Abre o WhatsApp com a mensagem pronta
    window.open(`https://wa.me/5554993243670?text=${encodeURIComponent(msg)}`, '_blank');
}
// // ============================================================
//    LOOP WEB JAVA SCRIPT 2025-2026 SERVICE
//    FRAMEWORK: LOOP 26 - AESTHETIC EDITION (OFFICIAL)
//    DESCRIÇÃO: Design focado em Hiper-Minimalismo e Glassmorphism.
//    ============================================================ 