const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 3, maxlength: 200 },
  lastName: { type: String, required: true, minlength: 3, maxlength: 200 },
  mobileNumber: { type: String, required: true, match: /^\d{10,15}$/ },
  address: { type: String, required: true, minlength: 5, maxlength: 100 },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  website_url: { type: String, match: /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.+)?$/ },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  postal_code: { type: String, required: true, match: /^\d{4,10}$/ },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };