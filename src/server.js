import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB";
import contactModel from "./models/contact.model";
import configViewEngine from "./config/viewEngine";
import routes from "./routes/index";

// Init app
const app = express();

// Connect to MongoDB
connectDB();

// Config view engine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({ extended: true }));

// Init routes
routes(app);

const hostName = "localhost";
const port = 3000;

app.listen(process.env.APP_PORT, process.env.APP_HOST, (req, res) => {
  console.log(
    `I'm running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`
  );
});
