'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasMany(models.Order, {foreignKey: 'menuId'})
    }
  }
  Menu.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Menu name is required"
        },
        notNull: {
          msg: "Menu name is required"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Menu price is required"
        },
        notNull: {
          msg: "Menu price is required"
        }
      }
    },
    description:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Menu description is required"
        },
        notNull: {
          msg: "Menu description is required"
        }
      }
    },
    imgUrl:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image Url is required"
        },
        notNull: {
          msg: "Image Url is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};