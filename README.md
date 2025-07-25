# Federated Learning Clinical Safety Dashboard Client

[![Tests](https://github.com/AlexDobsonPleming/federated-learning-clinical-safety-client/actions/workflows/npm_test.yml/badge.svg)](https://github.com/AlexDobsonPleming/federated-learning-clinical-safety-client/actions/workflows/npm_test.yml)

[![DOI](https://zenodo.org/badge/975458903.svg)](https://doi.org/10.5281/zenodo.15521146)

This is the React front-end for the Federated Learning Clinical Safety Server, built with Next.js and Mantine UI.

A [demo site](https://federated-learning-clinical-safety-client.vercel.app/) is provided.

---

## Prerequisites

A server running as described in the [dashboard server repository](https://github.com/AlexDobsonPleming/federated-learning-clinical-safety-server).

Before you begin, ensure you have installed:

- Node.js> = 16.8.0
- yarn

---

## Setup & Installation

1. Clone the client repository:

   ```bash
   git clone git@github.com:AlexDobsonPleming/federated-learning-clinical-safety-client.git
   cd federated-learning-client
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

A sample env file has been provided to match the default settings in the Django backend

```bash
cp .env.example .env.local
```

Alternatively environment variables can be set with bash.

#### NEXT_PUBLIC_API_BASE_URL

```bash
export NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

Adjust the URL to match your backend deployment.

#### NEXT_PUBLIC_SKIP_NGROK

```bash
export NEXT_PUBLIC_SKIP_NGROK=http://localhost:8000/api
```

This enables skipping the ngrok gateways for pre-flight. Ngrok is necessary for tunneling into vht-dev with https.

#### Demo environment variables

```bash
export NEXT_PUBLIC_DEMO_MODE=true
```

Enable demo mode.

```bash
export NEXT_PUBLIC_DEMO_USERNAME=demo
```

Set a default username for demo purposes.

```bash
export NEXT_PUBLIC_DEMO_PASSWORD=demo123
```

Set a default password for demo purposes

---

## Running the Client

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The client will communicate with the backend via the `NEXT_PUBLIC_API_BASE_URL` (customise this for your production server).

---

## npm Scripts

### Development & Build

- `dev` — start the Next.js dev server
- `build` — build the application for production
- `start` — run the production build
- `analyze` — analyze bundle size with @next/bundle-analyzer

### Testing & Quality

- `typecheck` — run TypeScript type checking
- `lint` — run ESLint
- `prettier:check` — check formatting with Prettier
- `prettier:write` — format files with Prettier
- `jest` — run Jest tests
- `jest:watch` — run Jest in watch mode
- `test` — run `jest`, `lint`, and `typecheck` sequentially

### Storybook

- `storybook` — start Storybook dev server
- `storybook:build` — build Storybook static files to `storybook-static`

---
