# PetConnect - Website para Serviços de Pets

Um website moderno e responsivo para conectar donos de pets com os melhores cuidadores e serviços para animais de estimação.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes UI reutilizáveis
- **Lucide React** - Ícones modernos
- **Bun** - Runtime e gerenciador de pacotes

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Estilos globais e variáveis CSS
│   ├── layout.tsx           # Layout raiz com fontes configuradas
│   └── page.tsx             # Página principal
├── components/
│   ├── ui/                  # Componentes UI reutilizáveis (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   ├── header.tsx           # Cabeçalho com navegação
│   ├── hero-section.tsx     # Seção hero com formulário de busca
│   ├── company-card.tsx     # Card de empresa reutilizável
│   └── companies-section.tsx # Seção de empresas recomendadas
└── lib/
    └── utils.ts             # Utilitários (cn function)
```

## 🎨 Design System

### Cores
- **Primária**: `#38e07b` (Verde PetConnect)
- **Secundária**: `#e8f2ec` (Verde claro)
- **Texto**: `#0e1a13` (Verde escuro)
- **Texto secundário**: `#51946c` (Verde médio)
- **Fundo**: `#f8fbfa` (Verde muito claro)

### Fontes
- **Space Grotesk** - Fonte principal (400, 500, 700)
- **Noto Sans** - Fonte secundária (400, 500, 700, 900)

## 🧩 Componentes

### Header
- Logo com ícone Heart do Lucide
- Navegação principal (Home, Services, About Us, Contact)
- Botões de Login e Sign Up

### Hero Section
- Título principal impactante
- Descrição dos serviços
- Formulário de busca com ícone de pesquisa
- Background com imagem de pets

### Company Card
- Imagem da empresa
- Nome e descrição
- Hover effect com scale
- Acessibilidade completa (keyboard navigation, ARIA labels)

### Companies Section
- Grid responsivo (1 col mobile, 2 tablet, 4 desktop)
- Cards de empresas recomendadas
- Dados mockados para demonstração

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   bun install
   ```

2. **Executar em desenvolvimento:**
   ```bash
   bun run dev
   ```

3. **Build para produção:**
   ```bash
   bun run build
   ```

4. **Executar produção:**
   ```bash
   bun run start
   ```

## 📱 Responsividade

O design é totalmente responsivo com breakpoints:
- **Mobile**: 1 coluna
- **Tablet** (sm): 2 colunas
- **Desktop** (lg): 4 colunas

## ♿ Acessibilidade

- Navegação por teclado
- ARIA labels apropriados
- Contraste adequado
- Semântica HTML correta
- Focus indicators visíveis

## 🔧 Scripts Disponíveis

- `bun run dev` - Servidor de desenvolvimento
- `bun run build` - Build para produção
- `bun run start` - Servidor de produção
- `bun run lint` - Verificação de linting
- `bun run format` - Formatação de código

## 📦 Dependências Principais

- `next` - Framework React
- `react` - Biblioteca de UI
- `lucide-react` - Ícones
- `tailwindcss` - CSS framework
- `class-variance-authority` - Variantes de componentes
- `clsx` - Utilitário para classes CSS
- `tailwind-merge` - Merge de classes Tailwind

## 🎯 Próximos Passos

- [ ] Implementar roteamento para páginas de serviços
- [ ] Adicionar sistema de autenticação
- [ ] Integrar com API de empresas
- [ ] Implementar filtros de busca
- [ ] Adicionar sistema de avaliações
- [ ] Implementar agendamento online