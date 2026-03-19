const mongoose = require("mongoose");
const User = require("./models/user");

mongoose.connect("mongodb://127.0.0.1:27017/event_dashboard")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const createUser = async () => {
  try {
    const user = await User.create({
      name: "Demo User",
      email: "demo@test.com",
      password: "123456",
      role: "user"
    });

    console.log("User Created:");
    console.log(user);

    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

createUser();