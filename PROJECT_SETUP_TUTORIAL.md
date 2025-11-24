# AutoPass Project Setup Tutorial

This tutorial provides detailed instructions for setting up and running the AutoPass project, which is a full-stack application for managing access passes with employee authentication and authorization.

## Project Overview

The AutoPass project consists of:
- **Backend**: Spring Boot application with JWT authentication and PostgreSQL database
- **Frontend**: React application using Vite as the build tool
- **Database**: PostgreSQL database for storing user data, passes, and access logs

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

1. **Docker and Docker Compose** (for containerized setup)
2. **Java 21** (for local backend development)
3. **Node.js 18+** (for local frontend development)
4. **Maven** (for building the backend)
5. **Git** (for cloning the repository)

## Environment Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
POSTGRES_USER=autopass
POSTGRES_PASSWORD=autopass
POSTGRES_DB=autopass
DB_PORT=5449

# Backend Configuration
BACKEND_PORT=8080

# Frontend Configuration
FRONTEND_DEV_PORT=5173
VITE_API_URL=http://localhost:8080/api

# Docker Image Tags
BRANCH=local
```

## Setup Methods

The project can be run in two ways: using Docker Compose or running services locally. Both methods are automated through VSCode tasks.

### Method 1: Docker Compose Setup (Recommended)

This method runs all services in Docker containers and is recommended for consistency across different environments.

#### Using VSCode Tasks

1. Open the project in VSCode
2. Press `Ctrl+Shift+P` to open the command palette
3. Type "Tasks: Run Task" and select it
4. Choose one of the following tasks:

**Start the entire application in Docker:**
- Task: `Start All In Docker`
- This builds and starts all services (frontend, backend, database) in Docker containers

**Start only the database:**
- Task: `Start DB (docker-compose)`
- Starts only the PostgreSQL database in a Docker container

**Stop all Docker services:**
- Task: `Stop All Docker`
- Stops all running Docker containers

#### Manual Docker Commands

Alternatively, you can use Docker Compose directly from the command line:

```bash
# Start all services in detached mode
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Start only the database
docker-compose up -d db
```

### Method 2: Local Development Setup

This method runs the backend and frontend locally while using Docker for the database. This is ideal for active development as it provides faster iteration cycles.

#### Using VSCode Tasks

1. Open the project in VSCode
2. Press `Ctrl+Shift+P` to open the command palette
3. Type "Tasks: Run Task" and select it
4. Choose from the following tasks:

**Start the complete development environment:**
- Task: `Start All Dev Servers`
- This starts the database in Docker, builds and runs the backend locally, and starts the frontend development server

**Start individual services:**
- `Start DB (docker-compose)`: Start only the database in Docker
- `Start Backend (local)`: Run the backend locally (requires building first)
- `Start Frontend (local)`: Run the frontend development server

**Stop development servers:**
- Task: `Stop All Dev Servers`
- Stops all locally running services

#### Manual Local Setup

**Backend Setup:**
1. Navigate to the `backend` directory
2. Build the project: `mvn clean install`
3. Run the application: `mvn spring-boot:run`

**Frontend Setup:**
1. Navigate to the `frontend` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## VSCode Tasks Automation

The project includes several VSCode tasks defined in `.vscode/tasks.json` for common operations:

### Available Tasks

1. **Start DB (docker-compose)**
   - Starts only the PostgreSQL database in a Docker container
   - Command: `docker-compose up -d db`

2. **Start Backend (local)**
   - Runs the backend application locally
   - Command: `java -jar target/AutoPass-0.0.1-SNAPSHOT.jar`
   - Requires building the project first with `mvn clean install`

3. **Start Frontend (local)**
   - Runs the frontend development server
   - Command: `npm run dev`
   - Starts on port 5173 by default

4. **Start All Dev Servers**
   - Sequentially starts DB, Backend, and Frontend
   - Uses the `dependsOn` and `dependsOrder` properties to ensure proper startup order

5. **Start All In Docker**
   - Builds and starts all services in Docker containers
   - Command: `docker-compose up --build`

6. **Stop All Docker**
   - Stops all running Docker containers
   - Command: `docker-compose down`

7. **Stop Backend (local)**
   - Stops the locally running backend process on port 8080
   - Uses PowerShell command to kill the process

8. **Stop Frontend (local)**
   - Stops the locally running frontend process on port 5173
   - Uses PowerShell command to kill the process

9. **Stop All Dev Servers**
   - Stops frontend, backend, and Docker services

### Task Dependencies

The VSCode tasks are designed with dependencies to ensure proper startup order:
- `Start All Dev Servers` depends on starting DB, then Backend, then Frontend in sequence
- `Stop All Dev Servers` stops services in reverse order to prevent errors

## Docker Compose Configuration

The project uses two Docker Compose files:

### docker-compose.yml (Production-like setup)
- Defines services for frontend, backend, and database
- Uses production Dockerfiles for building images
- Sets up a custom network for service communication

### docker-compose.override.yml (Development setup)
- Overrides the production setup for development
- Uses `Dockerfile.dev` for the frontend to enable hot reloading
- Exposes development ports
- Sets up environment variables for development

## Development Workflow

### Running in Development Mode

For active development, use the local setup approach:

1. Start the database: `Start DB (docker-compose)` task
2. Build and run the backend locally: `Start Backend (local)` task
3. Start the frontend: `Start Frontend (local)` task

This setup allows for:
- Hot reloading of frontend changes
- Spring Boot devtools for backend changes
- Direct access to logs and debugging

### Production Build

To build production-ready artifacts:

**Backend:**
```bash
cd backend
mvn clean install
```

**Frontend:**
```bash
cd frontend
npm install
npm run build
```

## Database Configuration

The project uses PostgreSQL with the following configuration:
- Database name: `autopass`
- Username: `autopass`
- Password: `autopass`
- Port: `5449` (to avoid conflicts with default PostgreSQL port)

Database initialization scripts are located in the `db-init/` directory:
- `init.sql`: Initial database schema
- `02_add_core_tables.sql`: Additional table definitions

## API Documentation

The API documentation is available in `API_DOCUMENTATION.md` in the project root.

## Troubleshooting

### Common Issues

1. **Port already in use**: Ensure no other applications are using ports 8080, 5173, or 5449
2. **Docker permission errors**: Ensure Docker is running with appropriate permissions
3. **Dependency installation failures**: Verify network connectivity and proxy settings
4. **Database connection issues**: Check that the database service is running and accessible

### Resetting the Environment

To completely reset the development environment:

1. Stop all services: `Stop All Dev Servers` or `Stop All Docker`
2. Remove Docker containers and volumes: `docker-compose down -v`
3. Clear Maven cache: `mvn dependency:purge-local-repository`
4. Clear npm cache: `npm cache clean --force`
5. Restart with desired setup method

## Additional Notes

- The project uses JWT for authentication with configurable token expiration
- CORS is configured to allow requests from the frontend origin
- The backend uses Spring Security for authentication and authorization
- The frontend uses React with Vite for fast development
- Database schema is managed using JPA with `ddl-auto=update` in development