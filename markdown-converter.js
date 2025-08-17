document.addEventListener('DOMContentLoaded', function() {
    const articleList = document.getElementById('articles-list');
    const articleContent = document.getElementById('article-content');

    // Lista dos seus artigos. Adicione um novo objeto para cada artigo.
    const articles = [
        {
            title: 'Como Funciona o Câmbio Pessoal',
            filename: 'como-funciona-o-cambio.md'
        },
        {
            title: 'Remessas Internacionais sem Segredos',
            filename: 'remessas-internacionais-sem-segredos.md'
        }
    ];

    // Função para carregar e exibir um artigo
    function loadArticle(filename) {
        fetch(`artigos/${filename}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Artigo não encontrado.');
                }
                return response.text();
            })
            .then(markdownText => {
                // Converte Markdown para HTML
                const htmlContent = marked.parse(markdownText);
                articleContent.innerHTML = htmlContent;
                articleContent.style.display = 'block';
                articleList.style.display = 'none';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Erro ao carregar o artigo:', error);
                articleContent.innerHTML = `<p>Ocorreu um erro ao carregar o artigo. Por favor, tente novamente mais tarde.</p>`;
                articleContent.style.display = 'block';
                articleList.style.display = 'none';
            });
    }

    // Cria a lista de artigos dinamicamente
    function createArticlesList() {
        articles.forEach(article => {
            const link = document.createElement('a');
            link.href = `#${article.filename.replace('.md', '')}`;
            link.textContent = article.title;
            link.onclick = (e) => {
                e.preventDefault();
                loadArticle(article.filename);
            };
            articleList.appendChild(link);
        });
    }

    // Verifica se a URL tem um hash para carregar um artigo específico
    function checkUrlHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const articleToLoad = articles.find(a => a.filename.replace('.md', '') === hash);
            if (articleToLoad) {
                loadArticle(articleToLoad.filename);
            }
        } else {
            createArticlesList();
        }
    }

    checkUrlHash();
});
