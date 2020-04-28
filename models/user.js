const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userData: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    stockData: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            purchaseValue: { type: Number, required: true },
        }
    ]

});

const User = mongoose.model("User", userSchema);

module.exports = User;
