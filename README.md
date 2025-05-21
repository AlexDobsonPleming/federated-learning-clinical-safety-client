# 🚀 Mantine Next.js Client

This is the React front-end for the Federated Learning Clinical Safety Server, built with Next.js App Router and Mantine UI.

---

## Table of Contents

* Features
* Prerequisites
* Setup & Installation
* Environment Variables
* Running the Client
* npm Scripts
* Contributing
* License

---

## Features

* Next.js App Router
* Mantine component library
* TypeScript
* PostCSS with mantine-postcss-preset
* Storybook for UI development
* Jest with React Testing Library for unit tests
* ESLint with eslint-config-mantine

---

## Prerequisites

A server running as described in the [dashboard server repository](https://github.com/AlexDobsonPleming/federated-learning-clinical-safety-server).

Before you begin, ensure you have installed:

* Node.js> = 16.8.0
* yarn

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

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

Adjust the URL to match your backend deployment.

A sample env file has been provided to match the default settings in the Django backend

```bash
cp .env.example .env.local
```

---

## Running the Client

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The client will communicate with the backend via the `NEXT_PUBLIC_API_BASE_URL`.

---

## npm Scripts

### Development & Build

* `dev` — start the Next.js dev server
* `build` — build the application for production
* `start` — run the production build
* `analyze` — analyze bundle size with @next/bundle-analyzer

### Testing & Quality

* `typecheck` — run TypeScript type checking
* `lint` — run ESLint
* `prettier:check` — check formatting with Prettier
* `prettier:write` — format files with Prettier
* `jest` — run Jest tests
* `jest:watch` — run Jest in watch mode
* `test` — run `jest`, `lint`, and `typecheck` sequentially

### Storybook

* `storybook` — start Storybook dev server
* `storybook:build` — build Storybook static files to `storybook-static`

---
