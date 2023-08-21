const express = require("express");
const { sequelize, Users } = require("./models");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const joi = require("joi");

require("dotenv").config();

var corsOptions = {
    origin: "http://127.0.0.1:8000",
    optionSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post("/register", (req, res) => {
    const obj = {
        username: req.body.username,
        email: req.body.email,
        admin: req.body.admin,
        moderator: req.body.moderator,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    Users.create(obj).then( rows => {
        const usr = {
            userId: rows.id,
            username: rows.username
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        res.json({ token: token });
    }).catch( err => res.status(500).json(err) );
});

app.post("/login", async (req, res) => {
    if(await Users.findOne({ where: { email: req.body.email } }) == null){
        res.status(400).json({ msg: "ERROR" });
    }
    else{
        Users.findOne({ where: { email: req.body.email } })
        .then( usr => {
            if(bcrypt.compareSync(req.body.password, usr.password)){
                const obj = {
                    userId: usr.id,
                    username: usr.username
                };
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

                res.json({ token: token });
                console.log(token);
            }
            else{
                res.status(400).json({ msg: "Authentication Failed" });
            }
        })
        .catch( err => res.status(500).json(err) );
    }
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});