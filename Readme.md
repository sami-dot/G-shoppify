<h1 align="center">Practical Assessment for DevOps Engineers</h1>

<!-- TABLE OF CONTENTS -->

## Table of Contents

-   [Assessment Overview](#assessment-overview)
-   [Assessment Tasks](#assessment-tasks)
-   [Submission Guidelines](#submission-guidelines)
-   [Evaluation Criteria](#evaluation-criteria)

<!-- ASSESSMENT OVERVIEW -->

## Assessment Overview

- **Duration:** 20 days.
- **Objective:** Simulate a real-world DevOps project by setting up and managing a Kubernetes-based deployment pipeline with monitoring and CI/CD.
- **Submission:** Submit all deliverables via a GitHub/GitLab repository link.
<!-- ASSESSMENT TASKS -->

## Assessment Tasks

### 1. Kubernetes Cluster Setup
**Deliverable:** A functioning Kubernetes cluster with 1 master node and 3 worker nodes.
- Create the cluster using Kind on your local machine.
- Define the cluster configuration in a YAML file.
- Verify cluster functionality.
- Ensure cluster accessibility and readiness for deployments.

### 2. Install Tools Using Helm Charts
**Deliverable:** A fully configured Kubernetes cluster with the following tools installed using Helm:
1. ArgoCD: For GitOps-based deployment.
2. Prometheus: For monitoring application and infrastructure metrics.
3. Grafana: For visualizing collected metrics.
4. Database:
   - Setup MongoDB (or create your own Helm chart).
   - Ensure persistent storage is configured for the database.

### 3. Deploy Applications
**Deliverable:** A deployed application stack (frontend, backend, and database) on the Kubernetes cluster.
- Deploy:
  - Frontend
  - Backend
  - Database
- Verify deployments.

### 4. Duplicate Backend Application (Bonus)
**Deliverable:** A duplicate backend deployment in a separate namespace.
- Create a new namespace.
- Deploy a duplicate instance of the backend application within this namespace.

### 5. Configure ArgoCD for Deployment
**Deliverable:** An automated deployment pipeline using ArgoCD.
- Configure ArgoCD to deploy your applications (frontend, backend, and database) directly from your Git repository.

### 6. Monitor Applications Using Prometheus and Grafana
**Deliverable:** Functional monitoring dashboards for the application.
- Use Prometheus to collect:
  - Application-level metrics (e.g., response times, errors).
  - Infrastructure metrics (e.g., CPU, memory usage).
- Use Grafana to create dashboards visualizing these metrics.
- Verify metrics collection and visualization.

<!-- SUBMISSION GUIDELINES -->

## Submission Guidelines

### 1. Create a Detailed Document
- Include explanations and steps for each task (Tasks 1–6).
- Attach the following:
  - YAML files (e.g., cluster configuration).
  - Helm values files (e.g., MongoDB configuration).
  - CI/CD pipelines or scripts used.
- Provide detailed instructions to replicate your setup.

### 2. Include Screenshots and Configurations
- Add screenshots for each task, such as:
  - `kubectl get nodes` (cluster setup).
  - Tool installations (e.g., ArgoCD, Prometheus).
  - Deployed application status (`kubectl get pods`, `kubectl get svc`).
  - ArgoCD deployment view.
  - Grafana dashboards showing collected metrics.

### 3. Submit
- If using GitHub, share a repository link containing:
  - All configurations, YAML files, and CI/CD pipelines.
  - A detailed README.md file with replication instructions.

<!-- EVALUATION CRITERIA -->

## Evaluation Criteria

1. **Cluster Setup:**
   - Proper configuration and functionality of the Kubernetes cluster.
2. **Tool Configuration:**
   - Correct installation and setup of ArgoCD, Prometheus, Grafana, and the database.
3. **Application Deployment:**
   - Successful deployment of the frontend, backend, and database with persistent storage.
4. **CI/CD Integration:**
   - Jenkins for CI and Functional ArgoCD pipeline for application deployment.
5. **Monitoring:**
   - Effective collection and visualization of metrics with Prometheus and Grafana.
6. **Documentation:**
   - Clarity, completeness, and replicability of the submitted document.
