const Notification = require("../models/Notification");

const createNotification = async (userId, message) => {
  try {
    const notification = await Notification.create({
      user: userId,
      message
    });

    return notification;
  } catch (err) {
    console.error("Notification Error:", err.message);
  }
};

module.exports = {
  createNotification
};