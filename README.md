## Overview 
 
"E-Commerce-Website" is an E-Commerce web application developed using MERN stack. It designed to provide a seamless and intuitive online shopping experience for clothes.

## Features ⚙️
- <b>User Authentication:</b> Secure user registration and login using JWT authentication.
- <b>Admin Panel:</b> The platform includes comprehensive features for both users and administrators, ensuring efficient ordering and management processes.
- <b>Secure Payment:</b>  Integrated with Stripe, the platform ensures secure and swift payment processing. 
- <b>Responsive Design:</b> The application is designed to be fully responsive, ensuring a seamless experience across all devices. 

## Tech Stack 🛠️
- MongoDB Compass/MongoDB Atlas
- ExpressJS
- React
- NodeJS
- Mongoose

## How to run the project 🎮

Before running the project, ensure you have the following installed:
- Node.js (https://nodejs.org/)
- You can either install MongoDB locally in your system (https://www.mongodb.com/) or you can use cloud based MongoDB Atlas Database (https://www.mongodb.com/products/platform/atlas-database).

### 1. Clone the repository

    git clone https://github.com/coderprith/Zaalima-group7.git
    
### 2. Install all dependencies

    cd e-commerce-website
    cd backend
    npm install
    cd ../frontend
    npm install
    cd ../admin
    npm install
    
### 3. Configure evironment variables:
  1. Backend:
    create a .env file and add the following:

    PORT = 4000
    MONGODB_URI=<your-mongodb-connection-string>
    SECRET_KEY=<your-jwt-secret-key>
    STRIPE_SECRET_KEY=<your-stripe-secret-key>
    FRONTEND_URL=http://localhost:3000
    BACKEND_URL=http://localhost:4000
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-assigned-name>
    CLOUDINARY_API_KEY=<your-cloudinary-API-key>
    CLOUDINARY_SECRET_KEY=<your-secret-key>
    EMAIL_SERVICE=your_email_service

  3. Frontend:
    create a .env file and add the following:

    REACT_APP_API_URL = http://localhost:4000

  3. Admin:
    create a .env file and add the following:

    REACT_APP_API_URL = http://localhost:4000
    
### 3. Run the application locally
First run the server on a terminal (make sure you are in backend folder)
    
    npm run dev
    
Open new terminal and run the frontend

    cd frontend
    npm start
    
Open new terminal and run admin panel

    cd admin
    npm start
    
## Usage
- Create a new user account and log in.
- Create an admin account
- Add products through admin panel.
