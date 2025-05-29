// Este script deve ser carregado no final do <body>, idealmente com o atributo 'defer'.
// Exemplo: <script src="seu-script-de-acessibilidade.js" defer></script>

document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores de Elementos ---
    const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');
    const aumentarFonteBotao = document.getElementById('aumentar-fonte');
    const diminuirFonteBotao = document.getElementById('diminuir-fonte');
    const alternaContrasteBotao = document.getElementById('alterna-contraste');

    // --- Variáveis de Estado ---
    let tamanhoAtualDaFonte = parseFloat(getComputedStyle(document.body).fontSize); // Pega o tamanho da fonte atual do body em px
    const tamanhoMinimoFonte = 12; // Define um tamanho mínimo da fonte (em pixels)
    const tamanhoMaximoFonte = 28; // Define um tamanho máximo da fonte (em pixels)
    const incrementoFonte = 2; // Quanto a fonte aumentará/diminuirá por clique (em pixels)

    // --- Funcionalidade 1: Alternar Menu de Acessibilidade (Mostrar/Ocultar) ---
    if (botaoDeAcessibilidade && opcoesAcessibilidade) {
        // Inicializa o estado ARIA, caso não esteja definido no HTML
        if (botaoDeAcessibilidade.getAttribute('aria-expanded') === null) {
            botaoDeAcessibilidade.setAttribute('aria-expanded', 'false');
        }

        // Adiciona um listener para o clique no botão principal de acessibilidade
        botaoDeAcessibilidade.addEventListener('click', () => {
            const estaExpandido = botaoDeAcessibilidade.getAttribute('aria-expanded') === 'true';

            // Alterna o atributo aria-expanded para leitores de tela
            botaoDeAcessibilidade.setAttribute('aria-expanded', !estaExpandido);

            // Alterna a classe 'apresenta-lista' para controlar a visibilidade via CSS
            // Se 'apresenta-lista' esconde, removê-la mostra, e adicioná-la esconde.
            // Se a intenção for 'mostrar' quando a classe está presente, mude a lógica do CSS.
            // Aqui, assumimos que 'apresenta-lista' no CSS significa `display: none;`
            opcoesAcessibilidade.classList.toggle('apresenta-lista');
        });

        // Opcional: Fechar o menu de acessibilidade se clicar fora dele
        document.addEventListener('click', (event) => {
            if (!botaoDeAcessibilidade.contains(event.target) && !opcoesAcessibilidade.contains(event.target)) {
                if (opcoesAcessibilidade.classList.contains('apresenta-lista') === false) { // Se estiver visível
                    botaoDeAcessibilidade.setAttribute('aria-expanded', 'false');
                    opcoesAcessibilidade.classList.add('apresenta-lista');
                }
            }
        });
    }

    // --- Funcionalidade 2: Aumentar/Diminuir Tamanho da Fonte ---
    if (aumentarFonteBotao && diminuirFonteBotao) {
        aumentarFonteBotao.addEventListener('click', () => {
            if (tamanhoAtualDaFonte < tamanhoMaximoFonte) {
                tamanhoAtualDaFonte += incrementoFonte;
                document.body.style.fontSize = `${tamanhoAtualDaFonte}px`;
            }
        });

        diminuirFonteBotao.addEventListener('click', () => {
            if (tamanhoAtualDaFonte > tamanhoMinimoFonte) {
                tamanhoAtualDaFonte -= incrementoFonte;
                document.body.style.fontSize = `${tamanhoAtualDaFonte}px`;
            }
        });
    }

    // --- Funcionalidade 3: Alternar Alto Contraste ---
    if (alternaContrasteBotao) {
        alternaContrasteBotao.addEventListener('click', () => {
            document.body.classList.toggle('alto-contraste');

            // Salvar a preferência do usuário (opcional, mas recomendado)
            if (document.body.classList.contains('alto-contraste')) {
                localStorage.setItem('contrasteAtivo', 'true');
            } else {
                localStorage.removeItem('contrasteAtivo'); // Ou localStorage.setItem('contrasteAtivo', 'false');
            }
        });

        // Verificar e aplicar o alto contraste ao carregar a página (se salvo)
        const contrasteSalvo = localStorage.getItem('contrasteAtivo');
        if (contrasteSalvo === 'true') {
            document.body.classList.add('alto-contraste');
        }
    }
});
