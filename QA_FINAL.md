# QA Final - Reteste Pos-Hotfix NexaTI Automacao

Data do reteste final: 2026-08-18  
Funcao: QA Engineer final e auditor independente  
Escopo: reteste focado apos `HOTFIX_REPORT.md`, priorizando os dois pontos que reprovaram a auditoria anterior e uma regressao rapida dos itens ja aprovados.

## Veredito

`APROVADO PARA PUBLICACAO`

O hotfix corrigiu o problema ALTO anterior no fallback mobile sem JavaScript. Em `390x844` e `360x800`, o header e o menu permanecem no fluxo normal, o hamburger fica oculto, o H1 do hero fica totalmente legivel e a navegacao nao cobre o conteudo.

O problema BAIXO de contraste do focus ring tambem foi corrigido. Nao encontrei falha nova CRITICA ou ALTA durante a regressao rapida.

---

## Historico Lido

Arquivos lidos neste reteste:

- `HOTFIX_REPORT.md`
- `QA_FINAL.md`
- `index.html`
- `css/style.css`
- `js/script.js`

O `HOTFIX_REPORT.md` declara:

- correcao do fallback mobile sem JavaScript com progressive enhancement;
- header/nav estaticos sem JS em mobile;
- hamburger oculto sem JS;
- preservacao do menu overlay com JS;
- atualizacao do focus ring com `--focus: #0a5f49` em fundos claros e `--focus-on-dark: #ffd166` em areas escuras.

---

## Ambiente e Metodo

- Servidor local normal: `http://127.0.0.1:4173/index.html`
- Servidor temporario sem JavaScript: `http://127.0.0.1:4174/index.html`, com CSP `script-src 'none'`
- Viewports principais do reteste: `390x844`, `360x800`
- Regressao rapida: `1920x1080`, `1366x768`, `1024x768`, `768x1024`, `390x844`, `360x800`
- Sintaxe JS: `node --check js/script.js`
- Console do navegador: sem erros nos testes executados
- Arquivo atualizado: somente `QA_FINAL.md`

---

## Reteste 1 - Menu Mobile Sem JavaScript

Resultado: aprovado.

### `390x844`

| Item | Resultado |
| --- | --- |
| JavaScript | Bloqueado via CSP |
| Classe `.js-enabled` | Ausente |
| Header | `position: static` |
| Nav | `position: static`, `display: flex`, `opacity: 1`, `pointer-events: auto` |
| Hamburger | `display: none` |
| H1 | `top: 320`, `bottom: 514`, `opacity: 1`, `visibility: visible` |
| Sobreposicao nav/H1 | `0 px` |
| Scroll horizontal | Nao |
| `.reveal` invisivel | `0` |

### `360x800`

| Item | Resultado |
| --- | --- |
| JavaScript | Bloqueado via CSP |
| Classe `.js-enabled` | Ausente |
| Header | `position: static` |
| Nav | `position: static`, `display: flex`, `opacity: 1`, `pointer-events: auto` |
| Hamburger | `display: none` |
| H1 | `top: 320`, `bottom: 499`, `opacity: 1`, `visibility: visible` |
| Sobreposicao nav/H1 | `0 px` |
| Scroll horizontal | Nao |
| `.reveal` invisivel | `0` |

Conclusao: o bloqueio ALTO anterior foi corrigido. O menu nao e mais overlay fixo sem JavaScript e nao cobre o hero.

---

## Reteste 2 - Focus Ring

Resultado: aprovado.

Contrastes calculados:

| Combinacao | Contraste |
| --- | ---: |
| `#0a5f49` sobre branco | `7.65:1` |
| `#0a5f49` sobre `#f5f7f8` | `7.12:1` |
| `#0a5f49` sobre `#eef4f1` | `6.86:1` |
| `#ffd166` sobre `#0e1512` | `12.84:1` |
| `#ffd166` sobre `#17231e` | `11.24:1` |
| `#ffd166` sobre `#0d1110` | `13.18:1` |
| `#ffd166` sobre `#0f7d61` | `3.53:1` |

Elementos verificados com foco visivel:

- Skip link.
- Brand do header.
- Links da navegacao.
- CTA primario do hero.
- CTA secundario do hero.
- CTA flutuante.
- CTA final.
- Link do footer.
- Campos `nome`, `empresa`, `email`, `servico`, `mensagem`, `consentimento`.
- Botao de envio.

Resultado encontrado:

- Areas escuras usam `rgb(255, 209, 102)` / `#ffd166`.
- Areas claras e formulario usam `rgb(10, 95, 73)` / `#0a5f49`.
- Outline aplicado: `3px solid`, com offset adequado.
- Campos do formulario possuem regra explicita de `:focus-visible`.

Conclusao: o problema BAIXO anterior de foco fraco em fundo claro foi corrigido.

---

## Regressao Rapida

### Menu Mobile Com JavaScript

Resultado: aprovado em `390x844` e `360x800`.

