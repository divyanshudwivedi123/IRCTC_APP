import pg from 'pg';  
const { Pool } = pg;  
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool({
  connectionString: process.env.DB_STRING,
});

// Check the connection on startup
const connectDB = async () => {
    try {
      const client = await db.connect();
      console.log('Database connected successfully !');
      client.release(); 
    } catch (error) {
      console.error('Database connection failed:', error);
      process.exit(1); 
    }
};
  
connectDB(); 

export default db;

/*
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
*/

