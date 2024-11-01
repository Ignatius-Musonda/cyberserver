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

//  production
  const secretKey = "1b734e5be2dc4a34bcc034db268627afbb281bd412ce4a4ea2c3a6d565fe5d4195e98a7dc7854f64beb70e342fc83ddf63ff3e5011d04563b486c591bb5a09d1b85eb4b265514f02905116a691b2cd8573cc3b241989431399f2fd27e66c0dfe499185ea6cc640acb77efc87a2f0f56a8520e3707cd945d6843915b0c7855df0";
  
  // test
  //const secretKey = "87710291a4cb4477a99010c4536488eed6eb13dc28f64e1985d3a60a3a314e7f0e1db72fed414b659061b1b678d3bf08de388b0c05694678886a0c35a7d713bc6bb2277172de485c883d64c1a6e73171b0a5cf20c4cb49879be09bc3d7c2cb422650a323edae4affb41a764aa93071deaca302124d3b4e32bbd23eeb69b22815";
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


