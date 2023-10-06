const router = require("express").Router();
const sequelize = require("../config/connection");
const { BlogPosts, Comments, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/")
    }
})