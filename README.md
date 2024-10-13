# About

Raising a PR !

IRCTC app is a backend application where users can signup/login and book train tickets.

The tech stack used in NodeJS/Express and the database used is a serverless instance of postgreSQL on neon.tech.

## Project Setup Steps

1. Clone the repo locally. Then in the root of the folder where package.json lies, run the following commands.

```bash
npm install
```

This will install all necessary dependencies needed to run the project locally.

2. Then create a .env file in the root of the folder. Add the following keys in the file.

```
DB_STRING="connection string from neon.tech"
SECRET_KEY="JWT secret key of your choice"
ADMIN_KEY="admin key of your choice"
```

Give a SECRET_KEY and ADMIN_KEY as per you own choice.

NOTE: The next step involves going to the cloud DB provider and getting a connection string to connect to the database. If you want to skip steps 3 and 4, you can use the connection string that I used for development purposes. 

```
DB_STRING = "postgresql://irctc-db_owner:RgJo4MYwH5FG@ep-crimson-leaf-a5pnyy8c.us-east-2.aws.neon
.tech/irctc-db?sslmode=require"
```
3. Go to neon.tech i.e. https://neon.tech/ and get a serverless instance of PostgreSQL running. You will see a connection string in the dashboard.
Copy the string and paste it in front of the DB_STRING in .env file.

## Create Tables

The next step is to create tables(USERS, TRAINS, BOOKINGS) in the database. Go to the SQL editor that is present on the left hand side. Copy and paste the give below SQL script in the editor to initialize the tables.  

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(50) NOT NULL
);

CREATE TABLE trains (
  id SERIAL PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  total_seats INT NOT NULL,
  available_seats INT NOT NULL
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  train_id INT REFERENCES trains(id),
  user_id INT REFERENCES users(id),
  seats_booked INT,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## Start the App 
In the VS code terminal, run the command : ```npm run dev``` to start the project. If everything is set up properly, then the app will start and you will see this in the console. 

```
[nodemon] starting `node index.js`
Server is listening on port 5000
Database connected successfully !
```



## API endpoints

Go to the given URL to access the API documentation.
```
https://documenter.getpostman.com/view/17849933/2sAXqqdNos
```

