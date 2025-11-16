# VSCodium Website

A modern, privacy-focused, fully open-source web platform built with Next.js to present the VSCodium editor, documentation, and installation resources. This repository powers <https://www.vscodium.com>, delivering a fast, accessible, and telemetry-free user experience aligned with the VSCodium project's values.

## Overview

The site showcases essential information about VSCodium, including multi-platform installation guides, documentation, architectural details, community links, and feature highlights. The project emphasizes performance, maintainability, and a clean design system.

## Tech Stack

- Framework: Next.js 15
- Language: TypeScript
- Styling: Tailwind CSS, Radix UI components
- Forms & Validation: React Hook Form, Zod
- Markdown Rendering: Remark (+ plugins: GFM, TOC, HTML)
- Animations & Interactions: Radix primitives, Embla Carousel
- Charts & Visuals: Recharts
- Build & Linting: XO, ESLint, TypeScript
- Git Automation: Husky, Commitizen, Commitlint, Lint-Staged

## Features

- High-performance static and hybrid rendering with Next.js
- Fully accessible UI components using Radix primitives
- Comprehensive installation matrix for Linux, Windows, and macOS
- Clean typography optimized for documentation
- Dark/Light mode with system theme support
- SEO-friendly metadata and structured layout
- Fully MIT-licensed with no telemetry or tracking
- Open VSX Registry extension ecosystem integration
- Multi-architecture builds displayed (x64, ARM, RISC-V, PPC64, Loong64…)

## Getting Started

Prerequisites

- Node.js ≥ 18
- pnpm, npm, or yarn
- Git

Installation

```bash
git clone https://github.com/VSCodium/vscodium.github.io.git
cd vscodium.github.io
npm install
```

Development

```bash
npm run dev
```

Starts the development server on <http://localhost:3000>.

Production Build

```bash
npm run build
npm start
```

Creates an optimized production build and serves it.

Linting

```bash
npm run lint
```

Commit Workflow

```bash
npm run commit
```

Uses Commitizen to standardize commit messages.

## Project Structure

/
├─ public/            Static assets and images  
├─ app/               Next.js App Router pages and layouts  
├─ components/        UI components, Radix wrappers, utilities  
├─ styles/            Global styles and Tailwind configuration  
├─ lib/               Utilities and shared logic  
├─ content/           Markdown and documentation files  
└─ scripts/           Build and configuration scripts

## Scripts

- dev — Starts Next.js development server
- build — Creates the production build
- start — Runs the production server
- lint — Runs XO / ESLint linting
- commit — Commitizen workflow for standardized commits
- prepare — Husky setup and formatting

## Contributing

Contributions are welcome. Before submitting a pull request:

- Follow the existing coding style
- Use standardized commit messages (Commitizen + Commitlint)
- Ensure linting passes
- Provide meaningful descriptions in pull requests

Report issues and feature requests via the repository's issue tracker on GitHub.

## License

This project is licensed under the MIT License.

## Community & Resources

- GitHub Repository
- Issue Tracker
- Documentation
- Insiders Builds
- Open VSX Registry
