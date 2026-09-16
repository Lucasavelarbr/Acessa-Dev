document.addEventListener("DOMContentLoaded", function () {

    const inputFontSize = document.getElementById("font-size");
    const inputLineHeight = document.getElementById("line-height");
    const botaoTestar = document.querySelector(".btn-testar");

    const resultadoNumero = document.querySelector(".result-number strong");
    const resultadoStatus = document.querySelector(".result-status");
    const resultadoDescricao = document.querySelector(".result-description");

    const previewCabecalho = document.querySelector(".preview-header span");
    const previewParagrafos = document.querySelectorAll(".preview-content p");


    // =========================================
    // TESTAR TAMANHO DA FONTE
    // =========================================

    function testarTamanho() {

        let tamanhoFonte = inputFontSize.value.replace(",", ".");
        let alturaLinha = inputLineHeight.value.replace(",", ".");

        tamanhoFonte = parseFloat(tamanhoFonte);
        alturaLinha = parseFloat(alturaLinha);


        // =========================================
        // VALIDAÇÃO
        // =========================================

        if (isNaN(tamanhoFonte)) {
            inputFontSize.focus();
            return;
        }

        if (isNaN(alturaLinha)) {
            inputLineHeight.focus();
            return;
        }


        // =========================================
        // LIMITES
        // =========================================

        if (tamanhoFonte < 8) {
            tamanhoFonte = 8;
        }

        if (tamanhoFonte > 100) {
            tamanhoFonte = 100;
        }

        if (alturaLinha < 1) {
            alturaLinha = 1;
        }

        if (alturaLinha > 3) {
            alturaLinha = 3;
        }


        // =========================================
        // ATUALIZA OS CAMPOS
        // =========================================

        inputFontSize.value = tamanhoFonte;
        inputLineHeight.value = alturaLinha;


        // =========================================
        // ATUALIZA RESULTADO
        // =========================================

        resultadoNumero.textContent = tamanhoFonte;


        // =========================================
        // ATUALIZA CABEÇALHO DA PRÉVIA
        // =========================================

        previewCabecalho.textContent = tamanhoFonte + "px";


        // =========================================
        // ATUALIZA OS PARÁGRAFOS DA PRÉVIA
        // =========================================

        previewParagrafos.forEach(function (paragrafo) {

            paragrafo.style.fontSize = tamanhoFonte + "px";
            paragrafo.style.lineHeight = alturaLinha;

        });


        // =========================================
        // ANALISA O TAMANHO
        // =========================================

        if (tamanhoFonte < 14) {

            resultadoStatus.textContent = "Atenção";

            resultadoStatus.className =
                "result-status status-danger";

            resultadoDescricao.textContent =
                "O tamanho informado é pequeno e pode dificultar a leitura, especialmente para pessoas com baixa visão.";

        }

        else if (tamanhoFonte < 16) {

            resultadoStatus.textContent = "Atenção";

            resultadoStatus.className =
                "result-status status-danger";

            resultadoDescricao.textContent =
                "O tamanho informado está abaixo de 16px. Avalie se o texto continua confortável de ler em diferentes dispositivos e condições visuais.";

        }

        else {

            resultadoStatus.textContent = "Adequado";

            resultadoStatus.className =
                "result-status status-success";

            resultadoDescricao.textContent =
                "O tamanho informado oferece uma boa base para textos corridos. Ainda assim, avalie também contraste, espaçamento e possibilidade de ampliação.";

        }

    }


    // =========================================
    // BOTÃO TESTAR
    // =========================================

    botaoTestar.addEventListener("click", testarTamanho);


    // =========================================
    // ENTER NOS CAMPOS
    // =========================================

    inputFontSize.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            testarTamanho();
        }

    });


    inputLineHeight.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            testarTamanho();
        }

    });

});