const router = require("express").Router();
const { BlogPosts } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("profile");
        return;
    }

    try {
        await res.render("homepage", { logged_in: req.session.logged_in });
    } catch (error) {
        res.status(500).json(err);
    }
})



module.exports = router;