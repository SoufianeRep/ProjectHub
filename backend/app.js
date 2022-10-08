const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuid = require('uuid').v4;
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Home Route' });
});


// Storage setup for multer files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${uuid()}-${file.originalname}`; // Define a different naming system for videos later
    cb(null, uniqueFileName);
  }
});

const fileFilter = (req, file, cb) => {
  const type = file.mimetype.split('/')[0];
  if (type === 'video') {
    cb(null, true);
  } else {
    cb(new Error('File is not of the correct type'), false);
  }
};
const upload = multer({ storage, fileFilter });

// Post request for the file upload
app.post('/upload', upload.single('file'), (req, res, next) => {
  // console.log(req.file);
  console.log(req.file);
  res.json({ status: 'success' });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
