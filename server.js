require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const posts = [
  {
    username: "Posh",
    title: "Post 1",
  },
  {
    username: "Rosh",
    title: "Post 2",
  },
  {
    username: "Mosh",
    title: "Post 3",
  },
];

app.get("/posts", authenticateUsers, (req, res) => {
  const userPost = posts.filter((post) => post.username === req.user.name);
  res.json(userPost);
});

async function authenticateUsers(req, res, next) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null) return res.status(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;

    next();
  });
}
app.listen(3000);
