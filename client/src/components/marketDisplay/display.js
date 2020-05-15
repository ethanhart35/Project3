import React, { Component } from "react";
import API from "../../utils/API"

class Display extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        name: "",
        quantity: 0,
        open: 1,
        high: 2,
        low: 3,
        close: 4,
        volume: 5
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.renderDisplay()
        }
    }

    // parse props to update what stock is being displayed, setstate at the end
    renderDisplay() {
        let lastRefreshed = this.props.meta["3. Last Refreshed"].slice(0,10)
        console.log(lastRefreshed)
        let today = this.props.data[lastRefreshed]
        let average = ((Number(today["2. high"]) + Number(today["3. low"])) / 2).toFixed(4)
        console.log(average)
        this.setState({
            name: this.props.meta["2. Symbol"],
            worth: this.props.user.worth,
            average: average,
            open: today["1. open"],
            high: today["2. high"],
            low: today["3. low"],
            close: today["4. close"],
            volume: today["5. volume"]
        })
    }

    setPrice(e, quantity) {
        e.preventDefault()
        let price = (Number(this.state.average) * Number(quantity)).toFixed(4)
        this.setState({price: price, quantity: quantity})
    }

    vend(e) {
        e.preventDefault()

        let id = this.props.user._id
        let name = this.props.meta["2. Symbol"].toString()
        let vendPrice = this.state.price
        let vendQuantity = this.state.quantity

        let stats = { name, vendPrice, vendQuantity ,id }
        API.vendStock(stats).then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col">
                        <h3>Company Name: {this.state.name}</h3>
                    </div>
                    <div className="col">
                        <h5>Average (high+over/2): {this.state.average}</h5>
                    </div>
                    <div className="col">
                        <h5>Price: {this.state.price}$</h5>
                    </div>
                    <div className="col">
                        <form onSubmit={e => this.vend(e)}>
                            <input type="number" ref="quantity" onChange={e => this.setPrice(e, this.refs.quantity.value)} />
                            <button>Vend Stocks</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h5>Open: {this.state.open}</h5>
                    </div>
                    <div className="col">
                        <h5>High: {this.state.high}</h5>
                    </div>
                    <div className="col">
                        <h5>Low: {this.state.low}</h5>
                    </div>
                    <div className="col">
                        <h5>Close: {this.state.close}</h5>
                    </div>
                    <div className="col">
                        <h5>Volume: {this.state.volume}</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default Display