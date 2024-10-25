// server.js
require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/getSignature', (req, res) => {


  const secretKey = "8a3dff1244304101b82380451ea9be40478c74f680da4bb398bdb7bf76d1ff8b59a4497da4ce44f080a7b9022fc6df94a241246e53d64f6aabaecedd5b36961f2f8c8c6bd30e4dde80a06b35c235a9e8e4d2c3033c8d437a8a289dd3db4b869a691db55945b24f50b5ed2bd254877958e5053cf1b5514a42a3ae3b447570d019";
  //const secretKey = process.env.SECRET_KEY;
  const data = req.body;
  console.log("body structure",req.body)

  const signedFieldsArray = data?.signed_field_names.split(',');
  const signedDataString = signedFieldsArray
    .map((field) => `${field}=${data[field]}`)
    .join(',');

  // Generate the HMAC SHA256 signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(signedDataString)
    .digest('base64');
   
    console.log(signature)
  
  res.json({ signature });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


