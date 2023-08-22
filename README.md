# Music Generation Model

## Getting Started

### Setting Up the Environment

1. Clone the repository:

   ```sh
   ssh git@github.com:ZEE-5/background_score.git
   cd background_score
   ```

2. Install dependencies using `pip`:

   ```sh
   pip install -r requirements.txt
   ```

### Running the Application Locally

To run the FastAPI application locally:

1. Make sure you're in the project directory.

2. Run the following command:

   ```sh
   uvicorn app:app --host 0.0.0.0 --port 8080
   ```

   This will start the application on `http://localhost:8080`.

### Docker


   ```sh
   docker build -t background_score_app .
   docker run -p 8000:8000 background_score_app
   ```

   This will start the application on `http://localhost:8080`.

## Deployment

### Deploying to Kubernetes

To automatically deploy the application to Kubernetes using GitHub Actions:

1. Push your changes to the `main` branch.

2. GitHub Actions will trigger the deployment workflow defined in `.github/workflows/...`.

3. The workflow will build a Docker image, push it to a container registry, and deploy the application.
