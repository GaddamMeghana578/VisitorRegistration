# VisitorRegistration Tutorial

*MEAN Stack Project*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You are going to need **Node.js**, **MongoDB** and **npm** or **yarn** installed on your machine.
**Note**: You can either install **MongoDB** locally on your machine or use **MongoDB Atlas**

### Installing

How to properly install and configure this repository to work on your machine.

Cloning the repository

```
git clone ...
```

Enter cloned directory

```
cd VisitorRegistration/
```

Enter project directory and install the packages

```
VisitorRegistration/npm install
```
or if you are using yarn, you can do

```
VisitorRegistration/yarn install
```

## Starting the repository on your machine

You can run the project, the port is already configured.

If you are not using **MongoDBAtlas** then do the below:

Start Mongo server in your project directory

```
cd VisitorRegistration
```

```
VisitorRegistration/mongod
```
On mac book you need to run

```
VisitorRegistration/sudo mongod
```

Next open a new command prompt(terminal), enter into project directory

```
cd VisitorRegistration
```
you can run the application doing the below

```
VisitorRegistration/npm start
```
or (for yarn)

```
VisitorRegistration/yarn start
```

Now you can load **localhost:3000** in your browser and use the app.

## Built With

* [MongoDB](https://www.mongodb.com/) - No SQL Database
* [Express](https://expressjs.com/) - Node.js web application framework
* [Angular](https://angular.io/) - Frontend javascript library
* [Node](https://nodejs.org/en/) - Backend framework

## Project Description

Visitor Registration project uses the MEAN stack technology for managing the visitors.

Description: Currently this application works in 2 modes.

• Visitor(Enroll)

• Administrator(Login)

Enroll: The visitor/user registers by entering all the necessary details and the badge is generated and printed(if required).

Login: This is mainly for the administrator mode. You need to enter the valid credentials in order to manage the enrolled visitors. Admin credentials are hardcoded for now(Username:"admin" and Password:12345)

## Project Demo

Click on the below image to check the project (Visitor Portal) Demo.

[![Visitor Portal Demo](https://i9.ytimg.com/vi_webp/qoIQs76nt9k/hqdefault.webp?sqp=CNSThuQF&rs=AOn4CLD6HvzYCLkQg3gZ8jpbKUgoktolGg)](https://www.youtube.com/watch?v=qoIQs76nt9k&t=2s "Visitor Portal Demo")

## Authors

* **Meghana Gaddam** - *MEAN stack project work* - [VisitorRegistration]
(https://github.com/GaddamMeghana578/VisitorRegistration)
