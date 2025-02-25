# Vite React TypeScript Project

A modern web application built with Vite, React, TypeScript, and TailwindCSS.

## Features

- ⚡️ Lightning-fast development with Vite
- 🎯 Type safety with TypeScript
- 💅 Styling with TailwindCSS
- 📱 Responsive design
- 💳 Payment integration (PayPal & Stripe)
- 📧 Email functionality with EmailJS
- 🔄 State management with React Query
- 🛣️ Routing with React Router
- 🎨 Icons with Lucide React
- 📱 QR Code generation

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── public/           # Static assets
├── src/             # Source code
├── index.html       # Entry HTML file
├── vite.config.ts   # Vite configuration
├── tailwind.config.js # Tailwind configuration
├── postcss.config.js  # PostCSS configuration
├── tsconfig.json    # TypeScript configuration
└── package.json     # Project dependencies and scripts
```

## Dependencies

### Main Dependencies
- React 18
- React Router DOM
- React Query (TanStack Query)
- Axios
- PayPal React Components
- Stripe.js
- EmailJS
- QRCode React
- Lucide React

### Development Dependencies
- TypeScript
- Vite
- TailwindCSS
- ESLint
- PostCSS
- Autoprefixer

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## ESLint

The project uses ESLint for code quality. Run the linter:

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 



git remote add origin https://github.com/realshakataka/shakamusic.git
git branch -M main
git push -u origin main