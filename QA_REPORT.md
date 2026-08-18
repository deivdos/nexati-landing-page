# QA Report - Landing Page NexaTI Automacao

Data da auditoria: 2026-08-18  
Escopo: auditoria funcional, responsiva, visual, comercial, HTML, CSS, JavaScript, SEO, acessibilidade, seguranca e privacidade.  
Ambiente de teste: `http://127.0.0.1:4173/index.html`, servido localmente a partir da raiz do projeto.  
Viewports testados: 1920x1080, 1366x768, 1024x768, 768x1024, 390x844 e 360x800.

## Resumo Executivo

A landing page tem boa estrutura geral, sem erros de console nos testes, sem IDs duplicados, com headings coerentes, links internos existentes e validacao de formulario funcionando quando JavaScript esta disponivel.

Mesmo assim, a pagina nao esta pronta para publicacao profissional sem ajustes. Os principais bloqueios sao: dependencia excessiva de JavaScript para exibir conteudo, fallback inseguro/inadequado do formulario sem JavaScript, contraste insuficiente em elementos de acao, menu mobile escondido apenas visualmente e link de WhatsApp com numero falso.

## Evidencias de Teste

- Links internos do menu e rodape apontam para ancoras existentes.
- CTAs internos funcionam com scroll suave quando testados com espera completa.
- Formulario exibe erros para campos obrigatorios vazios e mensagem de sucesso para envio demonstrativo valido.
- Menu mobile abre, fecha por clique, fecha por link e responde a Escape.
- Nao houve scroll horizontal real nos viewports testados.
- Nao foram encontrados erros de console.
- Foram encontradas 13 a 16 ocorrencias visiveis de termos como ficticio, demonstrativo, portfolio ou equivalentes, dependendo do viewport.
- No viewport 1366x768, cards decorativos do hero se sobrepoem visualmente ao texto principal e aos CTAs.
- No viewport 390x844, o botao flutuante de WhatsApp aparece sobre a area do formulario.

---

## Problemas Encontrados

### [ALTO] Conteudo depende de JavaScript para ficar visivel

1. Problema: varios blocos usam `.reveal` com `opacity: 0` por padrao e so ficam visiveis apos o JavaScript adicionar `.is-visible`.
2. Onde ocorre: `css/style.css:1141`, `css/style.css:1147`, `js/script.js:77-93`, aplicado a secoes/cards em `index.html`.
3. Impacto: se o JavaScript falhar, for bloqueado, carregar tarde demais ou estiver indisponivel, grande parte da landing page fica invisivel. Isso afeta acessibilidade, SEO percebido, robustez e demonstracao profissional.
4. Recomendacao: deixar o conteudo visivel por padrao e usar JavaScript apenas para adicionar animacoes progressivas. Uma abordagem segura e aplicar o estado animado somente quando uma classe como `.js-enabled` existir no `<html>`.
5. Bloqueia publicacao: sim.

### [ALTO] Formulario tem fallback inadequado sem JavaScript

1. Problema: o formulario possui `novalidate`, nao possui `action` nem `method`, e depende do `preventDefault()` em JavaScript.
2. Onde ocorre: `index.html:378`, `js/script.js:172-194`.
3. Impacto: sem JavaScript, o navegador pode submeter os campos para a propria URL via `GET`, expondo nome, e-mail e mensagem na query string. Alem disso, `novalidate` remove a validacao nativa quando o script nao esta ativo.
4. Recomendacao: definir comportamento seguro para o formulario demonstrativo. Para demo estatica, impedir submissao sem JS de forma explicita ou usar `action="#"`/`method="post"` com fallback claro. Para uso real, conectar a um endpoint e manter validacao nativa ou fallback acessivel.
5. Bloqueia publicacao: sim.

### [ALTO] Contraste insuficiente em CTAs e textos pequenos