| Estado | Resultado |
| --- | --- |
| Fechado inicial | `aria-expanded="false"`, `hidden=true`, `inert`, `aria-hidden="true"`, `opacity: 0`, `pointer-events: none` |
| Aberto | `aria-expanded="true"`, `hidden=false`, sem `aria-hidden`, classe `is-open`, `opacity: 1`, `pointer-events: auto` |
| Fechar por botao | Passou |
| Reabrir | Passou |
| Clique no link `#servicos` | Fecha menu e navega |
| Escape | Fecha menu, `aria-expanded="false"` |

Nao houve erro de console.

### Formulario

Resultado: aprovado.

| Cenario | Resultado |
| --- | --- |
| Campos vazios | Mensagem "Revise os campos destacados antes de enviar.", foco em `nome`, invalidos: `nome`, `email`, `servico`, `mensagem`, `consentimento` |
| E-mail invalido | Invalido apenas em `email`, foco em `email` |
| Envio valido | Mensagem de sucesso local, sem dados na URL, sem submissao externa |

### Hero em `1366x768`

Resultado: aprovado.

- H1: `top: 168`, `bottom: 433`.
- Hero: `height: 778`.
- CTAs: `top: 586`, `bottom: 634`.
- Botoes sem corte.
- Sem scroll horizontal.
- Card decorativo `scene-node--rules` ainda cruza parte da area do H1 numericamente, mas em `opacity: 0.3`; visualmente permanece como decoracao de fundo e nao prejudica leitura/hierarquia.

### Reduced Motion

Resultado: aprovado por regressao de codigo.

- `js/script.js` mantem `window.matchMedia("(prefers-reduced-motion: reduce)")`.
- Parallax por `pointermove` so e registrado quando `!reducedMotionQuery.matches`.
- Quando reduced motion esta ativo, `revealAll()` e chamado.
- `css/style.css` mantem `@media (prefers-reduced-motion: reduce)` com reducao de animacao/transicao e `.reveal` visivel.

O hotfix nao alterou `js/script.js`; nao ha indicio de regressao nesse ponto.

### CTA Flutuante

Resultado: aprovado.

- No topo desktop: visivel, `href="#contato"`.
- Na secao de contato desktop: classe `is-hidden`, `visibility: hidden`, `opacity: 0`, `pointer-events: none`.
- Em mobile `390x844`: `display: none`, sem interferencia com formulario.
- Nao ha `wa.me` nem numero falso.

### Scroll Horizontal

Resultado: aprovado.

| Viewport | Scroll horizontal | Botoes do hero cortados |
| --- | --- | --- |
| `1920x1080` | Nao | Nao |
| `1366x768` | Nao | Nao |
| `1024x768` | Nao | Nao |
| `768x1024` | Nao | Nao |
| `390x844` | Nao | Nao |
| `360x800` | Nao | Nao |

### Console e Sintaxe

Resultado: aprovado.

- `node --check js/script.js`: sem erro.
- Console do navegador: sem erros ou warnings relevantes nos testes executados.

---

## Comparacao Com QA Anterior

| Problema | Situacao anterior | Situacao apos hotfix | Resultado |
| --- | --- | --- | --- |
| Mobile sem JS cobre H1 | ALTO, bloqueava publicacao | Header/nav estaticos, H1 legivel, sobreposicao `0` | CORRIGIDO |
| Focus ring em fundos claros | BAIXO | Contraste `7.65:1` em branco e outline visivel | CORRIGIDO |
| Menu mobile com JS | Corrigido antes | Continua funcionando | SEM REGRESSAO |
| Formulario | Corrigido antes | Continua funcionando | SEM REGRESSAO |
| Hero `1366x768` | Corrigido antes | Continua aprovado | SEM REGRESSAO |
| CTA flutuante | Corrigido antes | Continua aprovado | SEM REGRESSAO |
| Reduced motion | Corrigido antes | Codigo/regra preservados | SEM REGRESSAO |
| Scroll horizontal | Sem falha | Continua sem falha | SEM REGRESSAO |

---

## Problemas Atuais

Nenhum problema CRITICO ou ALTO encontrado no reteste final.

Pendencias nao bloqueadoras de deploy:

1. Definir `canonical` quando a URL final existir.
2. Definir `og:url` quando a URL final existir.
3. Criar e configurar imagem Open Graph final.
4. Configurar `twitter:image` apos definicao da imagem social e URL publica.

---

## Notas Atualizadas

| Categoria | Nota atual |
| --- | ---: |
| Visual | 8.6 |
| Responsividade | 8.8 |
| Funcionalidade | 8.8 |
| Codigo | 8.3 |
| SEO | 8.0 |
| Acessibilidade | 8.4 |
| Apresentacao comercial | 8.3 |
| Robustez | 8.5 |

---

## Resultado Final

`APROVADO PARA PUBLICACAO`

Motivo objetivo: o problema ALTO que bloqueava a publicacao foi corrigido, o focus ring foi ajustado, e a regressao rapida nao encontrou nova falha CRITICA ou ALTA.
