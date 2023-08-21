const express = require("express");
const { sequelize } = require("./models");
const msgs = require("./routes/messages.js");
const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();

require("dotenv").config();

app.use("/api", msgs);

function getCookies(req){
    if(req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split("; ");
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split("=");
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
}

function authToken(req, res, next){
    const cookies = getCookies(req);
    const token = cookies["token"];

    if(token == null) return res.redirect(301, "/login");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.redirect(301, "/login");

        req.user = user;

        next();
    });
}

app.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./static" });
});

app.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./static" });
});

app.get("/admin", authToken, (req, res) => {
    res.sendFile("admin.html", { root: "./static" });
});

app.get("/admin/users", (req, res) => {
    res.sendFile("users.html", { root: "./static" });
});

app.get("/admin/books", (req, res) => {
    res.sendFile("books.html", { root: "./static" });
});

app.get("/admin/writing_accessories", (req, res) => {
    res.sendFile("writing_accessories.html", { root: "./static" });
});

app.get("/admin/movies", (req, res) => {
    res.sendFile("movies.html", { root: "./static" });
});

app.get("/admin/congratulations_cards", (req, res) => {
    res.sendFile("congratulations_cards.html", { root: "./static" });
});

app.get("/admin/school_accessories", (req, res) => {
    res.sendFile("school_accessories.html", { root: "./static" });
});

app.get("/admin/toys", (req, res) => {
    res.sendFile("toys.html", { root: "./static" });
});

app.get("/admin/music", (req, res) => {
    res.sendFile("music.html", { root: "./static" });
});

app.get("/admin/gift_cards", (req, res) => {
    res.sendFile("gift_cards.html", { root: "./static" });
});

app.get("/admin/messages", (req, res) => {
    res.sendFile("messages.html", { root: "./static" });
});

app.use(express.static(path.join(__dirname, "static")));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});
