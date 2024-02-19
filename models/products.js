const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config.js');
 // Import your Sequelize instance



const Product = sequelize.define('Product', {
  produdtName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
      }
});



// Sync the model with the database (create the table)
(async () => {
  try {
    await sequelize.sync();
    console.log('productsDatabase synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

module.exports = Product;
