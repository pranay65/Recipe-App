import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const tkn = process.env.TOKEN;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, tkn, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = decoded.name;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

export default verifyToken;
