const express = require("express");
const { sequelize, Users, Books, Writing_Accessories, Movies, Congratulations_Cards, School_Accessories, Toys, Music, Gift_Cards, Messages } = require("../models");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const router = express.Router();

require("dotenv").config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function authToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log(token);
    if(token == null) return res.status(401).json({ msg: "Greska" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ msg: err });

        req.user = user;

        next();
    });
}

//router.use(authToken);

const idScheme2 = joi.object().keys({
    id: joi.number().integer().min(1).required()
});

const usersScheme = joi.object().keys({
    username: joi.string().trim().min(4).max(24).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(4).max(16).required()
});

const booksScheme = joi.object().keys({
    title: joi.string().trim().required().max(30),
    author: joi.string().trim().required().max(40),
    genre: joi.string().trim().required().max(25),
    publisher: joi.string().trim().required().max(40),
    price: joi.number().integer().min(250).max(2500).required()
});

const writing_accessoriesScheme = joi.object().keys({
    manufacturer: joi.string().trim().required().max(30),
    type: joi.string().trim().required().max(30),
    color: joi.string().trim().required().max(20),
    price: joi.number().integer().min(25).max(5000).required()
});

const moviesScheme = joi.object().keys({
    name: joi.string().trim().required().max(40),
    genre: joi.string().trim().required().max(25),
    price: joi.number().integer().min(250).max(750).required()
});

const congratulations_cardsScheme = joi.object().keys({
    type: joi.string().trim().required().max(30),
    price: joi.number().integer().min(100).max(500).required()
});

const school_accessoriesScheme = joi.object().keys({
    manufacturer: joi.string().trim().required().max(30),
    type: joi.string().trim().required().max(30),
    color: joi.string().trim().required().max(20),
    price: joi.number().integer().min(500).max(10000).required()
});

const toysScheme = joi.object().keys({
    manufacturer: joi.string().trim().required().max(30),
    type: joi.string().trim().required().max(30),
    name: joi.string().trim().required().max(30),
    color: joi.string().trim().required().max(20),
    price: joi.number().integer().min(150).max(10000).required()
});

const musicScheme = joi.object().keys({
    albumName: joi.string().trim().required().max(40),
    performer: joi.string().trim().required().max(30),
    genre: joi.string().trim().required().max(25),
    price: joi.number().integer().min(250).max(1000).required()
});

const gift_cardsScheme = joi.object().keys({
    value: joi.number().integer().required().min(500).max(10000).required()
});

const messagesScheme = joi.object().keys({
    content: joi.string().trim().required().min(1).max(2048).required()
})

//vrati sve

router.get("/users", (req, res) => {
    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/books", (req, res) => {
    Books.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/writing_accessories", (req, res) => {
    Writing_Accessories.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/movies", (req, res) => {
    Movies.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/congratulations_cards", (req, res) => {
    Congratulations_Cards.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/school_accessories", (req, res) => {
    School_Accessories.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/toys", (req, res) => {
    Toys.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/music", (req, res) => {
    Music.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/gift_cards", (req, res) => {
    Gift_Cards.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/messages", (req, res) => {
    Messages.findAll({ include: ["user"] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});


//vrati po id

router.get("/users/:id", (req, res) => {
    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/books/:id", (req, res) => {
    Books.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/writing_accessories/:id", (req, res) => {
    Writing_Accessories.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/movies/:id", (req, res) => {
    Movies.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/congratulations_cards/:id", (req, res) => {
    Congratulations_Cards.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/school_accessories/:id", (req, res) => {
    School_Accessories.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/toys/:id", (req, res) => {
    Toys.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/music/:id", (req, res) => {
    Music.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/gift_cards/:id", (req, res) => {
    Gift_Cards.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get("/messages/:id", (req, res) => {
    Messages.findOne({ where: { id: req.params.id }, include: ["user"] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

//ubaci u bazu

router.post("/users", (req, res) => {
    joi.validate(req.body, usersScheme, (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            Users.create({ username: req.body.username, email: req.body.email, password: req.body.password, admin: req.body.admin, moderator: req.body.moderator })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        }
    })
});

router.post("/books", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, booksScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Books.create({ title: req.body.title, author: req.body.author, genre: req.body.genre, publisher: req.body.publisher, price: req.body.price })
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });  
            }
        })
        .catch( err => res.status(500).json(err) );
});

router.post("/writing_accessories", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, writing_accessoriesScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Writing_Accessories.create({ manufacturer: req.body.manufacturer, type: req.body.type, color: req.body.color, price: req.body.price })
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });  
            }
        })
        .catch( err => res.status(500).json(err) );
});

