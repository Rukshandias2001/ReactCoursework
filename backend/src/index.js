const express = require('express');
const app = express();
const router = require("./routes/routes");
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/properties', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  }
);



app.use(express.json());
app.use(cors());
app.use("/api",router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port number ${PORT}`);
});