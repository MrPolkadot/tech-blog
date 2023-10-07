const BlogPosts = require("./BlogPosts");
const Comments = require("./Comments");
const User = require("./User");

User.hasMany(BlogPosts, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

User.hasMany(Comments, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});


BlogPosts.hasMany(Comments, {
    foreignKey: "comment_id"
})

Comments.belongsTo(BlogPosts, {
})

BlogPosts.belongsTo(User, {
    foreignKey: "user_id",
});

Comments.belongsTo(User, {
    foreignKey: "user_id",
})


module.exports = { User, BlogPosts, Comments };