1. Problema: a cor principal `#18a87d` com texto branco tem contraste aproximado de 3.03:1; como os CTAs usam texto de tamanho normal, isso nao atende ao contraste minimo recomendado de 4.5:1. A mesma cor em `.eyebrow` sobre fundo claro tem cerca de 2.82:1. O dourado `#d99b28` sobre branco fica em cerca de 2.42:1.
2. Onde ocorre: variaveis em `css/style.css:9-12`, `.eyebrow` em `css/style.css:390-399`, `.button--primary` em `css/style.css:465-473`, `card-index` em `css/style.css:587`.
3. Impacto: prejudica leitura, acessibilidade e percepcao de acabamento profissional. Afeta diretamente botoes de conversao e microtextos de hierarquia.
4. Recomendacao: usar tons mais escuros para texto/acoes em fundo claro ou ajustar fundo/texto dos botoes. O `--accent-dark` ja tem contraste melhor com branco e pode servir de base.
5. Bloqueia publicacao: sim.

### [ALTO] Menu mobile fica escondido visualmente, mas continua no fluxo de acessibilidade

1. Problema: no mobile, `.main-nav` fechado usa `opacity: 0` e `pointer-events: none`, mas os links continuam no DOM, com `tabIndex` padrao e sem `hidden`, `inert` ou controle equivalente.
2. Onde ocorre: `index.html:54-59`, `css/style.css:1192-1215`, `js/script.js:15-33`.
3. Impacto: usuarios de teclado e leitores de tela podem encontrar links de menu que estao invisiveis. Isso causa navegacao confusa e quebra expectativa de acessibilidade.
4. Recomendacao: quando fechado, remover o menu do fluxo interativo com `hidden`, `inert`, `aria-hidden` combinado com controle de foco, ou ajustar `tabindex="-1"` nos links ate o menu abrir.
5. Bloqueia publicacao: sim.

### [ALTO] Link de WhatsApp usa numero falso

1. Problema: o botao flutuante aponta para `https://wa.me/5500000000000...`, que e um destino falso/invalido.
2. Onde ocorre: `index.html:447-451`.
3. Impacto: para portfolio e demonstracao a clientes, um CTA externo falso reduz confianca e pode gerar erro ao clicar. Para landing comercial real, e um bloqueio direto de conversao.
4. Recomendacao: substituir por um numero real antes de publicacao comercial. Para portfolio, usar um CTA interno para `#contato`, remover o link externo ou indicar discretamente que o canal sera configurado no projeto real.
5. Bloqueia publicacao: sim.

### [MEDIO] Excesso de transparencia visivel prejudica a sensacao comercial

1. Problema: a pagina repete muitas vezes termos como ficticio, demonstrativo, portfolio, sem clientes reais e sem metricas reais.
2. Onde ocorre: `index.html:9`, `index.html:17`, `index.html:95`, `index.html:102`, `index.html:107-108`, `index.html:297-300`, `index.html:366-374`, `index.html:435`, `index.html:439`, `index.html:466`, `index.html:478`.
3. Impacto: a transparencia e correta, mas o excesso faz a landing parecer uma peca academica ou gerada para demonstracao, em vez de uma pagina comercial real. Isso enfraquece o impacto em plataformas de freelancing.
4. Recomendacao: concentrar a transparencia em um bloco discreto, no rodape e no README. Manter os textos comerciais da experiencia principal com linguagem realista, sem inventar clientes, resultados ou metricas.
5. Bloqueia publicacao: nao tecnicamente, mas bloqueia a apresentacao comercial ideal.

### [MEDIO] CTAs principais usam linguagem demonstrativa demais

1. Problema: CTAs como "Solicitar diagnostico demonstrativo" e "Enviar mensagem demonstrativa" reduzem a intencao comercial.
2. Onde ocorre: `index.html:102`, `index.html:439`.
3. Impacto: o usuario percebe a pagina como prototipo antes de perceber a oferta. Isso enfraquece conversao e portfolio.
4. Recomendacao: usar CTAs comerciais neutros, como "Solicitar diagnostico", "Mapear uma automacao" ou "Enviar mensagem", mantendo a nota de transparencia em local separado.
5. Bloqueia publicacao: nao, mas deve ser corrigido antes de demonstracao para clientes.

### [MEDIO] Cards decorativos do hero competem com conteudo principal

