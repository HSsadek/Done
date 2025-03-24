const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/Users");

/**
 * @desc Get All users
 * @route /api/users
 * @method GET
 * @access public
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc Get user By Id
 * @route GET /api/users/:id
 * @method GET
 * @access public
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc Create New user
 * @route POST /api/users
 * @method POST
 * @access public
 */
router.post("/", async (req, res) => {
  const { error } = validateCreateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc Update a user
 * @route PUT /api/users/:id
 * @method PUT
 * @access public
 */
router.put("/:id", async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User has been updated", updatedUser: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc Delete a user
 * @route DELETE /api/users/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User has been deleted", deletedUser: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Validate Create User
function validateCreateUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    lastName: Joi.string().trim().min(3).max(200).required(),
    mobileNumber: Joi.string().trim().pattern(/^\d{10,15}$/).required(),
    address: Joi.string().trim().min(5).max(100).required(),
    email: Joi.string().trim().email().required(),
    website_url: Joi.string().trim().uri().optional(),
    country: Joi.string().trim().required(),
    state: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    postal_code: Joi.string().trim().pattern(/^\d{4,10}$/).required(),
  });

  return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).optional(),
    lastName: Joi.string().trim().min(3).max(200).optional(),
    mobileNumber: Joi.string().trim().pattern(/^\d{10,15}$/).optional(),
    address: Joi.string().trim().min(5).max(100).optional(),
    email: Joi.string().trim().email().optional(),
    website_url: Joi.string().trim().uri().optional(),
    country: Joi.string().trim().optional(),
    state: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    postal_code: Joi.string().trim().pattern(/^\d{4,10}$/).optional(),
  });

  return schema.validate(obj);
}

module.exports = router;