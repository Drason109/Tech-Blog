const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
              },
        },
    },
    {
        hooks: {
           beforeCreate: async userdata => {
            userdata.password = await bcrypt.hash(userdata.password, 10)
            return userdata;
           },
           beforeUpdate: async userdata => {
            userdata.password = await bcrypt.hash(userdata.password, 10);
            return userdata;
           }
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    });

module.exports = User;