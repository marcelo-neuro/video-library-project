import dotenv from "dotenv";
import express from "express";

import routes from "./router/routes.js";
import connectToDatabase from "./config/dbConnect.js";

dotenv.config();

const app = express();

const port = 3000;

app.use(express.json())
app.use(routes)


connectToDatabase()

app.listen(port, () => {
    console.log(`Backend started at http://localhost:${port}`);
});