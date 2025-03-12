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
      country: { 
        type: String, 
        required: true, 
        default:"India" 
      }, 
      city: { 
        type: String, 
        required: true 
      },
      address1: { 
        type: String, 
        required: true 
      }, 
      address2: { 
        type: String 
      }, 
      zipCode: { 
        type: Number, 
        required: true, 
        validate: {
          validator: function(v) {
            return /^\d{6}$/.test(v);
          } }
        },
      addressType: { 
        type: String, 
        required: true, 
        enum: ['Home', 'Office'] 
      }, 
    },
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cart"
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        }
    ]
});

const UserModel = mongoose.model("usercollection", userSchema);
module.exports = { UserModel };
