import User from "../mongodb/models/user.js";

// API to get all current users.
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).limit(req.query._end);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API to create new user
const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    console.log("trying to create user");

    // We find the user based on their email.
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(200).json(userExists);

    // If user doesn't exist, we create a new one:
    const newUser = await User.create({ name, email, avatar });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API to get detailed user info
const getUserInfoByID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }).populate("allProperties");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export { getAllUsers, createUser, getUserInfoByID };
