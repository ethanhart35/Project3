const User = require("../models/user")

module.exports = {

    buyStock: function (req, res) {
        const { name, quantity } = req.body
        console.log(req.body)
        User
    }

}