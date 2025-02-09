import express from "express";
import path from "path";
import cors from "cors";
import homeApp from "./APIs/home.js";
import userApp from "./APIs/users.js";
import recipesApp from "./APIs/recipes.js";
import { MongoClient } from "mongodb";
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

const __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", homeApp);
app.use("/users", userApp);
app.use("/recipes", recipesApp);

app.use((err, req, res, next) => {
  res.send({ status: "error", message: err.message });
});

if (process.env.CURR_ENV === "production") {
}

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
