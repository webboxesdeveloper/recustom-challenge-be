
# ReCustom Dev Challenge Backend


ReCustom User Metrics Dashboard Backend
Technologies Used
Framework: NestJS
Database: PostgreSQL
ORM: TypeORM
Description
This backend provides API endpoints for managing users, tracking activity metrics, generating PDF reports, and ensuring secure authentication. Designed to work seamlessly with a React + TypeScript frontend.

## Used stacks
- Framework: NestJS
- Language: TypeScript
- Database: PostgreSQL
- ORM: TypeORM
- PDF Generation: pdf-lib

## Getting Started
- Clone this repository.
- Install dependencies using npm install.
- Set up your environment variables.
- Start the application using npm start.

## How to run project

Run my-project with npm

```bash
  npm run install
  npm run start:dev

```
Run migrations

```bash
  npm run migration:generate (development environment)
  npm run migration:run
  npm run migration:revert

```

Run seeder 

```bash
  npm run seed:admin
  npm run seed:user

```
    
## Module

- Auth: Handles authentication and authorization logic.
- User: Manages user information and interactions.


## Features
- Email Services: Utilizes Node Mailer and SendGrid for seamless email sending functionality.
- Encryption and Decryption: Utilizing the Node.js Crypto module for secure data handling.
- Role-Based Authentication: Allows different levels of access based on user roles.
- Seeder and Migration: Streamline database management.
- Swagger: Facilitates API exploration and testing.
- Forgot Password Flow: Ensures a seamless process for password recovery.

The project utilizes a PostgreSQL database for robust data management.
## Authors

- [webboxesdeveloper](https://github.com/webboxesdeveloper)

