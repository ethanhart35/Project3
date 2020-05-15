const router = require("express").Router();
const User = require("../models/user")

router.route("/vend")
    .post((req, res) => {
        const { name, vendPrice, vendQuantity, id } = req.body
        User.findById(id).then(user => {

            // find already saved data and update
            var ownedStocks = false
            for (var i = 0; i < user.stockData.length; i++) {
                if (user.stockData[i].name === name) {
                    ownedStocks = true

                    let quantity = Number(user.stockData[i].quantity) += Number(vendQuantity)
                    let purchaseValue = Number(user.stockData[i].purchaseValue) += Number(vendPrice)

                    console.log(quantity+" "+purchaseValue)
                    // User.updateOne({ _id: id, "stockData.name": name }, {
                    //     '$set': {
                    //         'stockData.$.quantity': quantity,
                    //         'stockData.$.purchaseValue': purchaseValue
                    //     }
                    // }).then(res => console.log(res))

                    User.update({ "_id": id, "stockData.name": name }
                        , {
                            '$set': {
                                'stockData.$.quantity': quantity,
                                'stockData.$.purchaseValue': purchaseValue
                            }
                        }
                    ).then(res => console.log(res))

                    console.log("stock updated")
                }
            }

            // if not saved create a new stock
            if (!ownedStocks) {
                console.log("creating new stock")

                let quantity = vendQuantity
                let purchaseValue = vendPrice
                let stock = { name, quantity, purchaseValue }

                user.stockData.push(stock)
                user.save()
            }

            // corrects users networth
            let netWorth = user.worth + -vendPrice
            User.findByIdAndUpdate({ _id: id }, { $push: { worth: netWorth } })
            console.log("networth changed")
        })
    })

module.exports = router;