1. Problema: os cards cenograficos do hero passam por tras do H1, eyebrow, botoes e sinais de confianca em alguns viewports, especialmente 1366x768. No mobile, parte do texto decorativo aparece atras dos botoes.
2. Onde ocorre: markup em `index.html:72-90`, posicionamento em `css/style.css:318-379`, ajustes responsivos em `css/style.css:1234-1258` e `css/style.css:1323-1349`.
3. Impacto: o topo fica visualmente ruidoso, com textos sobrepostos e menor sensacao de refinamento. Isso afeta a primeira impressao profissional.
4. Recomendacao: reposicionar ou ocultar os cards decorativos nos breakpoints problematicos, reduzir opacidade quando cruzarem o conteudo e garantir que elementos cenograficos nao tenham texto legivel competindo com o copy principal.
5. Bloqueia publicacao: nao, mas deve ser corrigido para portfolio profissional.

### [MEDIO] Botao flutuante de WhatsApp interfere no formulario mobile

1. Problema: em 390x844, o botao fixo de WhatsApp aparece sobre a area do formulario.
2. Onde ocorre: `index.html:447-453`, `css/style.css:1030-1047`, ajuste mobile em `css/style.css:1386-1390`.
3. Impacto: o botao compete com campos de entrada e pode atrapalhar leitura/toque no principal ponto de conversao.
4. Recomendacao: esconder ou deslocar o botao ao entrar na secao de contato, adicionar margem/padding inferior suficiente, ou transformar o WhatsApp em CTA inline no bloco de contato.
5. Bloqueia publicacao: nao, mas afeta conversao mobile.

### [MEDIO] SEO social esta incompleto para compartilhamento

1. Problema: ha `og:title`, `og:description`, `og:type`, `og:locale` e `twitter:card`, mas faltam metadados importantes de compartilhamento, como Twitter title/description e imagem social.
2. Onde ocorre: `index.html:14-21`.
3. Impacto: links compartilhados podem aparecer pobres, sem imagem, ou com textos herdados automaticamente. Isso reduz apresentacao profissional em portfolio e vendas.
4. Recomendacao: adicionar `twitter:title`, `twitter:description` e preparar uma imagem social. Tambem revisar `og:description`, pois hoje ela reforca "Projeto ficticio para portfolio".
5. Bloqueia publicacao: nao para demo local; deve ser corrigido antes de publicacao publica.

### [MEDIO] Meta description e Open Graph enfatizam demais o carater ficticio

1. Problema: a description e o `og:description` abrem espaco nobre de SEO com "Landing page demonstrativa", "empresa ficticia" e "Projeto ficticio para portfolio".
2. Onde ocorre: `index.html:8-17`.
3. Impacto: em SERP ou cards sociais, o primeiro contato do avaliador/cliente sera com o aviso de demo, nao com a proposta de valor. Isso e transparente, mas comercialmente fraco.
4. Recomendacao: mover a transparencia principal para o corpo/rodape/README e usar metadados focados na oferta demonstrada, sem alegar clientes ou resultados reais.
5. Bloqueia publicacao: nao, mas prejudica portfolio publico.

### [BAIXO] Secao "Diferenciais" nao aparece na navegacao

1. Problema: existe a secao `#diferenciais`, mas ela nao aparece no menu principal nem no rodape.
2. Onde ocorre: secao em `index.html:256`, menu em `index.html:54-59`, rodape em `index.html:469-473`.
3. Impacto: reduz a consistencia da arquitetura de informacao. O usuario pode nao perceber que a pagina tem esse bloco.
4. Recomendacao: incluir "Diferenciais" na navegacao ou renomear/reorganizar a secao para fazer parte clara do fluxo.
5. Bloqueia publicacao: nao.

### [BAIXO] Hero fica alto demais em 1366x768

1. Problema: no viewport 1366x768, o hero medido ficou com aproximadamente 812px de altura, deixando a proxima secao fora da primeira dobra.
2. Onde ocorre: `css/style.css:242-245`.
3. Impacto: a primeira tela fica pesada e nao sugere continuidade abaixo em notebooks comuns. Isso pode reduzir exploracao inicial.
4. Recomendacao: ajustar altura/padding do hero para manter composicao forte e deixar uma pista visual da proxima secao em alturas comuns.
5. Bloqueia publicacao: nao.

