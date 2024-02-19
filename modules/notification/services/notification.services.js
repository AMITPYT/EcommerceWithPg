// services/notificationService.js
const Notification = require('../../../models/notification');

async function sendNotification(userId, productName) {
    try {
      const message = `Your ${productName} has been successfully added to the cart`;
      // Create a notification record in the database
      await Notification.create({ userId, message });
      // Return success message or handle the sending process (e.g., push notification, email)
      return { success: true, message: 'Notification sent successfully' };
    } catch (error) {
      throw new Error('Error sending notification');
    }
  }

module.exports = { sendNotification };
