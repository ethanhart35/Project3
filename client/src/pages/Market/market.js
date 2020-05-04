import React, { Component } from 'react';
import Graph from '../../components/Graph'
import API from '../../utils/API';

class Market extends Component {

    state = {
        staticStock: [
            {
                name: "this test",
                quantity: 100,
                ticker: "HSS"
            }, {
                name: "this test2",
                quantity: 50,
                ticker: "sHS"
            }, {
                name: "this test3",
                quantity: 10,
                ticker: "TTS"
            }
        ],
        user: this.props.user
    }

    componentDidMount() {
        this.loadStocks()
    }

    loadStocks() {
        console.log("tick")
        console.log(this.state.user)
    }

    buyStocks(e, name, quantity) {
        e.preventDefault()
        API.buyStock({ name, quantity })
    }



    render() {
        return (
            <div>
                <div className="row">
                    {   // user specific 
                        this.state.user.stockData.map((stock, i) => (
                            <div className="col p-3 m-3 border">
                                <div key={i}>
                                    <h2>{stock.ticker}</h2>
                                    <p className="text-muted">{stock.name}</p>
                                </div>
                            </div>
                        ))
                    }
                    {   // static stock data
                        this.state.staticStock.map((stock, i) => (
                            <div className="col p-3 m-3 border">
                                <div key={i}>
                                    <h2>{stock.ticker}</h2>
                                    <p className="text-muted">{stock.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <form className="form-inline border p-2 m-2" onSubmit={e => this.buyStocks(e, this.refs.name.value, this.refs.quantity.value)}>
                        <h2>Buy Stocks</h2>
                        <div className="form-group">
                            <label>Stock Name</label>
                            <input className="form-control" ref="name" placeholder="Enter stock tag" />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input className="form-control" type="number" ref="quantity" placeholder="Enter stock quantity" />
                        </div>
                        <button type="submit" className="btn btn-primary">Buy</button>
                    </form>
                </div>
                <Graph />
            </div>
        )
    }
}

export default Market