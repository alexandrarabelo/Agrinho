const alternaContraste = document.getElementById('alterna-contraste')

alternaContraste.addEventListener('click', function(){
         document.body.classList.toggle('alto-contraste')
 })

const botaoSelecionado = botaoDeAcessibilidade.getAttribute('aria-expanded') === 'true';
botaoDeAcessibilidade.setAttribute('aria-expanded', !botaoSelecionado)
