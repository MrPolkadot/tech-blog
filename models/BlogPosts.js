const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class BlogPosts extends Model { }

BlogPosts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        blog_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blog_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            }
        },
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "comments",
                key: "id"
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blogposts',
    }
)






module.exports = BlogPosts;