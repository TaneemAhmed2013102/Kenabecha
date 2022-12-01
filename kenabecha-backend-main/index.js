const express = require('express');
const app = express();
const mysql = require('mysql');
const {centralAuth} = require('./middleware/centralAuth');
const path = require("path");

app.use("/files", express.static(path.join(__dirname, "images")));
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({
  extended: true,
  limit: '500mb'
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect((err) => {
    if (err) {
        throw err;
    }

    // create database
    con.query("CREATE DATABASE IF NOT EXISTS bechakena", (err) => {
        if (err) {
            throw err;
        }
        console.log("Database connected");
    });
});

app.use('/auth', centralAuth({"baseRoute": "auth"}), require('./api/auth.js'));
app.use('/home', centralAuth({"baseRoute": "home"}), require('./api/home.js'));
app.use('/user', centralAuth({"baseRoute": "user"}), require('./api/user.js'));
app.use('/admin', centralAuth({"baseRoute": "admin"}), require('./api/admin.js'));

app.listen(8000, () => {
    console.log("Server running at port 8000");
});