const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const aws = require("aws-sdk");
const mysql = require("mysql2");
const router = express.Router();

dotenv.config();

// Set up MySQL connection
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306,
});

// Set up S3
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// Set up multer for image upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to handle file upload and data insertion
router.post("/", upload.single("image"), (req, res) => {
  const { name, rollNo } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  // Upload image to S3
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `images/${Date.now()}-${image.originalname}`,
    Body: image.buffer,
    ContentType: image.mimetype,
    ACL: "public-read",
  };

  s3.upload(s3Params, (err, data) => {
    if (err) {
      console.error("Error uploading image to S3:", err);
      return res.status(500).json({ message: "Failed to upload image to S3" });
    }

    // Image URL from S3
    const imageUrl = data.Location;

    // Insert data into MySQL
    const query =
      "INSERT INTO students (name, rollno, image_url) VALUES (?, ?, ?)";
    pool.query(query, [name, rollNo, imageUrl], (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        return res
          .status(500)
          .json({ message: "Failed to insert data into MySQL" });
      }

      res.status(200).json({ message: "Data and image uploaded successfully" });
    });
  });
});

// Route to fetch all uploaded data
router.get("/data", (req, res) => {
  const query = "SELECT * FROM students";

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(200).json({ message: "No data available." }); // No data in the database
    }

    res.status(200).json(results); // Send the data as JSON if records exist
  });
});

module.exports = router;