### [BAIXO] `overflow-x: hidden` pode mascarar problemas reais de layout

1. Problema: o `body` usa `overflow-x: hidden`; ao mesmo tempo, elementos decorativos ficam parcialmente fora da viewport em tablet/mobile.
2. Onde ocorre: `css/style.css:35`, `css/style.css:1246-1255`, `css/style.css:1340-1349`.
3. Impacto: nos testes nao houve scroll horizontal real, mas a regra pode esconder estouros futuros e dificulta diagnosticar regressao responsiva.
4. Recomendacao: corrigir posicionamentos que saem da viewport e usar `overflow` localizado nos elementos decorativos, nao como mascara global permanente.
5. Bloqueia publicacao: nao.

### [BAIXO] Movimento por ponteiro nao considera preferencia de reducao de movimento

1. Problema: existe suporte CSS a `prefers-reduced-motion`, mas o JavaScript continua atualizando variaveis de parallax no hero via `pointermove`.
2. Onde ocorre: `js/script.js:60-72`, `css/style.css:1394-1408`.
3. Impacto: usuarios que preferem menos movimento ainda podem perceber deslocamentos no hero ao mover o ponteiro.
4. Recomendacao: no JavaScript, verificar `window.matchMedia("(prefers-reduced-motion: reduce)")` antes de registrar o listener de `pointermove`.
5. Bloqueia publicacao: nao.

### [MELHORIA] Configuracoes dependentes da URL final ainda estao ausentes

1. Problema: nao ha `canonical`, `og:url`, `og:image`, `twitter:image` e possiveis variantes de favicon/preview para producao.
2. Onde ocorre: `index.html:14-23`.
3. Impacto: nao e possivel finalizar SEO tecnico/social sem saber a URL publica e a imagem oficial de compartilhamento.
4. Recomendacao: quando a URL definitiva existir, adicionar canonical, `og:url`, imagem social absoluta e metadados Twitter completos.
5. Bloqueia publicacao: nao bloqueia a auditoria atual, mas deve bloquear deploy publico final se a pagina for usada comercialmente.

---

## Pontos Verificados Sem Bloqueio

- Nao foram encontrados IDs duplicados.
- As ancoras internas existentes apontam para elementos reais.
- A hierarquia de headings e consistente: um H1 principal, H2 por secao e H3 nos cards.
- Header, main, nav e footer estao presentes.
- Labels de formulario estao associados aos campos principais.
- Campos de nome, empresa e e-mail possuem `autocomplete` apropriado.
- `target="_blank"` do WhatsApp possui `rel="noopener noreferrer"`.
- Nao ha dependencias externas carregadas pela pagina.
- Nao foram encontrados erros de console durante os testes.

## SEO - Separacao por Tipo

Problemas que podem ser corrigidos agora:

- Revisar meta description e `og:description` para nao liderarem com "ficticio" e "demonstrativo".
- Adicionar `twitter:title` e `twitter:description`.
- Ajustar CTAs e textos principais para linguagem comercial neutra.
- Melhorar contraste de elementos de texto/acao.

Configuracoes que dependem da URL definitiva:

- `canonical`.
- `og:url`.
- `og:image` com URL absoluta.
- `twitter:image`.
- Eventuais imagens sociais finais e variantes de favicon para publicacao.

## Resultado

`REPROVADO PARA PUBLICACAO`

Motivo: a landing page funciona visualmente e possui boa base, mas tem bloqueios de acessibilidade, fallback sem JavaScript, privacidade de formulario e destino falso de WhatsApp. Para portfolio interno, pode ser demonstrada com ressalvas; para publicacao profissional ou apresentacao a clientes, deve passar por uma rodada de correcao.

## Nota

- Visual: 7.0/10
- Responsividade: 7.5/10
- Funcionalidade: 7.0/10
- Codigo: 7.0/10
- SEO: 6.0/10
- Acessibilidade: 5.5/10
- Apresentacao comercial: 5.5/10

