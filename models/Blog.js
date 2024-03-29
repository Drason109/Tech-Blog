const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Blog extends Model {}

    Blog.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            userId: { 
                type: DataTypes.INTEGER,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull:false,
            },
        },
        {
            sequelize,
            timestamps: true,
            freezeTableName: true,
            underscored: true,
            modelName: 'post',
        }
    );

module.exports = Blog;