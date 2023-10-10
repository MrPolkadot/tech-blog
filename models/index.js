const BlogPosts = require("./BlogPosts");
const Comments = require("./Comments");
const User = require("./User");

User.hasMany(BlogPosts, {
    foreignKey: "user_id"
});

BlogPosts.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Comments.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})


Comments.belongsTo(BlogPosts, {
    foreignKey: "blog_id",
    onDelete: "CASCADE"
})

User.hasMany(Comments, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});


BlogPosts.hasMany(Comments, {
    foreignKey: "blog_id",
    onDelete: "CASCADE"
})







module.exports = { User, BlogPosts, Comments };