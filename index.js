import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import knex from "knex";
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

const knexy = knex({
  client: "pg",
  version: "14.4.1",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "library_database",
  },
});

app.get("/student", (req, res) => {
  knexy("student")
    .select({
      id: "id",
      firstName: "firstName",
      lastName: "lastName",
    })
    .then((student) => {
      return res.json(student);
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        message: "An error occurred, please try again later.",
      });
    });
});

app.get("/student/:id", async (req, res) => {
  try {
    await knexy("student")
      .where({ id: req.params.id })
      .select()
      .returning("*")
      .then(function (data) {
        res.json(data);
      });
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/student", (req, res) => {
  // TODO insert user

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  knexy("student")
    .insert({ firstName, lastName })
    .then(() => {
      return res.json(res.body);
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        message: "An error occurred, please try again later.",
      });
    });
});

app.put("/student/:id", async (req, res) => {
  try {
    await knexy("student")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*")
      .then(function (data) {
        res.json(data);
      });
  } catch (err) {
    res.json({ message: err });
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    await knexy("student")
      .where({ id: req.params.id })
      .delete(req.body)
      .returning("*")
      .then(function (data) {
        res.send(data);
      });
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await knexy("books").select("*").from("books");
    res.json(books);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    await knexy("books")
      .where({ id: req.params.id })
      .select()
      .returning("*")
      .then(function (data) {
        res.send(data);
      });
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/books", async (req, res) => {
  try {
    const result = await knexy("books").insert(req.body);
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    await knexy("books")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*")
      .then(function (data) {
        res.json(data);
      });
  } catch (err) {
    res.json({ message: err });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    await knexy("books")
      .where({ id: req.params.id })
      .delete(req.body)
      .returning("*")
      .then(function (data) {
        res.send(data);
      });
  } catch (err) {
    res.json({ message: err });
  }
});

app.listen(5000, function () {
  console.log("Started application on port 5000");
});
