# A Consultant Website

Modern, professional business website built with React, TypeScript, and Vite.

## Features

- 🎨 Modern UI with shadcn/ui components
- 📱 Fully responsive design
- 🚀 Fast development with Vite + HMR
- 💼 Professional business sections
- 📝 Contact form (ready for backend integration)
- ⚡ TypeScript for type safety

## Quick Start

1. Install dependencies: `npm install`

2. Start development server: `npm run dev`**Features:**

3. Open `http://localhost:5173` in your browser- ✅ No OAuth token issues

- ✅ No "Invalid grant" errors

## Scripts- ✅ Fully self-hosted

- ✅ Rate limiting & security

- `npm run dev` - Start development server- ✅ Beautiful HTML emails

- `npm run build` - Build for production

- `npm run preview` - Preview production build---

- `npm run lint` - Run ESLint

Currently, two official plugins are available:

## Tech Stack

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- **Frontend**: React 19, TypeScript, Tailwind CSS- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **UI Components**: shadcn/ui

- **Build Tool**: Vite
- **Deployment**: Ready for Vercel or any static hosting

## React Compiler

## Expanding the ESLint configuration

```

src/If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

├── components/        # Reusable UI components

├── pages/            # Page components```js

├── lib/              # Utility functionsexport default defineConfig([

└── assets/           # Static assets  globalIgnores(['dist']),

```  {

    files: ['**/*.{ts,tsx}'],

## Contact Form    extends: [

      // Other configs...

The contact form is ready for backend integration. Currently displays a success message and logs form data to the console.

      // Remove tseslint.configs.recommended and replace with this

## Development      tseslint.configs.recommendedTypeChecked,

      // Alternatively, use this for stricter rules

This project uses modern React development practices:      tseslint.configs.strictTypeChecked,

- React 19 with TypeScript      // Optionally, add this for stylistic rules

- Tailwind CSS for styling      tseslint.configs.stylisticTypeChecked,

- shadcn/ui for consistent components

- Vite for fast development and building      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
