// // models/Otp.js

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db.config.js');

// const Otp = sequelize.define('Otp', {
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Users',
//       key: 'id'
//     }
//   },
//   otp: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });

// Otp.belongsTo(User, { foreignKey: 'userId' });



// module.exports = Otp;


// models/otp.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const OTP = sequelize.define('OTP', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

(async () => {
    try {
      await sequelize.sync();
      console.log('OTP Database synchronized successfully');
    } catch (error) {
      console.error('Error synchronizing database:', error);
    }
  })();

module.exports = OTP;
