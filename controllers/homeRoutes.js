const router = require("express").Router();
const sequelize = require("../config/connection");
const { BlogPosts, Comments, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/profile");
        return;
    }

    try {
        res.render("homepage", { logged_in: req.session.logged_in })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/signup", async (req, res) => {
    try {
        res.render("signup");
    } catch (error) {
        res.status(500).json(error);
    }
});

// router.get("/profile", withAuth, async (req, res) => {
//     const id = req.session.user_id;

//     try {

//     } catch (error) {

//     }

// })

module.exports = router;