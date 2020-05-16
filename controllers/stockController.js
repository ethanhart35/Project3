const User = require("../models/user")

// ================================================================
// OLD AND OUTDATED
// ===================================================================

module.exports = {

    buyStock: function (req, res) {
        const { name, quantity, id } = req.body
        User.findById(id).then(user => {
            console.log(user)
            console.log(name + quantity)
        })
    },

    sellStock: function (req, res) {
        const { name, quantity, id } = req.body
        User.findById(id).then(user => {
            console.log(user)
            console.log(name + quantity)
        })
    },

    vendStock: function (req, res) {
        const { name, price, id } = req.body
        User.findById(id).then(user => {
            console.log(user)

        })
    }

}