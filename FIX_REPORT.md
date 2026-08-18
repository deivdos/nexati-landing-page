# Fix Report - Landing Page NexaTI Automacao

Data da correcao: 2026-08-18

## Correcoes realizadas

- Ajustada a estrategia de animacao `.reveal`: o conteudo agora fica visivel por padrao e o estado animado so e aplicado quando JavaScript adiciona `.js-enabled`.
- Corrigido o formulario estatico para nao enviar dados reais nem expor nome, e-mail ou mensagem na URL. Os campos sensiveis nao possuem `name`, `novalidate` foi removido do HTML e a validacao customizada so e ativada com JavaScript.
- Revisadas cores criticas de contraste: verde principal, verde escuro e dourado textual foram ajustados mantendo a identidade visual.
- Corrigido o menu mobile fechado com `hidden`, `inert`, `aria-hidden`, `aria-expanded`, fechamento por Escape e fechamento apos clique em link.
- Removido o link externo falso de WhatsApp. O CTA flutuante agora aponta para `#contato`, com indicacao de canal configuravel para implementacao real.
- Reduzida a linguagem de projeto conceitual no fluxo principal. A transparencia ficou concentrada no footer e no README.
- Atualizados CTAs para linguagem comercial neutra.
- Ajustados cards decorativos do hero em notebook/tablet/mobile para nao competir com H1, texto e CTAs.
- Corrigido o CTA flutuante em mobile: ele fica oculto em celulares e tambem e escondido quando a secao de contato entra em foco.
- Ajustado o JavaScript para respeitar `prefers-reduced-motion: reduce` antes de ativar parallax por ponteiro.
- Revisados `meta description`, `og:description` e adicionados `twitter:title` e `twitter:description`.
- README atualizado para refletir o comportamento atual do projeto.

## Arquivos modificados

- `index.html`
- `css/style.css`
- `js/script.js`
- `README.md`
- `FIX_REPORT.md`

## Testes executados

- Servidor local em `http://127.0.0.1:4173/index.html`.
- Viewports testados: 1920x1080, 1366x768, 1024x768, 768x1024, 390x844 e 360x800.
- Verificacao visual por screenshots do hero, header, CTAs, decoracao, tablet e mobile.
- Links internos e ancoras existentes.
- Menu desktop visivel.
- Menu mobile fechado fora do fluxo interativo, abertura, Escape e fechamento por clique em link.
- Formulario com JavaScript: vazio, e-mail invalido e preenchimento valido.
- Formulario sem JavaScript: conteudo visivel, validacao nativa disponivel e nenhum dado sensivel exposto na URL.
- Reveal com JavaScript e sem JavaScript.
- `prefers-reduced-motion: reduce` sem parallax por ponteiro.
- CTA flutuante substituto apontando para `#contato`, oculto no mobile e oculto na secao de contato.
- Busca textual final por termos de transparencia e destinos falsos.
- `node --check js/script.js`.
- Console do navegador: zero erros e zero excecoes nos testes automatizados.
- Contraste calculado para combinacoes criticas:
  - branco sobre `#0f7d61`: 5.09:1;
  - branco sobre `#0a5f49`: 7.65:1;
  - `#0f7d61` sobre `#f5f7f8`: 4.74:1;
  - `#8a5c0a` sobre branco: 5.81:1.

## Problemas resolvidos

- [ALTO] Conteudo dependente de JavaScript para ficar visivel.
- [ALTO] Fallback inadequado do formulario sem JavaScript.
- [ALTO] Contraste insuficiente em CTAs e textos pequenos.
- [ALTO] Menu mobile escondido apenas visualmente.
- [ALTO] Link de WhatsApp com numero falso.
- [MEDIO] Excesso de transparencia visivel no fluxo comercial.
- [MEDIO] CTAs com linguagem demonstrativa demais.
- [MEDIO] Cards decorativos do hero competindo com conteudo principal.
- [MEDIO] Botao flutuante interferindo no formulario mobile.
- [MEDIO] SEO social incompleto para Twitter.
- [MEDIO] Meta description e Open Graph enfatizando demais o carater conceitual.
- [BAIXO] Movimento por ponteiro sem considerar reducao de movimento.

## Pendencias

- Definir `canonical` quando a URL final existir.
- Definir `og:url` quando a URL final existir.
- Criar e configurar imagem Open Graph final.
- Configurar `twitter:image` apos definicao da imagem social e URL publica.

## Resultado

PRONTO PARA QA FINAL
