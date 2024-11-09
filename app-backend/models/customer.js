const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  addresses: [
    {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  ],
  orderHistory: [
    {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
      items: [
        {
          foodItemId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      totalPrice: { type: Number, required: true },
      status: { type: String, default: "Pending" }, // Pending, Delivered, Cancelled, etc.
      orderedAt: { type: Date, default: Date.now },
      deliveredAt: { type: Date },
    },
  ],
  paymentMethods: [
    {
      cardNumber: { type: String, required: true },
      cardHolderName: { type: String, required: true },
      expiryDate: { type: String, required: true },
      cvv: { type: String, required: true },
      billingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
      },
    },
  ],
  favoriteRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
},
{
    collection: "customer", 
    timestamps: {
        createdAt: "createdAt", 
        updatedAt: "updatedAt", 
    }, 
}  
);

const Customer = mongoose.model("Customer", CustomerSchema); 

module.exports = {
    Customer
}
