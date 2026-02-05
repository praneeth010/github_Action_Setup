# Production CI/CD Playground

A Node.js and TypeScript project demonstrating a professional CI/CD pipeline using GitHub Actions, Google Container Registry (GCR), and Google Cloud Run.

## 🚀 Overview

This project is built to showcase a robust deployment workflow, implementing separate environments for Development and Production, automated image builds, and seamless deployment to Google Cloud Run.

## 🛠 Tech Stack

- **Runtime**: Node.js (v18)
- **Language**: TypeScript
- **Framework**: Express.js
- **Containerization**: Docker
- **Cloud Platform**: Google Cloud (Cloud Run, GCR)
- **CI/CD**: GitHub Actions

---

## 🏗 Deployment Architecture

The deployment follows a standard branching strategy mapped to specific environments.

### Environments

| Environment | Branch | Trigger | Target Service | Deployed URL |
| :--- | :--- | :--- | :--- | :--- |
| **Development** | `dev` | Push to `dev` | `backend-service` | [dev-url](https://backend-service-prod-48773062165.asia-south1.run.app) |
| **Production** | `main` | Push to `main` | `backend-service-prod` | [prod-url](https://backend-service-prod-48773062165.asia-south1.run.app) |

### CI/CD Pipelines

The project uses three main workflows located in `.github/workflows/`:

1.  **[Build & Deploy to Dev](.github/workflows/dev-deploy.yml)**:
    - Triggered on pushes to the `dev` branch.
    - Builds a Docker image.
    - Pushes the image to GCR with the Git SHA as the tag.
    - Deploys the image to the Development Cloud Run service.

2.  **[Build & Deploy to Production](.github/workflows/prod-deploy.yml)**:
    - Triggered on pushes to the `main` branch.
    - Builds a Docker image.
    - Pushes the image to GCR with both the Git SHA and `latest` tags.
    - Deploys the image to the Production Cloud Run service.

3.  **[PR Check](.github/workflows/pr-check.yml)**:
    - Triggered on pull requests to `main` and `dev`.
    - Ensures the code builds correctly before merging.

---

## 🔌 API Documentation

All endpoints are prefixed with `/api`.

### User CRUD Endpoints

#### `User` Model
```json
{
  "id": "string",
  "name": "string",
  "email": "string"
}
```

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | List all users | None |
| `GET` | `/api/users/:id` | Get user by ID | None |
| `POST` | `/api/users` | Create new user | `{ "id": "...", "name": "...", "email": "..." }` |
| `DELETE` | `/api/users/:id` | Delete user | None |

---

## 🔑 Required GitHub Secrets

To make the pipelines work, the following secrets must be configured in your GitHub Repository settings:

- `PROJECT_ID`: Your Google Cloud Project ID.
- `REGION`: The GCP region for deployment (e.g., `us-central1`).
- `GCP_SA_KEY`: The JSON key for a Google Cloud Service Account with permissions for:
    - Storage Admin (for GCR)
    - Cloud Run Admin
    - Service Account User

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js v18+
- Docker (optional, for local container testing)

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```

### Build & Rundist
```bash
npm run build
npm start
```

---

## 🐳 Dockerization

The project includes a multi-stage `Dockerfile` to ensure small, secure, and efficient production images.

- **Build Stage**: Compiles TypeScript to JavaScript.
- **Production Stage**: Installs only production dependencies and runs the compiled code.

---

## 🛡 Security

- Uses `helmet` for basic security headers.
- Uses `morgan` for request logging.
- `service_account.json` should **never** be committed to version control in a real project (use it securely through GitHub secrets).
