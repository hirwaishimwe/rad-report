# Rad-report (Radiology Report)

## Overview

This is a web application for doctors to use to track patient information.

One of the tools used by doctors to assess the condition of patients with COVID-19 is an X-ray, which creates an image of the patient’s organs and structures within their body. This can help visualize infections such as pneumonia within a patient’s lungs. After performing an x-ray, doctors need a way to record information about what they discovered, so that they can look back at it.

The purpose of this project is to create a web application that allows doctors to Create, Read, Update, and Delete (CRUD) structured radiology reports as an assessment of X-ray images for exams of patients with COVID-19.

## Features

- Authentication: Secure user authentication and authorization with JWT authentication.
- Exams Overview: Access a centralized dashboard to view all patient exams.
- Exam Management: Create detailed exam entries with patient information and X-ray images.
- Edit and Delete: Easily modify or remove existing exam records from the admin page.
- Search Functionality: Quickly locate specific exams using patient ID for efficient retrieval.
- Responsive Design: Accessible on various devices, ensuring critical information is always at hand.

## Getting Started

### Authentication

This project uses JWT to ensure secure access to its resources. Below you will find the steps necessary to authenticate yourself and interact securely with our API/application.

Please note that certain actions within the application may require specific user permissions. Unauthorized users will be restricted from accessing protected routes and performing sensitive operations.

### Register

To register for an account:

1. Click on the "Register" button on the application's navigation bar.
2. Provide the required information, such as Usernae and password.
3. Submit the register form to create your account securely.

### Login

To log in to the application:

1. Click on the "Login" button on the application's navigation bar.
2. Enter your registered username and password.
3. Upon successful authentication, you will be redirected to your user dashboard.

### Prerequisites

Before installation, ensure you have Git, Node.js, and npm installed on your system.

## Configuration

To ensure the application runs smoothly, configure the necessary environment variables:

- Create a .env file in the api directory and specify the required environment variables like database connection details and other settings.
- Add the following configurations:

```plaintext
MONGO_URI=mongodb+srv://rad:123@radreportapp.ksdi4qw.mongodb.net/?retryWrites=true&w=majority
DB_Message=Connected to MongoDB
FRONTEND_URL=http://localhost:3000
PORT=8000
NODE_ENV=DEVELOPMENT
SECRET_KEY=ASK ONE OF THE DEVS
```

- Create a .env file in the client directory and specify the required environment variables like database connection details and other settings.
- Add the following configurations:

```plaintext
REACT_APP_API_URL=http://localhost:8000/api
```

### Installation

1. Clone the Repository

```bash
   git clone https://github.com/hirwaishimwe/rad-report/
```

2. Frontend Setup

- Navigate to the client directory, install dependencies, and start the frontend server.

```bash
   cd client/
   npm i
   npm start
```

3. Backend Setup

- In a new terminal window, switch to the api directory, install dependencies, and initiate the backend server.

```bash
   cd api/
   npm i
   npm run dev
```

## Support

If you have any questions or need support, feel free to reach out to one of the developers.

- Dimitri Legaspi | dimitri.legaspi@gmail.com
- Hirwa Ishimwe | hirwaishimwe2@gmail.com
- Christopher Alphonse | christopheralphonse96@gmail.com
- Derinell Rojas | droja@bu.edu
- Rifflene Altidor | raltidor@falcon.bentley.edu
- Jerison Feliz | jerisondev@gmail.com
