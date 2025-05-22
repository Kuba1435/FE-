# File Reader Application

A modern file reader application built with Angular that supports PDF and CSV file formats with editing capabilities.

## Features

- 📁 Drag and drop file upload
- 📊 CSV file viewing and editing
  - Add/remove rows
  - Edit cell values
  - Pagination support
- 📄 PDF file preview
- 📱 Responsive design
- 🐳 Docker support
- 🧪 Cypress testing
- 📦 Mobile-optimized bundling

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later
- Docker (optional)

### Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Run tests:
```bash
npm run test         # Unit tests
npm run e2e         # E2E tests
```

### Docker Deployment

1. Build the image:
```bash
docker build -t file-reader .
```

2. Run the container:
```bash
docker run -p 80:80 file-reader
```

## Mobile Support

The application is optimized for mobile devices with:
- Responsive layout
- Touch-friendly controls
- Mobile-specific UI adjustments

## Testing

End-to-end tests are implemented using Cypress. Run them with:
```bash
npm run cypress:open
```

## Project Structure

```
src/
├── app/
│   ├── home/           # Main file reader component
│   ├── shared/        # Shared components and services
│   └── models/        # TypeScript interfaces
├── assets/           # Static assets
└── styles/          # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

This project is licensed under the MIT License.

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
