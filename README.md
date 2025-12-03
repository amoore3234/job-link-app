# Job Link Application
This repo houses all the services to run the Job Link Application.

# Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequistes)
- [Job Link Web Application](#job-link-web-application)
- [Installation and Configuration Steps for the Job Board API](#installation-and-configuration-steps-for-the-job-board-api)
- [Installation and Configuration Steps for the Job Portal Service](#installation-and-configuration-steps-for-the-job-portal-service)
- [Dev Links](#dev-links)

# Introduction
Job Link is a job board application where users can upload their resumes and search job roles based on the information presented in the uploaded document. This project contains backend services including a Java application (job-portal-service) and a Python application (job-board-api) that interacts with job listings from Dice and returns the data to the web app interface. To learn more about the feature, feel free to read through the [Job Link tech design](https://github.com/amoore3234/Project-Wiki/blob/main/Feature/Job-Link.md).

# Features
- **Job Board API:** An API built with with Python 3.14+ and contains the CRUD operations for interacting job listings from Dice.
- **Job Portal Service:** A service that introduces login functionality for user authentication and authorization. The service also contains logic for interacting with the Job Board API as a client and fetch job board data.
- **Keycloak Inegration:** The application utilizes Keycloak's features for implementing client credentials for secured requests between clients.

# Prerequistes
- [Python 3.14](https://www.python.org/downloads/)
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)
- **For Windows (WSL):**
  - [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install)
  - [Ubuntu](https://documentation.ubuntu.com/wsl/latest/howto/install-ubuntu-wsl2/)
    - **Note:** If there is an issue starting the docker engine, you may need to add the user to the docker group. you can run this command:
      - `sudo usermod -aG docker $USER`

# Job Link Web Application
The web application is currently a work-in-progress. You can refer to the [tech design](https://github.com/amoore3234/Project-Wiki/blob/main/Feature/Job-Link.md) to learn more about how users will interact with the web components. Once the application is in a complete state, this section will cover any gaps about the application that weren't addressed in the application's Readme or tech design.

# Installation and Configuration Steps for the Job Board API
 - Ensure a virtural environment is configured in the job-board-api-service directory, so you can Docker can run the application properly. You refer to the [Job Board API Readme](https://github.com/amoore3234/job-board-api?tab=readme-ov-file#installation) for more details.

 # Installation and Configuration Steps for the Job Portal Service
 - You can navigate to the job-portal-service-app directory to ensure the required dependencies are installed successfully. For more details, you can refer to the [Job Portal Service Readme](https://github.com/amoore3234/job-portal-service?tab=readme-ov-file#installation) to ensure the service is properly configured.

 # Dev Links
 - [Job Link Swagger UI](http://localhost:8082/swagger-ui/index.html#/)
 - [Job Link Keycloak Admin](http://localhost:8080/)
