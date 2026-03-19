const mongoose = require("mongoose");
const Notification = require("./models/Notification");

mongoose.connect("mongodb://127.0.0.1:27017/event_dashboard")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const test = async () => {
  try {
    //  clear old notifications
    await Notification.deleteMany({});
    console.log("Old notifications cleared");

    // fake user id (replace with real one from DB if available)
    const userId = "69bbd5e76e11b183f524b665";

    // create notification
    const notif = await Notification.create({
      user: userId,
      message: "Test notification working!"
    });

    console.log("Notification created:", notif);

    // fetch notifications
    const data = await Notification.find({ user: userId });

    console.log("Fetched notifications:", data);

    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

test();