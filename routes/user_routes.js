const express = require("express")
const route = express.Router()

const bcrypt = require("bcrypt")
const User = require("../models/user")

const { createUserToken } = require("../config/auth")
const { requireToken } = require('../config/auth')
// i want to go to /sign-up
//cannot sign in unless i create a user
//post
route.post("/sign-up", (req, res, next) => {
    //i want to hash the pw im getting from user
    bcrypt
        .hash(req.body.credentials.password, 10)
        .then(hashedPassword => {
            //we want to return an object that'll represent the user and replace pw w hashed pw
            return {
                userName: req.body.credentials.userName,
                password: hashedPassword
            }
          
        })
        .then(user => User.create(user))
        .then((user=> {
            res.status(201).json({ user: user })
        }))
        .catch(next)
})


//POST /sign-in
route.post("/sign-in", (req, res, next) => {
    //finding the user by the userName
    User.findOne({ userName: req.body.credentials.userName })
    .then(user => createUserToken(req, user))
    .then(token => res.json({ token: token }))

    .catch(next)
})





module.exports = route