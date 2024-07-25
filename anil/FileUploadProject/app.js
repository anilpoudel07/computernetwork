const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve static files
app.use(express.static("public"));

// Handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File successfully uploaded");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
