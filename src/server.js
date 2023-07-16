import express from "express";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import routes from "./routes/index";
import configSession from "./config/session";
import passport from "passport";
import pem from "pem";
import https from "https";

pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
  if (err) {
    throw err;
  }
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

  // Config passport js
  app.use(passport.initialize());
  app.use(passport.session());

  // Init routes
  routes(app);

  https
    .createServer({ key: keys.clientKey, cert: keys.certificate }, app)
    .listen(process.env.APP_PORT, process.env.APP_HOST, (req, res) => {
      console.log(
        `I'm running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`
      );
    });
});

/*
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

// Config passport js
app.use(passport.initialize());
app.use(passport.session());

// Init routes
routes(app);


app.listen(process.env.APP_PORT, process.env.APP_HOST, (req, res) => {
  console.log(
    `I'm running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`
  );
});

*/
