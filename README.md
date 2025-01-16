# Vue Node MySQL CRUD with File Upload

This project is a CRUD (Create, Read, Update, Delete) application that allows you to upload files with metadata (name, description) using a Vue.js frontend and Node.js backend with a MySQL database. The uploaded files are stored on the server and can be viewed, updated, or deleted from the frontend.

## Project Structure

- **Frontend**: Vue.js application that provides the user interface for interacting with the CRUD API.
- **Backend**: Node.js with Express API to handle CRUD operations and file uploads, connected to a MySQL database.
- **Database**: MySQL to store metadata (name, description, file path) for each uploaded file.

## Features

- Upload files with metadata (name, description).
- List all uploaded files with their name, description, and a preview image.
- Update file metadata (name, description) and replace the uploaded file.
- Delete files from the server.

## Prerequisites

Before starting, make sure you have the following software installed:

- **Node.js** (version 14 or higher) - for the backend and Vue.js development.
- **npm** (Node Package Manager) - for managing dependencies.
- **MySQL** - to store the file metadata.
- **Vue CLI** - for scaffolding the Vue.js frontend.

## Getting Started

Follow these steps to get the project up and running:

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/vue-node-mysql-crud.git
cd vue-node-mysql-crud