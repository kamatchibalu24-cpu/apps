# Insurance API

Simple Node.js/Express insurance API suitable for deploying to Azure Web App.

Quick start

1. Install dependencies

```bash
cd insurance-api
npm install
```

2. Run locally

```bash
npm start
# or for dev
npm run dev
```

3. Build and run in Docker

```bash
docker build -t insurance-api:latest .
docker run -p 3000:3000 insurance-api:latest
```

Security & CI

- A GitHub Actions workflow runs CodeQL analysis and `npm audit` on push to `main`.
- To deploy, add the following repository secrets: `AZURE_WEBAPP_NAME` and `AZURE_WEBAPP_PUBLISH_PROFILE` (publish profile XML from the Azure portal).

Deploy infra with Azure CLI & Bicep

```bash
# create or select resource group
az group create -n my-rg -l westeurope
# deploy the bicep (modify parameters as needed)
az deployment group create -g my-rg --template-file infra/main.bicep --parameters webAppName=insurance-api-webapp
```

Local vulnerability scan

```bash
npm audit
```

Notes

- For Snyk scans, install Snyk and run `snyk test` (requires Snyk account/token).
- CI deploy uses Azure Web App publish profile; for container-based deployment consider pushing images to ACR and using container settings.
