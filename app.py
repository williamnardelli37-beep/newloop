from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import random

app = Flask(__name__)
CORS(app)

# A IA agora entende praticamente todos os tipos de projetos digitais
CONHECIMENTO = {
    "site_apresentacao": {
        "filtros": [r"apresentaç", r"institucional", r"empresa", r"apresenta", r"cartao de visita"],
        "respostas": [
            "Um site de apresentação (institucional) é perfeito para dar credibilidade à sua marca. Focamos em design limpo e autoridade. Quer ver um exemplo?",
            "Para apresentação, criamos sites que contam a história da sua empresa e listam seus serviços de forma profissional. O que não pode faltar no seu?",
            "Sites institucionais são o nosso forte. Criamos uma vitrine digital que passa confiança imediata para o seu cliente."
        ]
    },
    "landing_pages": {
        "filtros": [r"landing", r"lp", r"pagina de venda", r"conversao", r"captar", r"lead", r"unica pagina"],
        "respostas": [
            "Landing Pages são focadas em uma única ação: VENDER. É o modelo ideal para campanhas de anúncios. Você já faz anúncios no Google ou Meta?",
            "Se você quer captar leads (contatos) rápido, a Landing Page é a melhor escolha. Fazemos LPs que carregam em menos de 2 segundos!",
            "A LP é direta ao ponto. Ideal para lançamentos de produtos ou serviços específicos. Quer escalar suas vendas com uma?"
        ]
    },
    "ecommerce_loja": {
        "filtros": [r"loja", r"vender", r"comprar", r"ecommerce", r"e-commerce", r"catalogo", r"carrinho", r"pagamento online"],
        "respostas": [
            "Para e-commerce, usamos o modelo do **Sebo Soler**: catálogo organizado, busca inteligente e checkout seguro. Quantos produtos você pretende vender?",
            "Criamos lojas virtuais completas. Do estoque ao pagamento. É um projeto robusto que leva cerca de 1 mês para ficar perfeito.",
            "Seu foco é e-commerce? Desenvolvemos plataformas que aguentam alto volume de acessos e facilitam a compra."
        ]
    },
    "portfolio_curriculo": {
        "filtros": [r"portfolio", r"portifolio", r"meus trabalhos", r"curriculo", r"pessoal", r"artista", r"fotos", r"galeria"],
        "respostas": [
            "Sites de portfólio precisam destacar sua arte ou trabalho. Criamos galerias dinâmicas e interativas. Qual a sua área de atuação?",
            "Para portfólios, o foco é o visual. Criamos algo que seja um impacto para quem visita. Vamos destacar seus melhores cases?"
        ]
    },
    "plataformas_complexas": {
        "filtros": [r"sistema", r"plataforma", r"web app", r"aplicativo", r"dashboard", r"portal", r"area de membros", r"ead"],
        "respostas": [
            "Desenvolvemos sistemas web sob medida, com bancos de dados e áreas restritas. É um projeto mais complexo, estilo SaaS.",
            "Plataformas e portais exigem uma arquitetura de software avançada. Usamos Python e tecnologias de ponta para isso. Qual a funcionalidade principal?"
        ]
    },
    "blogs_noticias": {
        "filtros": [r"blog", r"noticia", r"artigo", r"conteudo", r"portal de noticias", r"revista digital"],
        "respostas": [
            "Blogs são excelentes para SEO e autoridade. Criamos painéis fáceis para você mesmo postar seus artigos.",
            "Para portais de conteúdo, focamos em legibilidade e organização por categorias. Você pretende postar diariamente?"
        ]
    }
}

def motor_consultor(pergunta):
    pergunta = pergunta.lower()
    
    # 1. Identificação de "O que você faz?" ou "Tipos de site"
    if any(x in pergunta for x in ["tipo", "quais", "quais sites", "lista"]):
        return "Trabalhamos com todos os modelos: Institucionais (Apresentação), Landing Pages, E-commerces, Portfólios, Blogs e Sistemas Web sob medida. Qual deles você tem interesse?"

    # 2. Varredura por Regex (Onde a mágica acontece)
    for chave, dados in CONHECIMENTO.items():
        for filtro in dados["filtros"]:
            if re.search(filtro, pergunta):
                return random.choice(dados["respostas"])
    
    # 3. Resposta de ajuda caso a dúvida seja vaga
    return "Entendi! Para esse tipo de projeto, o ideal é analisarmos se você precisa de algo mais visual (como um site de apresentação) ou focado em vendas (como uma Landing Page). Qual o seu objetivo principal hoje?"

@app.route('/perguntar', methods=['POST'])
def perguntar():
    try:
        dados = request.json
        msg = dados.get('pergunta', '')
        resposta = motor_consultor(msg)
        return jsonify({"resposta": resposta})
    except:
        return jsonify({"resposta": "Tive um erro aqui. Pode repetir?"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)