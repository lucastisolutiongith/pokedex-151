🌟 Pokédex de Kanto (Geração 1: #001 ao #151)
Este projeto é uma implementação Front-end de uma Pokédex abrangente, focada na Geração 1 (Kanto, de Bulbassauro a Mew). Desenvolvido primariamente com HTML, CSS e JavaScript Vanilla, o projeto serve como um estudo de caso prático na manipulação e renderização eficiente de dados em larga escala no lado do cliente.

💡 Funcionalidade e Arquitetura do Projeto
O cerne desta aplicação reside na sua capacidade de transformar dados estáticos em uma experiência de usuário dinâmica e responsiva.

1. Consumo e Estrutura de Dados
Fonte de Dados: A aplicação consome um Array JSON estruturado que contém todos os detalhes essenciais para cada um dos 151 Pokémon (número, nome, tipo(s), e imagens/ícones).

Renderização Dinâmica: O JavaScript itera sobre este dataset e gera dinamicamente os cards de Pokémon na seção principal (.card-container), evitando o uso de hardcode e demonstrando proficiência na criação de elementos DOM via script.

2. Mecanismos de Busca e Filtro
A performance é uma prioridade, utilizando filtros e buscas que operam diretamente sobre o dataset carregado na memória, garantindo respostas quase instantâneas.

Busca: O campo de busca permite que o usuário encontre Pokémon por Nome ou número na Pokédex. A funcionalidade é case-insensitive e suporta correspondência parcial de strings.

🖥️ Como o Usuário Pode Utilizar
A Pokédex foi desenhada para ser intuitiva e rápida, facilitando a consulta de informações:

Exploração Padrão: Ao acessar a página, o usuário é apresentado à lista completa dos 151 Pokémon. A navegação visual é facilitada pelos cards que exibem o número e o tipo para identificação rápida.

Pesquisa Direta: Para encontrar um Pokémon específico, o usuário deve digitar o nome (ex: "Pikachu") ou o número (ex: "25") no campo de busca sem seguida apertar enter ou clicar em "Buscar". A tela será filtrada para mostrar apenas os resultados correspondentes.

A aplicação é totalmente responsiva, garantindo que a experiência de uso seja consistente em diferentes dispositivos e tamanhos de tela.
