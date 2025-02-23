const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        max: 16
    },
    addresses:[
    {
      country: { type: String, required: true, default:"India" }, // Country is mandatory
      city: { type: String, required: true }, // City is mandatory
      address1: { type: String, required: true }, // Address 1 is mandatory
      address2: { type: String }, // Address 2 is optional
      zipCode: { type: Number, required: true, 
        validate: {
          validator: function(v) {
            return /^\d{6}$/.test(v);
          } }
        }, // Zip code is mandatory and has a format check.
      addressType: { type: String, required: true, enum: ['Home', 'Office'] }, // Address type is mandatory and has a limited set of choices
    },
  ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cart"
        }
    ]
});

const UserModel = mongoose.model("usercollection", userSchema);
module.exports = { UserModel };
