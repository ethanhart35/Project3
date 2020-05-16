const router = require("express").Router();
const User = require("../models/user")

router.route("/vend")
    .post((req, res) => {
        const { name, vendPrice, vendQuantity, id } = req.body

        User.findOne({ _id: id }, (err, user) => {
            if (err) throw err;

            // find already saved data and update
            let ownedStocks = false
            let index = 0
            for (var i = 0; i < user.stockData.length; i++) {
                if (user.stockData[i].name === name) {
                    ownedStocks = true
                    index = i
                }
            }

            // if saved update
            if (ownedStocks) {
                let prevQuantity = Number(user.stockData[index].quantity)
                let newQuantity = Number(vendQuantity)
                let updateQuantity = prevQuantity += newQuantity

                let prevValue = Number(user.stockData[index].purchaseValue)
                let newValue = Number(vendPrice)
                let updateValue = prevValue += newValue

                user.stockData[index].quantity = updateQuantity
                user.stockData[index].purchaseValue = updateValue

                // if not saved create a new stock
            } else {
                let quantity = vendQuantity
                let purchaseValue = vendPrice
                let stock = { name, quantity, purchaseValue }

                user.stockData.push(stock)
            }

            // corrects users networth
            let netWorth = user.worth + - vendPrice
            user.worth = netWorth

            // saves all the changed data to mongo
            user.save()

            // returns updated data, its not calling new data from mongo, just forwarding the data
            // that was sent back for editing
            res.json(user)
        })
    })

module.exports = router;
