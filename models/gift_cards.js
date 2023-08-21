'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gift_Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gift_Cards.init({
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Gift_Cards',
  });
  return Gift_Cards;
};