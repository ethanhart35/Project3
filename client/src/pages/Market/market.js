import React, { Component } from 'react';
import Graph from '../../components/Graph'
import API from '../../utils/API';


class Market extends Component {

    buyStocks(e, name, quantity) {
        e.preventDefault()

        API.buyStock({ name , quantity })
    }

    render() {
        return (
            <div>
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