import { ObjectID } from "bson";
import express from "express";
import { client } from "../index.js";

const router = express.Router();

//get
router.get("/", async (req, res) => {
  const data = await client.db("Zoiva").collection("files").find({}).toArray();
  res.status(200).send(data);
});

//post 
router.post("/", async (req, res) => {
  const data = req.body;
  if (!data) {
    res.send("no body");
  }

  const result = await client.db("Zoiva").collection("files").insertOne(data);
  res.status(200).send(result);
});

//get by _id
router.get("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const result = await client
    .db("Zoiva")
    .collection("files")
    .findOne({ _id: ObjectID(_id) });
  res.status(200).send(result);
});

//delete by _id
router.delete("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const result = await client
    .db("Zoiva")
    .collection("files")
    .deleteOne({ _id: ObjectID(_id) });
  res.status(200).send(result);
});

//update by _id
router.put("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const { title, file } = req.body;
  const result = await client
    .db("Zoiva")
    .collection("files")
    .updateOne({ _id: ObjectID(_id) }, { $set: { title: title, file: file } });
  res.status(200).send(result);
});

export const filesRouter = router;
