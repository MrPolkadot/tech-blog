const router = require("express").Router();
const { BlogPosts } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await BlogPosts.create({
            blog_title: req.body.blog_title,
            blog_content: req.body.blog_content,
            blog_date: new Date(),
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatePost = await BlogPosts.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        res.status(200).json(updatePost);
    } catch (error) {
        res.status(500).json(err);
    }
});


router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await BlogPosts.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(err);
    }
})



router.get("/new", withAuth, async (req, res) => {

    res.render("onePost", { logged_in: true });
})

module.exports = router;