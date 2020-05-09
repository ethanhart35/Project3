const User = require("../models/user")

module.exports = {

    buyStock: function (req, res) {
        const { name, quantity, id } = req.body
        User.findById(id).then(user => {
            console.log(user)
            console.log(name+quantity)
        })
    },

    sellStock: function (req, res ) {
        const { name, quantity, id } = req.body
        User.findById(id).then(user => {
            console.log(user)
            console.log(name+quantity)
        })
    }

}