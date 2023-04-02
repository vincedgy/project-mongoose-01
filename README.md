# Using MongoDB Client & Mongoose with MongoDB Atlas

MongoDB Atlas is a fully-managed cloud database that handles all the complexity of deploying, managing, and healing your deployments on the cloud service provider of your choice (AWS , Azure, and GCP). MongoDB Atlas is the best way to deploy, run, and scale MongoDB in the cloud.

Here I'm exploring the very last version of Mongo DB Javascript Client, using JavaScript and TypeScript.

## What do we want ?

We want to create a simple WebServer that will serve REST API for a Web Application
and we want to have users stored in a MongoDB Atlas (in the Cloud).

We also want a Server Side Script that can interact with the database for setting up the users collection.

## Why ?

Because it's very common to develop a Web Application, or a Mobile application, that needs to store data for your users, and because it's fun !

## What do wee need ?

We need a platform for coding, so we'll use NodeJs and is ecosystem (you should know a peace of it in order to go any further), with a couple of simple yet efficient lib to be installed as the following : 

- mongodb : the official MongoDB JavaScript library
- mongoose : the great ORM for MongoDB Client wich simplifies our Object Oriented Operations 
- express : the great WebServer for NodeJs

And for development aid : 

- nodemon : which restarts or scripts at each change on our source files
- typescript : which is the well known super set of JavaScript, providing type reenforcement, compiling capabilities and coding aid

- Visual Studio Code with HTTP client will be our IDE
