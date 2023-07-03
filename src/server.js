import express from "express";
import connectDB from "./config/connectDB";
import contactModel from "./models/contact.model";

const app = express();

// Connect to MongoDB
connectDB();

const hostName = "localhost";
const port = 3000;

app.get("/test-database", async (req, res) => {
  try {
    let item = {
      userId: "328183",
      contactId: "jdbquweqhbkasxj aihwqe",
    };
    console.log(contactModel.createNew(item));
    let contact = await contactModel.createNew(item);
    res.send(contact);
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, (req, res) => {
  console.log(
    `I'm running at ${process.env.APP_HOST}:${process.env.APP_PORT}/test-database`
  );
});
