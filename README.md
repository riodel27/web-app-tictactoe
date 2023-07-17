# <img src="nextjs-logo.ico" alt="Next.js Logo" width="30px" align="center"> Tic Tac Toe

This template serves as a starting point for Next.js projects. It is bootstrapped with [`create-next-app`](https://nextjs.org/docs/api-reference/create-next-app) using the latest Next.js version 13 to provide a solid foundation for building modern web applications with Next.js.

## Table of Contents

- [Features](#features)
- [Roadmap](#roadmap)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

The template includes the following setup and configurations:

- [Husky](https://typicode.github.io/husky/#/) for Git hooks
- [Lint-staged](https://github.com/okonet/lint-staged) for running linters on staged files
- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for JavaScript and TypeScript linting
- [Jest](https://jestjs.io/) for unit testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component testing
- [Cypress](https://www.cypress.io/) for end-to-end testing

Please make sure you have Docker installed and running before proceeding with the setup.

## Roadmap

Here is a roadmap for further enhancements to consider:

- [&#x2713;]
- [ ] Feature: set timer/time limit on each move.

## Getting Started

### Setup

1. Clone the repository: `git clone https://github.com/riodel27/web-app-tictactoe.git`
2. Install the dependencies: `npm install` or `yarn`
3. Ensure that you create a .env file, and you can refer to the provided .env.example file as a reference or template.
4. Start the development server: `npm run dev` or `yarn dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Scripts

- `dev` - Start the development server.
- `build` - Build the production-ready app.
- `start` - Start the app in production mode.
- `lint` - Run ESLint for code linting.
- `postinstall` - Install Husky for Git hooks.
- `type-check` - Run TypeScript type checking.
- `format` - Format the source code using Prettier.
- `test` - Run Jest tests.
- `test:watch` - Run Jest tests in watch mode.
- `cypress` - Open Cypress for end-to-end testing.
- `e2e` - Run end-to-end tests with Cypress in interactive mode.
- `e2e:headless` - Run end-to-end tests with Cypress in headless mode.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
