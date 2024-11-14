<h1 align="center">
Neural_For_All
</h1>
<p align="center">
Neural_For_All is a Neural Network Training Dashboard implemented in MERN Stack with tensorflow.js for training and visualization in browser...
</p>

![Home](https://github.com/manohar3000/Neural_For_All/blob/main/assets/Home.png)<br>
![Training](https://github.com/user-attachments/assets/729b17dc-a0ea-4ec1-aa48-23fdf6d70992)



## clone or download
```terminal
$ git clone https://github.com/manohar3000/Neural_For_All.git
$ npm i
```

## project structure
```terminal
LICENSE
backend/
   controllers
   models
   routes
   middleware
   server.js
   package-lock.json
   package.json  
   .env
frontend/
   public
   src/
      layouts/
          ...
      pages/
          ...
      components/
          ...
      App.css
      App.js
      index.css
      index.js
   package.json
   package-lock.json  
```
# Usage (run app on your machine)
## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/)
- [npm](https://nodejs.org/en/download/package-manager/)

NOTICE, you need frontend and Backend runs concurrently in different terminal session, in order to make them talk to each other

## Frontend usage
```terminal
$ cd client          // go to client folder
$ npm i    // npm install packages
$ npm start       // run it locally
```

## Backend usage

### Prepare your secret

run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB)

```terminal
// in the root level
$ cd backend
$ echo "PORT=<PORT_NUMBER>" >> .env
$ echo "MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>" >> .env
$ echo "SECRET=<YOUR_JWT_SECRET>" >> .env
```

### Start

```terminal
$ cd backend   // go to server folder
$ npm i       // npm install packages
$ node server.js // run it locally
```
### Contributing
Contributions are welcome! Please open an issue or submit a pull request on Github.

