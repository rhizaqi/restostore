'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Menu, {foreignKey: 'menuId'})
      Order.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Order.init({
    statusOrder: DataTypes.BOOLEAN,
    statusPayment: DataTypes.BOOLEAN,
    userId : DataTypes.INTEGER,
    menuId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};