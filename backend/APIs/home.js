import { Router } from "express";

const homeApp = Router();

homeApp.get("/", (req, res) => {
  res.send({ message: "Home Page" });
});

export default homeApp;
