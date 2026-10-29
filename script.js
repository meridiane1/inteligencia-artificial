const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Menu para dispositivos móveis
menuToggle.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");

    menuToggle.setAttribute("aria-expanded", String(aberto));
    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
    menuToggle.textContent = aberto ? "✕" : "☰";
});

// Fecha o menu ao selecionar uma seção
menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// Quiz interativo
const alternativas = document.querySelectorAll(".alternativa");
const resultado = document.getElementById("resultado");
const tentarNovamente = document.getElementById("tentar-novamente");

alternativas.forEach((alternativa) => {
    alternativa.addEventListener("click", () => {
        // Impede que o usuário responda várias vezes
        alternativas.forEach((botao) => {
            botao.disabled = true;
        });

        const correta = alternativa.dataset.correta === "true";

        if (correta) {
            alternativa.classList.add("correta");
            resultado.textContent =
                "Muito bem! Usar a IA com responsabilidade envolve " +
                "conferir as informações, compreender o conteúdo e " +
                "desenvolver suas próprias ideias.";
        } else {
            alternativa.classList.add("incorreta");

            // Mostra a alternativa correta
            alternativas.forEach((botao) => {
                if (botao.dataset.correta === "true") {
                    botao.classList.add("correta");
                }
            });

            resultado.textContent =
                "Vamos refletir! A IA pode ajudar nos estudos, mas é " +
                "importante verificar as informações e aprender com o processo.";
        }

        tentarNovamente.hidden = false;
    });
});

// Reinicia o quiz
tentarNovamente.addEventListener("click", () => {
    alternativas.forEach((alternativa) => {
        alternativa.disabled = false;
        alternativa.classList.remove("correta", "incorreta");
    });

    resultado.textContent = "";
    tentarNovamente.hidden = true;
});