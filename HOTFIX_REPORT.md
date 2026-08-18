# Hotfix Report - Landing Page NexaTI Automação

Data do hotfix: 2026-08-18

## Correções realizadas

- Corrigido o fallback mobile sem JavaScript com progressive enhancement:
  - sem JavaScript, o header fica no fluxo normal da página;
  - o botão hamburger fica oculto;
  - o menu aparece como navegação normal, estática e acessível;
  - o menu não usa `fixed`, overlay permanente, `hidden`, `inert` ou bloqueio visual;
  - o hero começa abaixo da navegação e o H1 permanece legível.
- Preservado o comportamento com JavaScript aprovado no QA Final:
  - hamburger visível em mobile;
  - menu fechado com `hidden`, `inert`, `aria-hidden` e `aria-expanded="false"`;
  - abertura/fechamento por botão;
  - fechamento por Escape com retorno de foco ao botão;
  - fechamento por clique em link.
- Corrigido o contraste do focus ring:
  - fundos claros usam `--focus: #0a5f49`;
  - áreas escuras usam `--focus-on-dark: #ffd166`;
  - campos do formulário receberam `:focus-visible` explícito com outline de 3px.

## Arquivos modificados

- `css/style.css`
- `HOTFIX_REPORT.md`

## Testes executados

- Servidor local: `http://127.0.0.1:4173/index.html`.
- Sintaxe JavaScript: `node --check js/script.js`.
- Browser tests com Chromium/Playwright.
- Com JavaScript em `390x844` e `360x800`:
  - hamburger visível;
  - abertura do menu;
  - fechamento por botão;
  - fechamento por Escape;
  - fechamento por clique no link `#servicos`;
  - `aria-expanded`, `hidden`, `inert` e `aria-hidden` acompanhando o estado;
  - links do menu fechado não entraram na sequência de foco por Tab.
- Sem JavaScript em `390x844`, `360x800`, `768x1024` e `1366x768`:
  - H1 totalmente visível;
  - menu sem overlay permanente;
  - navegação acessível;
  - hamburger oculto;
  - `.reveal` sem conteúdo invisível;
  - nenhuma seção desaparecida;
  - sem scroll horizontal.
- Foco por teclado em header, links, CTAs, formulário, CTA flutuante e footer.
- Regressão:
  - zero erros no console;
  - sem scroll horizontal;
  - hero correto em `1366x768`;
  - formulário vazio e válido funcionando;
  - CTA flutuante visível no topo desktop, oculto na seção de contato e `display: none` no mobile;
  - reduced motion sem alteração de parallax por ponteiro;
  - links internos válidos e sem `wa.me`/número falso.

## Resultado do cenário sem JavaScript

| Viewport | Header | Nav | Hamburger | H1 | Sobreposição nav/H1 |
| --- | --- | --- | --- | --- | ---: |
| `390x844` | `static` | `static` | `display: none` | topo `320`, base `514` | `0` |
| `360x800` | `static` | `static` | `display: none` | topo `320`, base `499` | `0` |
| `768x1024` | `static` | `static` | `display: none` | topo `435`, base `535` | `0` |
| `1366x768` | `fixed` | `static` | `display: none` | topo `168`, base `433` | `0` |

Resultado: aprovado. O menu não cobre mais o hero sem JavaScript, e os links continuam acessíveis.

## Resultado do focus ring

Contrastes calculados:

| Combinação | Contraste |
| --- | ---: |
| `#0a5f49` sobre branco | `7.65:1` |
| `#0a5f49` sobre `#f5f7f8` | `7.12:1` |
| `#0a5f49` sobre `#eef4f1` | `6.86:1` |
| `#ffd166` sobre `#0e1512` | `12.84:1` |
| `#ffd166` sobre `#17231e` | `11.24:1` |
| `#ffd166` sobre `#0d1110` | `13.18:1` |
| `#ffd166` sobre `#0f7d61` | `3.53:1` |

Resultado: aprovado. O indicador de foco permanece visível em fundos claros e escuros.

## Regressões verificadas

- JavaScript sem erro de sintaxe.
- Console sem erros nos testes automatizados.
- Sem scroll horizontal nos viewports testados.
- Menu mobile com JavaScript manteve o comportamento aprovado.
- Hero em `1366x768` manteve H1 e CTAs dentro da primeira dobra.
- Formulário continua validando campos vazios, e-mail inválido e envio válido local.
- CTA flutuante continua correto em desktop e mobile.
- Reduced motion continua respeitado.
- Links internos continuam válidos.

## Resultado

PRONTO PARA RETESTE FINAL