router.post("/movies", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, moviesScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Movies.create({ name: req.body.name, genre: req.body.genre, price: req.body.price })
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
        .catch( err => res.status(500).json(err) );
});

router.post("/congratulations_cards", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, congratulations_cardsScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Congratulations_Cards.create({ type: req.body.type, price: req.body.price })
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        }) 
        .catch( err => res.status(500).json(err) );
});

router.post("/school_accessories", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, school_accessoriesScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        School_Accessories.create({ manufacturer: req.body.manufacturer, type: req.body.type, color: req.body.color, price: req.body.price })
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
        .catch( err => res.status(500).json(err) );
});

router.post("/toys", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, toysScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Toys.create({ manufacturer: req.body.manufacturer, type: req.body.type, name: req.body.name, color: req.body.color, price: req.body.price })
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
        .catch( err => res.status(500).json(err) );
});

router.post("/music", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, musicScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Music.create({ albumName: req.body.albumName, performer: req.body.performer, genre: req.body.genre, price: req.body.price })
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
        .catch( err => res.status(500).json(err) );
});


router.post("/gift_cards", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, gift_cardsScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Gift_Cards.create({ value: req.body.value })
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
        .catch( err => res.status(500).json(err) );
});

router.post("/messages", (req, res) => {
    joi.validate(req.body, messagesScheme, (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            Messages.create({ content: req.body.content })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        }
    })
    .catch( err => res.status(500).json(err) );
});


//update u bazi

