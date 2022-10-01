import express from "express";
import cors from 'cors';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
import { filesRouter } from "./routes/Files.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log(`Connected to mongo`);
    return client;
}

export const client = await createConnection();

app.get("/", (req, res) => {
  res.send(`"front_end":""`);
});

app.use('/files',filesRouter);



app.listen(PORT, () => console.log(`App started in PORT ${PORT}`));
