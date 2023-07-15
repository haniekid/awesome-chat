import express from "express";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import routes from "./routes/index";
import configSession from "./config/session";

// Init app
const app = express();

// Connect to MongoDB
connectDB();

// Config session
configSession(app);

// Config view engine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({ extended: true }));

// Enable flash messages
app.use(connectFlash());

// Init routes
routes(app);

const hostName = "localhost";
const port = process.env.APP_PORT || 8080;

app.listen(8080, process.env.APP_HOST, (req, res) => {
  console.log(
    `I'm running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`
  );
});
