const router = require("express").Router();
const sequelize = require("../config/connection");
const { BlogPosts, Comments, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {

    try {
        const posts = await BlogPosts.findAll({
            attributes: [
                "id",
                "blog_title",
                "blog_content",
                "blog_date"

            ],
            include: [{
                model: Comments,
                attributes: [
                    "id",
                    "comment_body",
                    "blog_id",
                    "user_id"
                ],
                include: { model: User, attributes: ["name"] }
            },
            {
                model: User,
                attributes: ["name"]
            }
            ]
        })


        const allPosts = posts.map(post => post.get({ plain: true }))
        res.render("homepage", { allPosts, logged_in: req.session.logged_in, logged_in: true })
    } catch (error) {
        res.status(500).json(error);
    }
});



router.get("/signup", async (req, res) => {
    try {
        await res.render("signup");
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get("/profile", withAuth, async (req, res) => {
    const id = req.session.user_id;

    try {
        const userData = await BlogPosts.findAll({
            include: [{ model: Comments }, { model: User }],
            where: {
                user_id: id
            },
            // attributes: [
            //     "id",
            //     "blog_title",
            //     "blog_content",
            //     "blog_date"
            // ],
            // include: [

            //     {
            //         model: Comments,
            //         attrributes: [
            //             "id",
            //             "comment_body",
            //             "user_id",
            //             "blog_id"
            //         ],

            //         include: {
            //             model: User,
            //             attributes: ["name"]
            //         }
            //     },
            //     {
            //         model: User,
            //         attributes: ["name"]
            //     }
            // ],

        });

        const user = userData.map((data => data.get({ plain: true })));
        console.log(user)
        res.render("profile", { user, logged_in: true });
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get("/blog-post", withAuth, async (req, res) => {
    const id = req.session.user_id;

    try {
        const postData = await User.findByPk(id, {
            include: [{ model: BlogPosts }]
        });
        const posts = postData.get({ plain: true });
        console.log(posts);
        res.render("userPosts", { posts, logged_in: true });

    } catch (error) {
        res.status(500).json(error);
    }
});


router.get("/comments", withAuth, async (req, res) => {
    const id = req.session.user_id;

    try {
        const commentData = await User.findByPk(id, {
            include: [{ model: Comments }]
        });

        const comment = commentData.get({ plain: true });

        res.render("comments", { comment, logged_in: true })

    } catch (error) {
        res.status(500).json(error);
    }
});



router.get("/blog-post/:id", withAuth, async (req, res) => {
    try {
        const onePost = await BlogPosts.findByPk(req.params.id);
        const post = onePost.get({ plain: true });

        res.render("onePost", { post, logged_in: true });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


router.get("/comments/:id", withAuth, async (req, res) => {
    try {
        const oneComment = await Comments.findByPk(req.params.id);
        const comment = oneComment.get({ plain: true });

        res.render("oneComment", { comment, logged_in: true });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});






router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/profile");
        return;
    }
    res.render("login");
});


module.exports = router;