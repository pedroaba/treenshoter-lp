# Treenshoter Landing Page

> Landing page moderna e responsiva para o Treenshoter - aplicativo minimalista para captura, gerenciamento e organização de screenshots.

Esta é a landing page oficial do [Treenshoter](https://github.com/pedroaba/treenshoter), desenvolvida com Next.js 16 e App Router. A página apresenta as funcionalidades do aplicativo, screenshots, informações de download e detalhes sobre as tecnologias utilizadas.

## Características

### Funcionalidades Principais

- **Design Moderno**: Interface limpa e minimalista com suporte a tema claro/escuro
- **Internacionalização**: Suporte completo para Português e Inglês
- **Responsivo**: Totalmente adaptável para desktop, tablet e mobile
- **SEO Otimizado**: Metadata completa, Open Graph, Twitter Cards e sitemap
- **Performance**: Otimizado com Next.js App Router e Server Components
- **Acessibilidade**: Componentes acessíveis com Radix UI
- **Navegação**: Menu de navegação responsivo com suporte mobile

### Páginas

- **Home**: Hero section, features, screenshots e download
- **Sobre**: Informações sobre o projeto e tecnologias utilizadas
- **Download**: Página dedicada com instruções de download para cada plataforma

## Tecnologias

### Core Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.1.1 (App Router)
- **Frontend**:
  - [React](https://react.dev/) 19.2.3
  - [TypeScript](https://www.typescriptlang.org/) 5.x
  - [Tailwind CSS](https://tailwindcss.com/) 4.x
- **Internacionalização**: [next-intl](https://next-intl-docs.vercel.app/) 4.6.1
- **Tema**: [next-themes](https://github.com/pacocoursey/next-themes) 0.4.6

### UI Components

- **Radix UI**: Componentes acessíveis e sem estilo
  - Dialog
  - Dropdown Menu
  - Navigation Menu
  - Scroll Area
  - Separator
  - Tooltip
- **Icons**: 
  - [Lucide React](https://lucide.dev/) 0.562.0
  - [React Icons](https://react-icons.github.io/react-icons/) 5.5.0
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) 2.0.7
- **Styling Utilities**:
  - [clsx](https://github.com/lukeed/clsx) 2.1.1
  - [tailwind-merge](https://github.com/dcastil/tailwind-merge) 3.4.0
  - [class-variance-authority](https://github.com/joe-bell/cva) 0.7.1

### State Management

- **Zustand** 5.0.9: Gerenciamento de estado global

### Build Tools

- **TypeScript**: Type checking
- **ESLint**: Linting com configuração Next.js
- **PostCSS**: Processamento de CSS
- **Babel**: Compilação com React Compiler

## Estrutura do Projeto

```
treenshoter-lp/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # Página Sobre
│   │   ├── download/          # Página Download
│   │   ├── layout.tsx         # Layout raiz
│   │   ├── page.tsx           # Página inicial
│   │   ├── globals.css        # Estilos globais
│   │   ├── opengraph-image.tsx # Geração de OG image
│   │   ├── robots.ts          # robots.txt
│   │   └── sitemap.ts         # Sitemap XML
│   ├── assets/                # Assets estáticos
│   │   ├── screenshots/       # Screenshots do app
│   │   ├── library.tsx        # Componente de preview
│   │   ├── overlay.tsx        # Componente de preview
│   │   ├── preview.tsx         # Componente de preview
│   │   └── opengraph.png      # Imagem OG
│   ├── components/            # Componentes React
│   │   ├── sections/          # Seções da página
│   │   │   ├── hero.tsx      # Hero section
│   │   │   ├── features.tsx  # Features section
│   │   │   ├── screenshots.tsx # Screenshots section
│   │   │   └── download.tsx  # Download section
│   │   ├── ui/               # Componentes UI reutilizáveis
│   │   ├── header.tsx        # Cabeçalho
│   │   ├── footer.tsx        # Rodapé
│   │   ├── language-changer.tsx # Seletor de idioma
│   │   └── toggle-theme.tsx  # Toggle de tema
│   ├── constants/            # Constantes
│   │   ├── downloads.ts      # Links de download
│   │   ├── feature.ts        # Features do app
│   │   ├── locale.ts         # Configuração de idiomas
│   │   ├── menu.ts           # Itens do menu
│   │   ├── seo.ts            # Configuração SEO
│   │   └── technologies.ts   # Lista de tecnologias
│   ├── context/              # Contextos React
│   │   └── theme.tsx         # Contexto de tema
│   ├── hooks/                # Custom hooks
│   │   └── use-image-zoom.ts # Hook para zoom de imagem
│   ├── i18n/                 # Internacionalização
│   │   ├── get-locale.ts     # Utilitários de locale
│   │   └── request.ts        # Request helpers
│   └── lib/                  # Utilitários
│       └── utils.ts          # Funções utilitárias
├── messages/                 # Arquivos de tradução
│   ├── en.json              # Inglês
│   └── pt.json              # Português
├── components.json          # Configuração shadcn/ui
├── next.config.ts           # Configuração Next.js
├── tsconfig.json            # Configuração TypeScript
├── postcss.config.mjs       # Configuração PostCSS
└── eslint.config.mjs        # Configuração ESLint
```

## Instalação e Desenvolvimento

### Pré-requisitos

- **Node.js**: v18 ou superior
- **pnpm**: Gerenciador de pacotes (instale com `npm install -g pnpm`)

### Instalar Dependências

```bash
pnpm install
```

### Desenvolvimento

Inicie o servidor de desenvolvimento com hot reload:

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

### Build

Crie uma build de produção:

```bash
pnpm build
```

### Iniciar Produção

Após o build, inicie o servidor de produção:

```bash
pnpm start
```

### Linting

Execute o ESLint:

```bash
pnpm lint
```

## Internacionalização

A landing page suporta dois idiomas:

- **Português (pt)**: Idioma padrão
- **Inglês (en)**

As traduções estão localizadas em `messages/pt.json` e `messages/en.json`. O idioma é detectado automaticamente baseado nas preferências do navegador ou pode ser alterado manualmente através do seletor de idioma no header.

### Estrutura de Tradução

```json
{
  "metadata": {
    "title": "...",
    "description": "..."
  },
  "hero": {
    "title": "...",
    "subtitle": "..."
  },
  "features": {
    "title": "..."
  }
}
```

## SEO e Metadata

A landing page está otimizada para SEO com:

- **Metadata dinâmica**: Títulos e descrições por página e idioma
- **Open Graph**: Tags completas para compartilhamento em redes sociais
- **Twitter Cards**: Suporte para cards do Twitter
- **Sitemap**: Geração automática de sitemap.xml
- **Robots.txt**: Configuração para crawlers
- **Canonical URLs**: URLs canônicas para cada página
- **Alternate Languages**: Links para versões em outros idiomas

### Configuração SEO

As configurações SEO estão em `src/constants/seo.ts`:

```typescript
export const SEO_CONFIG: Record<string, Record<Locale, SEOConfig>> = {
  home: { pt: {...}, en: {...} },
  about: { pt: {...}, en: {...} },
  download: { pt: {...}, en: {...} },
}
```

## Tema

A landing page suporta tema claro e escuro com detecção automática das preferências do sistema. O tema é gerenciado através do `next-themes` e pode ser alternado através do botão no header.

## Componentes UI

Os componentes UI são baseados em Radix UI e seguem o padrão do shadcn/ui:

- **Acessibilidade**: Componentes totalmente acessíveis
- **Customizáveis**: Estilizados com Tailwind CSS
- **Type-safe**: Totalmente tipados com TypeScript

## Estrutura de Páginas

### Home (`/`)

- Hero section com call-to-action
- Seção de features
- Galeria de screenshots
- Seção de download

### Sobre (`/about`)

- Descrição do projeto
- Lista de tecnologias utilizadas
- Informações sobre o desenvolvedor

### Download (`/download`)

- Cards de download para cada plataforma
- Instruções de instalação
- Links diretos para downloads

## Deploy

### Vercel (Recomendado)

A forma mais fácil de fazer deploy é usando a [Vercel Platform](https://vercel.com):

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push

### Outras Plataformas

A landing page pode ser deployada em qualquer plataforma que suporte Next.js:

- **Netlify**: Suporte nativo para Next.js
- **Railway**: Deploy simples com Docker
- **Self-hosted**: Build e execute com `pnpm build && pnpm start`

## Scripts Disponíveis

- `pnpm dev`: Inicia servidor de desenvolvimento
- `pnpm build`: Cria build de produção
- `pnpm start`: Inicia servidor de produção
- `pnpm lint`: Executa ESLint

## Contribuindo

Este projeto segue padrões específicos de código e convenções. Ao contribuir:

1. Siga as convenções de código existentes
2. Mantenha os componentes acessíveis
3. Adicione traduções para ambos os idiomas
4. Teste em diferentes tamanhos de tela
5. Verifique o SEO e metadata

## Licença

Copyright (c) 2024 pedroaba. All Rights Reserved.

Este software é proprietário e confidencial. Nenhuma parte deste software pode ser copiada, reproduzida, distribuída, modificada ou usada de qualquer forma sem a permissão prévia por escrito do detentor dos direitos autorais.

## Autor

pedroaba <pedr.augustobarbosa.aparecido@gmail.com>

---

**Versão**: 0.1.0
