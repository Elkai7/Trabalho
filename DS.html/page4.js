// ===== Menu responsivo =====
const menuBotao = document.getElementById('menuBotao');
const menuLinks = document.getElementById('menuLinks');
menuBotao.addEventListener('click', () => {
    const aberto = menuLinks.classList.toggle('aberto');
    menuBotao.setAttribute('aria-expanded', String(aberto));
    menuBotao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});
menuLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuLinks.classList.remove('aberto');
    menuBotao.setAttribute('aria-expanded', 'false');
}));

// ===== Abas Individual / Coletivo =====
const abas = [document.getElementById('aba-ind'), document.getElementById('aba-col')];
const paineis = [document.getElementById('painel-ind'), document.getElementById('painel-col')];
function abrirAba(i) {
    abas.forEach((aba, n) => {
        aba.setAttribute('aria-selected', String(n === i));
        aba.tabIndex = n === i ? 0 : -1;
        paineis[n].hidden = n !== i;
    });
}
abas.forEach((aba, i) => {
    aba.addEventListener('click', () => abrirAba(i));
    aba.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const prox = (i + 1) % abas.length;
            abrirAba(prox);
            abas[prox].focus();
        }
    });
});

// ===== Slogans =====
const sloganGrande = document.getElementById('sloganGrande');
const itens = document.querySelectorAll('.slogan-item');
itens.forEach(item => item.addEventListener('click', () => {
    itens.forEach(i => i.classList.remove('ativo'));
    item.classList.add('ativo');
    sloganGrande.textContent = item.textContent;
}));
const copiar = document.getElementById('copiarSlogan');
copiar.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(sloganGrande.textContent);
        copiar.textContent = 'Slogan copiado';
    } catch (e) {
        copiar.textContent = 'Selecione e copie o texto';
    }
    setTimeout(() => copiar.textContent = 'Copiar slogan', 2000);
});

// ===== Cartão Maré =====
const caixas = document.querySelectorAll('#checklist input');
const agua = document.getElementById('agua');
const percentual = document.getElementById('percentual');
const mensagemNivel = document.getElementById('mensagemNivel');
const beneficio = document.getElementById('beneficio');
const CHAVE = 'mare-justa-cartao';

function atualizarMare(salvar = true) {
    const marcadas = [...caixas].filter(c => c.checked).length;
    const pct = Math.round((marcadas / caixas.length) * 100);
    agua.style.height = pct + '%';
    percentual.textContent = pct + '%';

    let msg = 'Marque sua primeira ação';
    if (pct >= 100) msg = 'Maré cheia! Obrigado pelo mar';
    else if (pct >= 50) msg = 'Maré alta, continue assim';
    else if (pct > 0) msg = 'A maré começou a subir';
    mensagemNivel.textContent = msg;

    const meta = Math.ceil(caixas.length / 2);
    beneficio.textContent = marcadas >= meta
        ? 'Benefício do mês liberado. Mostre este cartão no balcão.'
        : `Faltam ${meta - marcadas} ações para o benefício do mês.`;

    if (salvar) {
        try { localStorage.setItem(CHAVE, JSON.stringify([...caixas].map(c => c.checked))); } catch (e) {}
    }
}

try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) || '[]');
    caixas.forEach((c, i) => c.checked = Boolean(salvo[i]));
} catch (e) {}
caixas.forEach(c => c.addEventListener('change', () => atualizarMare()));
document.getElementById('limparCartao').addEventListener('click', () => {
    caixas.forEach(c => c.checked = false);
    atualizarMare();
});
atualizarMare(false);

// ===== Roteiro das redes sociais =====
const semanas = [
    { titulo: 'De onde vem o peixe?', formato: 'Reels e stories',
      posts: [
        ['Reels de 30 s', 'Do barco à cozinha: mostrar o caminho do pescado e o fornecedor local.'],
        ['Stories com enquete', '"Você sabe de onde vem o peixe do seu prato?"'],
        ['Legenda', 'Lançar o slogan "Pescado com origem. Mar com futuro." e a hashtag #MaréJusta.']
      ] },
    { titulo: 'Peça só o que vai comer', formato: 'Carrossel',
      posts: [
        ['Carrossel de 5 telas', 'Quanto de comida vai para o lixo e como a porção certa evita isso.'],
        ['Stories', 'Cliente mostra o prato limpo e marca o restaurante.'],
        ['Chamada', 'Apresentar o Cartão Maré e o benefício do mês.']
      ] },
    { titulo: 'Menos plástico, mais maré', formato: 'Vídeo curto e desafio',
      posts: [
        ['Vídeo curto', 'Equipe troca descartáveis por reutilizáveis nos bastidores.'],
        ['Desafio de 7 dias', 'Clientes postam o recipiente próprio com #MaréJusta.'],
        ['Stories', 'Repostar as melhores fotos e sortear uma refeição.']
      ] },
    { titulo: 'Vem pro mutirão', formato: 'Convite e cobertura',
      posts: [
        ['Convite', 'Arte com data, local e QR code de inscrição.'],
        ['Cobertura ao vivo', 'Stories durante o mutirão com a pesagem do lixo.'],
        ['Resultado', 'Carrossel com o total recolhido e agradecimento aos voluntários.']
      ] }
];
const painel = document.getElementById('semanaPainel');
const botoesSemana = document.querySelectorAll('.semana-botao');
function mostrarSemana(n) {
    const s = semanas[n];
    painel.innerHTML = `
        <div>
            <span class="formato">${s.formato}</span>
            <h3>${s.titulo}</h3>
        </div>
        <ul class="posts">
            ${s.posts.map(p => `<li><b>${p[0]}</b>${p[1]}</li>`).join('')}
        </ul>`;
    botoesSemana.forEach((b, i) => b.setAttribute('aria-selected', String(i === n)));
}
botoesSemana.forEach((b, i) => b.addEventListener('click', () => mostrarSemana(i)));
mostrarSemana(0);