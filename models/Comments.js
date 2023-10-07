const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Comments extends Model { }

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            }
        },
    },
    {
        
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
    }
)

module.exports = Comments;