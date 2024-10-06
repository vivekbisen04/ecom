# E-commerce Application (MERN Stack)


## Introduction
This is a full-stack e-commerce application built using the MERN stack. It allows users to browse products, add them to the cart, and make purchases. It also provides an admin dashboard to manage products, orders, and users.

## Features
- User registration and login with JWT authentication
- Product listing and filtering
- Product search functionality
- Shopping cart with add, remove, and update quantities
- Admin dashboard to manage products, users, and orders

## Technologies Used
- **Frontend**: React, Redux, Axios, Bootstrap, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for ORM)
- **Authentication**: JWT (JSON Web Token)


## Installation
To get started with the project locally, follow these steps:

# 1. Clone the repository
```bash
git clone https://github.com/vivekbisen04/ecom.git

```
#Backend setup 
```
cd backend
npm install
```
-setup e.env
```
JWT_SECRET=THIS_IS_JWT_SECRET_KEY
PORT=4000
DATABASE_URL=DB_CONNECTION_URL
CLOUDINARY_CLOUD_NAME=CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=CLOUDINARY_API_SECRET

```
# for admin
```
cd admin
npm install
npm run dev
```

#for userinterface

```
cd frontend
npm start

```


