document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('site-search');
    const resultsContainer = document.getElementById('search-results');

    // Dados simulados para busca (podem ser links reais)
    const database = [
        { title: 'Inovação Digital', link: 'inovacao.html' },
        { title: 'Nossos Produtos', link: 'produtos.html' },
        { title: 'Software Loop', link: 'software.html' },
        { title: 'Privacidade e Segurança', link: 'privacidade.html' },
        { title: 'Instagram Reels', link: 'https://instagram.com/...' }
    ];

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        resultsContainer.innerHTML = '';

        if (value.length > 0) {
            const filtered = database.filter(item => 
                item.title.toLowerCase().includes(value)
            );

            if (filtered.length > 0) {
                resultsContainer.style.display = 'block';
                filtered.forEach(item => {
                    const a = document.createElement('a');
                    a.href = item.link;
                    a.textContent = item.title;
                    resultsContainer.appendChild(a);
                });
            } else {
                resultsContainer.style.display = 'none';
            }
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    // Fecha resultados ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            resultsContainer.style.display = 'none';
        }
    });
});
function update() {
            const name = document.getElementById('site-name').value || "Nome da Empresa";
            const title = document.getElementById('hero-title-in').value || "Título do Site";
            const desc = document.getElementById('hero-desc-in').value || "Sua frase de impacto aparecerá aqui.";
            const accent = document.getElementById('accent-color').value;

            document.getElementById('display-name').innerText = name;
            document.getElementById('display-title').innerText = title;
            document.getElementById('display-desc').innerText = desc;
            document.getElementById('display-btn').style.backgroundColor = accent;
        }

        function previewImg(input, targetId) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    const el = document.getElementById(targetId);
                    if(targetId === 'hero-bg') {
                        el.style.backgroundImage = "url(" + e.target.result + ")";
                    } else {
                        el.src = e.target.result;
                        el.style.display = 'block';
                    }
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        function sendWhatsApp() {
            const name = document.getElementById('site-name').value;
            const accent = document.getElementById('accent-color').value;
            const title = document.getElementById('hero-title-in').value;
            
            const telefone = "5554993243670"; // COLOQUE SEU NUMERO AQUI
            
            const texto = `*SOLICITAÇÃO DE SITE*%0A%0A` +
                          `*Empresa:* ${name}%0A` +
                          `*Cor:* ${accent}%0A` +
                          `*Título:* ${title}`;

            window.open(`https://api.whatsapp.com/send?phone=${telefone}&text=${texto}`);
        }

        update();