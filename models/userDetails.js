const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config.js');
const User = require('./auth.js');
 // Import your Sequelize instance



const userDetails = sequelize.define('userDetails', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    second_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING,
        required: true
    },
});

userDetails.belongsTo(User, { foreignKey: 'userId' });

// Sync the model with the database (create the table)
(async () => {
  try {
    await sequelize.sync();
    console.log('Details Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

module.exports = userDetails;
