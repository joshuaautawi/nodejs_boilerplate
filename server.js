const express = require("express");
const app = express();
const router = require("./router/index");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(process.env.PORT, () =>
  console.log(
    `Server is running on ${new Date()} , and listen in port : ${
      process.env.PORT
    }`
  )
);
