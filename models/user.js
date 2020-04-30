const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    stockData: [
        {
            name: { type: String },
            quantity: { type: Number },
            purchaseValue: { type: Number },
        }
    ]

});

const User = mongoose.model("User", userSchema);

module.exports = User;
