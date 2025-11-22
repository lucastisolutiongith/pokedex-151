// Seleciona os elementos do DOM
let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let botaoBusca = document.getElementById("botao-busca");
let dados = []; // Armazena todos os dados do JSON
let tiposUnicos = []; // NOVO: Para armazenar todos os tipos únicos

// Mapeamento de Tipos de Inglês para Português (para classes CSS)
const mapeamentoTipos = {
    'planta': 'planta',
    'fogo': 'fogo',
    'água': 'água',
    'inseto': 'inseto',
    'normal': 'normal',
    'elétrico': 'elétrico',
    'terrestre': 'terrestre',
    'venenoso': 'venenoso',
    'fada': 'fada',
    'lutador': 'lutador',
    'psíquico': 'psíquico',
    'pedra': 'pedra',
    'gelo': 'gelo',
    'fantasma': 'fantasma',
    'dragão': 'dragão',
    'steel': 'aco',
    'voador': 'voador'
};

// --- Funções de Inicialização e Busca ---

// Seleciona o container da barra de filtro
const filtroContainer = document.querySelector(".type-filter-bar");

/**
 * Função principal para carregar os dados e iniciar a busca/renderização.
 */
async function iniciarBusca() {
    // 1. Carrega os dados se ainda não foram carregados
    if (dados.length === 0) {
        try {
            // Assumindo que o arquivo JSON com os 150 Pokémons foi salvo como 'data.json'
            let resposta = await fetch("data.json");
            dados = await resposta.json();
            
            // Renderiza todos os Pokémons na primeira carga
            renderizarCards(dados);
            
        } catch (error) {
            console.error("Falha ao buscar dados do JSON:", error);
            // Renderiza um card de erro para o usuário
            cardContainer.innerHTML = '<article class="card erro"><h2>Erro!</h2><p>Não foi possível carregar os dados da Pokédex.</p></article>';
            return; 
        }
    }

    // 2. Filtra os dados com base no termo de busca
    const termoBusca = campoBusca.value.toLowerCase().trim();

    // Se o termo estiver vazio, exibe todos
    if (termoBusca === "") {
        renderizarCards(dados);
        return;
    }
    
    // Filtra por nome, número, tipo e tags
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.numero_pokedex.includes(termoBusca) || // Permite buscar por número (ex: "001")
        dado.descricao.toLowerCase().includes(termoBusca) || 
        dado.tipo.toLowerCase().includes(termoBusca) || // Permite buscar por tipo (ex: "fire")
        dado.tags.some(tag => tag.toLowerCase().includes(termoBusca)) // Permite buscar por tags (ex: "Lendário")
    );

    // 3. Renderiza os resultados
    renderizarCards(dadosFiltrados);
}

/**
 * Cria e insere os cards de Pokémon no container.
 * @param {Array<Object>} pokemons - Array de objetos Pokémon filtrados.
 */
function renderizarCards(pokemons) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes

    if (pokemons.length === 0) {
        cardContainer.innerHTML = '<article class="card sem-resultado"><h2>Nenhum Pokémon encontrado.</h2><p>Tente buscar por nome, número, tipo ou característica.</p></article>';
        return;
    }

    for (let dado of pokemons) {
        // --- LÓGICA DE IMAGEM ---
        // Constrói a URL da imagem usando o novo formato com "full"
        // Ex: "001" -> https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png
        const imageUrl = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${dado.numero_pokedex}.png`;

        // --- LÓGICA DE TIPO PARA COR (MANTENDO O PT-BR) ---
        const tipoBaseIngles = dado.tipo.split(" / ")[0].toLowerCase();
        const tipoBasePortugues = mapeamentoTipos[tipoBaseIngles] || 'desconhecido';
        
        // Formata as tags para exibição
        const tagsHtml = dado.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ");
        
        let article = document.createElement("article");
        // Adiciona classes para estilização e cor de fundo
        article.classList.add("card", `type-${tipoBasePortugues}`); 
        
        article.innerHTML = `
            <div class="pokemon-image-wrapper">
                <img src="${imageUrl}" alt="Imagem do Pokémon ${dado.nome}" class="pokemon-image">
            </div>

            <h2 class="pokemon-name">${dado.nome}</h2>
            
            <h3 class="pokemon-number">Número: #${dado.numero_pokedex}</h3>
            
            <p class="info-caracteristica">
                <strong>Tipo:</strong> ${dado.tipo}
            </p>
            
            <p class="pokemon-description">
                ${dado.descricao}
            </p>
            
            <div class="pokemon-tags">
                ${tagsHtml}
            </div>

            <a href="${dado.link}" target="_blank">Ver na Pokédex oficial</a>
        `;
        
        cardContainer.appendChild(article);
    }
}

// --- Event Listeners ---

campoBusca.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') { 
        iniciarBusca();
    }
});

document.addEventListener('DOMContentLoaded', iniciarBusca);
