# Simple Form with Image Upload and AWS Integration

This project is a simple web application where users can input form data and upload an image. The form data, including the image URL, is stored in AWS RDS (MySQL), while the image itself is stored in an AWS S3 bucket. The user can access the data via the application. The project is built using **React**, **Vite**, and **Node.js**, with deployment on an **EC2 instance**.

## Features

- A simple form for collecting input values (e.g., name, description, etc.).
- File upload feature to upload an image.
- Image stored in AWS S3.
- Metadata (including the image URL) stored in AWS RDS (MySQL).
- REST API to interact with the database and S3 bucket.
- Deployed on an EC2 instance for production.

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js
- **Database**: AWS RDS (MySQL)
- **File Storage**: AWS S3
- **Cloud Deployment**: AWS EC2

## Prerequisites

Before running the project, make sure you have the following:

- Node.js and npm installed on your local machine.
- AWS account with access to RDS and S3.
- Access keys for AWS services (S3, RDS).
- EC2 instance running for deployment.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ketan-Chaudhary/S3FormUploader.git
```


2. Install Dependencies
Client (React + Vite)
Navigate to the client folder and install the necessary dependencies:
```bash
cd client
npm install
```
Server (Node.js)
Navigate to the server folder and install the necessary dependencies:
```bash
cd server
npm install
```

3. Configure Server Environment Variables
Create a .env file in the server folder and add your MySQL and AWS credentials.

Server (server/.env)
env
```bash
MYSQL_HOST=your-rds-endpoint
MYSQL_USER=your-database-username
MYSQL_PASSWORD=your-database-password
MYSQL_DATABASE=your-database-name
MYSQL_PORT=3306  # Default MySQL port

AWS_ACCESS_KEY=your-aws-access-key-id
AWS_SECRET_KEY=your-aws-secret-access-key
AWS_REGION=your-aws-region
AWS_S3_BUCKET_NAME=your-s3-bucket-name
```