router.put("/users/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin){
                joi.validate(req.body, usersScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Users.findOne({ where: { id: req.params.id } })
                            .then( usr => {
                                usr.username = req.body.username,
                                usr.email = req.body.email,
                                usr.password = req.body.password,
                                usr.admin = req.body.admin,
                                usr.moderator = req.body.moderator
                
                                usr.save()
                                    .then( rows => res.json(rows) )
                                    .catch( err => res.status(500).json(err) );
                            })
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.put("/books/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, booksScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Books.findOne({ where: { id: req.params.id } })
                            .then( book => {
                                book.title = req.body.title,
                                book.author = req.body.author,
                                book.genre = req.body.genre,
                                book.publisher = req.body.publisher,
                                book.price = req.body.price
                
                                book.save()
                                    .then( rows => res.json(rows) )
                                    .catch( err => res.status(500).json(err) );
                            })
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.put("/writing_accessories/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, writing_accessoriesScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Writing_Accessories.findOne({ where: { id: req.params.id } })
                            .then( writing_accessory => {
                                writing_accessory.manufacturer = req.body.manufacturer,
                                writing_accessory.type = req.body.type,
                                writing_accessory.color = req.body.color,
                                writing_accessory.price = req.body.price
                
                                writing_accessory.save()
                                    .then( rows => res.json(rows) )
                                    .catch( err => res.status(500).json(err) );
                            })
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.put("/movies/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, moviesScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Movies.findOne({ where: { id: req.params.id } })
                        .then( movie => {
                            movie.name = req.body.name,
                            movie.genre = req.body.genre,
                            movie.price = req.body.price
                
                            movie.save()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
})

router.put("/congratulations_cards/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, congratulations_cardsScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Congratulations_Cards.findOne({ where: { id: req.params.id } })
                            .then( congratulations_card => {
                                congratulations_card.type = req.body.type,
                                congratulations_card.price = req.body.price
                
                                congratulations_card.save()
                                    .then( rows => res.json(rows) )
                                    .catch( err => res.status(500).json(err) );
                            })
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.put("/school_accessories/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, school_accessoriesScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        School_Accessories.findOne({ where: { id: req.params.id } })
                            .then( school_accessory => {
                                school_accessory.manufacturer = req.body.manufacturer,
                                school_accessory.type = req.body.type,
                                school_accessory.color = req.body.color,
                                school_accessory.price = req.body.price
                
                                school_accessory.save()
                                    .then( rows => res.json(rows) )
                                    .catch( err => res.status(500).json(err) );
                            })
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.put("/toys/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, toysScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Toys.findOne({ where: { id: req.params.id } })
                            .then( toy => {
                                toy.manufacturer = req.body.manufacturer,
                                toy.type = req.body.type,
                                toy.name = req.body.name
                                toy.color = req.body.color,
                                toy.price = req.body.price
                
                                toy.save()
                                    .then( rows => res.json(rows) )
                                    .catch( err => res.status(500).json(err) );
                            })
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.put("/music/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, musicScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Music.findOne({ where: { id: req.params.id } })
                            .then( msc => {
                                msc.albumName = req.body.albumName,
                                msc.performer = req.body.performer,
                                msc.genre = req.body.genre,
                                msc.price = req.body.price
                
                                msc.save()
                                    .then( rows => res.json(rows) )
                                    .catch( err => res.status(500).json(err) );
                            })
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.put("/gift_cards/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, gift_cardsScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Gift_Cards.findOne({ where: { id: req.params.id } })
                            .then( gift_card => {
                                gift_card.value = req.body.value,
                
                                gift_card.save()
                                    .then( rows => res.json(rows) )
                                    .catch( err => res.status(500).json(err) );
                            })
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.put("/messages/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, messagesScheme, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Messages.findOne({ where: { id: req.params.id }, include: ["user"] })
                            .then( message => {
                                message.content = req.body.content,
                
                                message.save()
                                    .then( rows => res.json(rows) )
                                    .catch( err => res.status(500).json(err) );
                            })
                            .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

//brisanje iz baze

router.delete("/users/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin){
                joi.validate(req.body, idScheme2, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Users.findOne({ where: { id: req.params.id } })
                        .then( usr => {
                            usr.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.delete("/books/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, idScheme2, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Books.findOne({ where: { id: req.params.id } })
                        .then( book => {
                            book.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.delete("/writing_accessories/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, idScheme2, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Writing_Accessories.findOne({ where: { id: req.params.id } })
                        .then( writing_accessory => {
                            writing_accessory.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.delete("/movies/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, idScheme2, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Movies.findOne({ where: { id: req.params.id } })
                        .then( movie => {
                            movie.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.delete("/congratulations_cards/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, idScheme2, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Congratulations_Cards.findOne({ where: { id: req.params.id } })
                        .then( congratulations_card => {
                            congratulations_card.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.delete("/school_accessories/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, idScheme2, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        School_Accessories.findOne({ where: { id: req.params.id } })
                        .then( school_accessory => {
                            school_accessory.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.delete("/toys/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, idScheme2, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Toys.findOne({ where: { id: req.params.id } })
                        .then( toy => {
                            toy.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.delete("/music/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, idScheme2, (err, result) => {
                    if(err){
                        res.send(err);
                        console.log(req.body);
                    }
                    else{
                        Music.findOne({ where: { id: req.params.id } })
                        .then( msc => {
                            msc.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.delete("/gift_cards/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, idScheme2, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Gift_Cards.findOne({ where: { id: req.params.id } })
                        .then( gift_card => {
                            gift_card.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

router.delete("/messages/:id", (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if(usr.admin || usr.moderator){
                joi.validate(req.body, idScheme2, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        Messages.findOne({ where: { id: req.params.id }, include: ["user"] })
                        .then( message => {
                            message.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
                })
            }
            else{
                res.status(403).json({ msg: "User Is Not Authorized To Access This Command" });
            }
        })
});

module.exports = router;