const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Getting all
router.get("/", async (req, res) => {
  console.debug("Fetching all users.");
  try {
    users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getUser, async (req, res) => {
  res.send(res.user);
});

// Creating One
router.post("/", getUserByEmail, async (req, res) => {
  console.debug("Creating a new user");
  try {
    if (res.user) {
      console.debug("User already exist with this email");
      res.status(302).json(res.user);
    } else {
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getUser, (req, res) => {
  const user = new User(res.User);
  //user = req.body... ;
  console.debug("Updating record with id: " + id);
});

// Deleting One
router.delete("/:id", getUser, async (req, res) => {
  try {
    if (res.user) await res.user.remove();
    res.json({
      message: `The user with id ${req.params.id} is now deleted.`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
  } catch (err) {
    console.error(err.message);
    return res
      .status(404)
      .json({ message: `The user with id ${req.params.id} does not exist` });
  }
  res.user = user;
  next();
}

async function getUserByEmail(req, res, next) {
  console.log("getUserByEmail");
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
    console.log(user);
  } catch (err) {
    return res
      .status(404)
      .json({ message: `The user with id ${req.params.id} does not exist` });
  }
  res.user = user;
  next();
}

module.exports = router;
