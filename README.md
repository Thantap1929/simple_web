# CI/CD Testing Project

This project is designed to test and practice Continuous Integration and Continuous Deployment (CI/CD) by building and deploying a simple web application.

## Project Overview

The objective of this project is to:

1. **Create a Simple Web Application**: Develop a basic web application for testing CI/CD processes.
2. **Implement CI/CD Pipeline**: Automate the build and deployment of the application using Docker and a CI/CD tool.

## Docker Compose Setup

The project uses Docker Compose to manage the following services:

- **MySQL Database (`db`)**:
  - **Image**: `mysql:5.7`
  - **Container Name**: `webmanager_db`
  - **Ports**: `3306:3306`
  - **Environment Variables**:
    - `MYSQL_DATABASE`: `Devops`
    - `MYSQL_ROOT_PASSWORD`: `root`
  - **Volumes**: `DB:/var/lib/mysql`

- **phpMyAdmin (`phpmyadmin`)**:
  - **Image**: `phpmyadmin`
  - **Container Name**: `webmanager_phpmyadmin`
  - **Ports**: `3333:80`
  - **Environment Variables**:
    - `PMA_HOST`: `db`
    - `MYSQL_ROOT_PASSWORD`: `root`
  - **Depends On**: `db`

- **Node.js Application (`node_test`)**:
  - **Container Name**: `webmanager_node`
  - **Ports**: `3000:3000`
  - **Build Context**: `./api`
  - **Depends On**: `phpmyadmin`

- **Nginx (`nginx`)**:
  - **Container Name**: `webmanager_nginx`
  - **Ports**: `80:80`
  - **Build Context**: `./homepage`
  - **Depends On**: `phpmyadmin`

### Volumes

- **DB Volume**: `DB`

## CI/CD Pipeline

The CI/CD pipeline automates the building and deployment of the application. It includes the following stages:

### 1. Build Image

- **Stage**: `build_image`
- **Image**: `docker:latest`
- **Services**: `docker:dind`
- **Script**:
  ```bash
  docker-compose up -d

Tags: test1-runner
Only: Runs on the dev branch

### 2. Import Database
- **Stage**: import_db
- **Image**: docker:latest
- **Services**: docker:dind
- **Script**:
    ```bash
    docker cp backup.sql webmanager_db:/backup.sql
    docker exec -i webmanager_db ls
    docker exec -i webmanager_db bash -c "mysql -u root -proot Devops < /backup.sql"

### Getting Started
- **Clone the Repository**:
    ```bash
    git clone <repository_url>

- **Navigate to the Project Directory**:
    ```bash
    cd <project_directory>

- **Build and Run Docker Containers**:
    ```bash
    docker-compose up --build
- **Access the Services**:
Web Application: http://localhost
phpMyAdmin: http://localhost:3333

## Set Up CI/CD
- Ensure your CI/CD tool is configured with the provided pipeline script and a runner with the tag test1-runner is available.
- Trigger the pipeline for the dev branch to test the build and import stages.

## Contributing
Feel free to open issues or submit pull requests if you find any bugs or have suggestions for improvements.
