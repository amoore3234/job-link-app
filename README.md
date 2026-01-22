# Job Link Application
This repo houses all the services to run the Job Link Application.

# Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequistes)
- [Job Link Web Application](#job-link-web-application)
  - [Running Tests in the Job Link app](#running-tests-in-the-job-link-app)
  - [Resolving Dependecy Issues](#resolving-dependency-issues)
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
- [NodeJS](https://nodejs.org/en/download)
- **For Windows (WSL):**
  - [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install)
  - [Ubuntu](https://documentation.ubuntu.com/wsl/latest/howto/install-ubuntu-wsl2/)
    - **Note:** If there is an issue starting the docker engine, you may need to add the user to the docker group. you can run this command:
      - `sudo usermod -aG docker $USER`
# Installation
## NodeJs installation for macOS version 11 or less
The Job Link application is currently configured to support macOS with versions 11 or lower. To run the application locally successully, install node using version v20.19.6 or v18.20.8 and Vite version 4(vite@4).

# Job Link Web Application
The web application is currently a work-in-progress. You can refer to the [tech design](https://github.com/amoore3234/Project-Wiki/blob/main/Feature/Job-Link.md) to learn more about how users will interact with the web components. Once the application is in a complete state, this section will cover any gaps about the application that weren't addressed in the application's Readme or tech design.

## Running Tests in the Job Link app
To run the tests, navigate to the job-link directory and use the commands provided to execute the test cases.
  - `npm run test`
  - `npm run test:ui` (To run tests using the browser)

## Resolving Dependecy Issues
If you run into any library issues when running the tests or the application, you can use this command, `rm -rf node_modules package-lock.json` to remove the node_modules and package-lock files and then reinstall the dependencies with the `npm install` or `npm i` command.

# Installation and Configuration Steps for the Job Board API
 - Ensure a virtural environment is configured in the job-board-api-service directory, so you can Docker can run the application properly. You refer to the [Job Board API Readme](https://github.com/amoore3234/job-board-api?tab=readme-ov-file#installation) for more details.

 # Installation and Configuration Steps for the Job Portal Service
 - You can navigate to the job-portal-service-app directory to ensure the required dependencies are installed successfully. For more details, you can refer to the [Job Portal Service Readme](https://github.com/amoore3234/job-portal-service?tab=readme-ov-file#installation) to ensure the service is properly configured.

 # Dev Links
 - [Job Link Swagger UI](http://localhost:8082/swagger-ui/index.html#/)
 - [Job Link Keycloak Admin](http://localhost:8080/)
 - [Job Link React UI](http://localhost:5137/)
