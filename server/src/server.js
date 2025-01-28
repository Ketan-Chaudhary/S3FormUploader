// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const uploadRoutes = require("./routes/uploadRoutes");
// const mysql = require("mysql2");

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // MySQL connection configuration
// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
// });

// // Connect to MySQL and create the database if it doesn't exist
// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     process.exit(1);
//   }

//   console.log("Connected to MySQL");

//   // Check if the database exists
//   connection.query(
//     `SHOW DATABASES LIKE '${process.env.MYSQL_DATABASE}'`,
//     (err, results) => {
//       if (err) {
//         console.error("Error checking database:", err);
//         process.exit(1);
//       }

//       // If the database doesn't exist, create it
//       if (results.length === 0) {
//         console.log(
//           `Database ${process.env.MYSQL_DATABASE} does not exist. Creating it...`
//         );
//         connection.query(
//           `CREATE DATABASE ${process.env.MYSQL_DATABASE}`,
//           (err) => {
//             if (err) {
//               console.error("Error creating database:", err);
//               process.exit(1);
//             }
//             console.log(
//               `Database ${process.env.MYSQL_DATABASE} created successfully.`
//             );
//             // Now connect to the created database
//             createSchema();
//           }
//         );
//       } else {
//         // If the database exists, just use it
//         console.log(`Database ${process.env.MYSQL_DATABASE} exists.`);
//         createSchema();
//       }
//     }
//   );
// });

// // Function to create the schema (tables)
// function createSchema() {
//   const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     port: process.env.MYSQL_PORT || 3306, // Default MySQL port
//   });

//   // Create the students table if it doesn't exist
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS students (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       rollno VARCHAR(255) NOT NULL,
//       image_url TEXT NOT NULL
//     )
//   `;

//   pool.query(createTableQuery, (err, result) => {
//     if (err) {
//       console.error("Error creating table:", err);
//       process.exit(1);
//     }
//     console.log("Students table is ready.");
//   });
// }

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from React app

// // Routes
// app.use("/upload", uploadRoutes);

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const uploadRoutes = require("./routes/uploadRoutes");
const mysql = require("mysql2");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Allow all origins (not recommended for production) OR
// Specifically allow your React app's URL to make requests
app.use(
  cors({
    origin: "http://13.235.48.219:5174", // Allow the Vite dev server to make requests
    methods: "GET,POST", // Allow only specific methods
    credentials: true, // Allow cookies if needed (set this to true if you need session cookies)
  })
);

// MySQL connection configuration
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

// Connect to MySQL and create the database if it doesn't exist
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }

  console.log("Connected to MySQL");

  // Check if the database exists
  connection.query(
    `SHOW DATABASES LIKE '${process.env.MYSQL_DATABASE}'`,
    (err, results) => {
      if (err) {
        console.error("Error checking database:", err);
        process.exit(1);
      }

      // If the database doesn't exist, create it
      if (results.length === 0) {
        console.log(
          `Database ${process.env.MYSQL_DATABASE} does not exist. Creating it...`
        );
        connection.query(
          `CREATE DATABASE ${process.env.MYSQL_DATABASE}`,
          (err) => {
            if (err) {
              console.error("Error creating database:", err);
              process.exit(1);
            }
            console.log(
              `Database ${process.env.MYSQL_DATABASE} created successfully.`
            );
            // Now connect to the created database
            createSchema();
          }
        );
      } else {
        // If the database exists, just use it
        console.log(`Database ${process.env.MYSQL_DATABASE} exists.`);
        createSchema();
      }
    }
  );
});

// Function to create the schema (tables)
function createSchema() {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306, // Default MySQL port
  });

  // Create the students table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      rollno VARCHAR(255) NOT NULL,
      image_url TEXT NOT NULL
    )
  `;

  pool.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
      process.exit(1);
    }
    console.log("Students table is ready.");
  });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
