const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "diwak35f5",
  api_key: "561233366252739",
  api_secret: "EjKyrs4mh9_FcU6MFtsiZCUxX8Y",
  secure: true
});

module.exports = cloudinary;