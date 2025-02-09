import express from "express";
import path from "path";
import cors from "cors";
import userApp from "./APIs/users.js";
import recipesApp from "./APIs/recipes.js";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

MongoClient.connect(process.env.DB_URI)
  .then((client) => {
    const dbObj = client.db("testDB");
    const usersCollection = dbObj.collection("users");
    const recipesCollection = dbObj.collection("recipes");
    app.set("usersCollection", usersCollection);
    app.set("recipesCollection", recipesCollection);
    console.log("DB Connected Successfully.");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/users", userApp);
app.use("/recipes", recipesApp);

app.use((err, req, res, next) => {
  res.send({ status: "error", message: err.message });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
