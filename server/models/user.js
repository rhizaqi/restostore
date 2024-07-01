'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
const { hashPw } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {foreignKey: 'userId'})
    }
  }
  User.init({
    fullname:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Fullname name is required"
        },
        notNull: {
          msg: "Fullname name is required"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email name is required"
        },
        notNull: {
          msg: "Email name is required"
        },
        isEmail: {
          msg: "Please check your email format"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password name is required"
        },
        notNull: {
          msg: "Password name is required"
        }
      }
    },
    address: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Address name is required"
        },
        notNull: {
          msg: "Address name is required"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (user)=>{
   user.password = hashPw(user.password)
  })
  return User;
};