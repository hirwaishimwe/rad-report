# Rad-report (Radiology Report)

## Description

This is a web application for doctors to use to track patient information.

One of the tools used by doctors to assess the condition of patients with COVID-19 is an X-ray, which creates an image of the patient’s organs and structures within their body. This can help visualize infections such as pneumonia within a patient’s lungs. After performing an x-ray, doctors need a way to record information about what they discovered, so that they can look back at it.

The purpose of this project is to create a web application that allows doctors to Create, Read, Update, and Delete (CRUD) structured radiology reports as an assessment of X-ray images for exams of patients with COVID-19.

## Features

- View all the exams in the exam or admin page
- Create an exam with detailed description of the patient and images
- Edit or Delete exisiting Exams in the admin page
- Search for specific exams by patient ID

## Installation

1. Clone the Repository

```bash
   git clone https://github.com/hirwaishimwe/rad-report/
```

2. Change into the client folder, install frontend dependencies, and start the frontend

```bash
   cd client/
   npm i
   npm start
```

3. Open another terminal window, change into the api folder, install backend dependencies, and start the backend server

```bash
   cd api/
   npm i
   npm run dev
```

## Configuration

Before running the application, you need to set up some configuration variables:

- Create a .env file in the api directory and specify the required environment variables like database connection details and other settings.

```plaintext
MONGO_URI=mongodb+srv://rad:123@radreportapp.ksdi4qw.mongodb.net/?retryWrites=true&w=majority
DB_Message=Connected to MongoDB
FRONTEND_URL=http://localhost:3000
PORT=8000
NODE_ENV=DEVELOPMENT
```

## Contact

If you have any questions or need support, feel free to reach out to one of the developers.

- Dimitri Legaspi | dimitri.legaspi@gmail.com
- Hirwa Ishimwe | hirwaishimwe2@gmail.com
- Christopher Alphonse | christopheralphonse96@gmail.com
- Derinell Rojas | droja@bu.edu
- Rifflene Altidor |
- Jerison Feliz | jerisondev@gmail.com
