import express from "express";

const app = express();

const hostName = "localhost";
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

console.log("Thu Ha");
app.listen(port, hostName, (req, res) => {
  console.log(`I'm running at ${hostName}:${port}`);
});
