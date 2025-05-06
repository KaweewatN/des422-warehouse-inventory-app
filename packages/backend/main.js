import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import route from "./router/routes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", route);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
