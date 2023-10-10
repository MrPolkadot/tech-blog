const sequelize = require('../config/connection');
const { User, Comments, BlogPosts } = require('../models');

const userData = require("./userData.json");
const userBlogPosts = require("./userblogPosts.json");
const userComments = require("./userComments.json");


const seedDB = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await BlogPosts.bulkCreate(userBlogPosts, {});


    await Comments.bulkCreate(userComments, {});



    process.exit(0);
};

seedDB();