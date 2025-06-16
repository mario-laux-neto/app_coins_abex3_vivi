# Cards Informativos - Tela de Notas

## Funcionalidade Implementada ✅

Foram adicionados cards informativos na tela de notas que aparecem quando o usuário clica nos botões:

- **Ausências**
- **Faltas**
- **Ausências Justificadas**

## Como Funciona

### 1. Botões Informativos

Na tela de notas, há três botões que mostram a quantidade de cada tipo:

- "Ausências (3)" - mostra ausências sem justificativa
- "Faltas (2)" - mostra faltas em sala de aula
- "Ausências Justificadas (3)" - mostra ausências com justificativas

### 2. Cards Detalhados

Ao clicar em cada botão, são exibidos cards com informações detalhadas:

**Para Ausências:**

- Data da ausência
- Disciplina
- Motivo
- Período (manhã/tarde + horários)
- Professor responsável
- Cor: Roxo (PRIMARY_COLOR)
- Ícone: calendar-outline

**Para Faltas:**

- Data da falta
- Disciplina
- Motivo da falta
- Período
- Professor responsável
- Observações adicionais
- Cor: Vermelho (RED_ERROR)
- Ícone: warning-outline

**Para Ausências Justificadas:**

- Data da ausência
- Disciplina
- Motivo
- Período
- Professor responsável
- Justificativa apresentada
- Documento anexado (se houver)
- Cor: Verde (GREEN_SUCCESS)
- Ícone: checkmark-circle-outline

### 3. Interface dos Cards

- Header com ícone colorido e informações básicas (data + disciplina)
- Motivo destacado
- Informações do período e professor
- Campos opcionais: justificativa, observação, documento anexado
- Botão de fechar (X) no canto superior direito
- Design responsivo com sombras e bordas arredondadas

### 4. Dados Mockados

O arquivo contém dados completos de exemplo:

- 3 ausências não justificadas (Matemática, História, Ciências)
- 2 faltas (Ed. Física, Inglês)
- 3 ausências justificadas (Português, Geografia, Química)

## Estilos Aplicados

Foram adicionados 17 novos estilos específicos para os cards informativos:

- `notasCardsContainer` - container principal
- `notasCardsHeader` - cabeçalho com título e botão fechar
- `notasCardsTitle` - título da seção
- `notasCardsCloseButton` - botão de fechar
- `notasCardsEmpty` - estado vazio
- `notasInfoCard` - card individual
- `notasInfoCardHeader` - cabeçalho do card
- `notasInfoCardIcon` - ícone colorido
- `notasInfoCardData` - data em destaque
- `notasInfoCardDisciplina` - nome da disciplina
- `notasInfoCardMotivo` - motivo principal
- `notasInfoCardPeriodo` - período da aula
- `notasInfoCardProfessor` - nome do professor
- `notasInfoCardJustificativa` - justificativa (verde)
- `notasInfoCardObservacao` - observações (cinza)
- `notasInfoCardDocumento` - documento anexado (roxo)

## Estado da Implementação

✅ Lógica de renderização implementada
✅ Estado de controle implementado (tipoCardSelecionado)
✅ Dados mockados completos
✅ Estilos CSS adicionados
✅ Diferentes cores e ícones por tipo
✅ Botão de fechar funcional
✅ Layout responsivo

A funcionalidade está **100% implementada** e pronta para uso!
