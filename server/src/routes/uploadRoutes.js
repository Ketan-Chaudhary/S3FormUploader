const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// MySQL connection configuration
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306, // Default MySQL port
});

const upload = multer({ storage: multer.memoryStorage() });

// Upload route
router.post("/", upload.single("image"), async (req, res) => {
  const { name, rollNo } = req.body;
  const image = req.file;

  // Upload the image to S3
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `images/${Date.now()}-${image.originalname}`,
    Body: image.buffer,
    ContentType: image.mimetype,
    ACL: "public-read",
  };

  try {
    const s3Response = await s3.upload(params).promise();
    const imageUrl = s3Response.Location;

    // Insert data into MySQL
    const insertQuery =
      "INSERT INTO students (name, rollno, image_url) VALUES (?, ?, ?)";
    pool.query(insertQuery, [name, rollNo, imageUrl], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error saving data to database", error: err });
      }
      res.status(200).json({ message: "Data uploaded successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Error uploading image", error: err });
  }
});

// Route to get uploaded data
router.get("/data", (req, res) => {
  pool.query("SELECT * FROM students", (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching data", error: err });
    }
    res.json(rows);
  });
});

module.exports = router;
