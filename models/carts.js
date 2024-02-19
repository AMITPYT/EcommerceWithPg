// Import necessary modules and Sequelize instance
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');
const User = require('./auth.js');
const userDetails = require('./userDetails.js');

// Define the Carts model
const Carts = sequelize.define('Carts', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  userDetailedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: userDetails,
      key: 'id',
    },
  },
  produdtName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER, // Assuming quantity is an integer
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Assuming price is a decimal
    allowNull: false,
  },
});

// Define associations between Carts and User/UserDetails
Carts.belongsTo(User, { foreignKey: 'userId' });
Carts.belongsTo(userDetails, { foreignKey: 'userDetailedId' });
// Carts.belongsTo(userDetails, { foreignKey: 'userDetailedId', as: 'userDetails' });

// Sync the model with the database (create the table)
(async () => {
  try {
    await sequelize.sync();
    console.log('Carts Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

// Export the Carts model
module.exports = Carts;
