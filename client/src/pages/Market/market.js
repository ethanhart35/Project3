import React, { Component } from 'react';
import Graph from '../../components/Graph'
import API from '../../utils/API';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

class Market extends Component {
    constructor(props) {
        super(props)

    }

    state = {
        staticStock: [
            {
                name: "Corporation",
                quantity: 100,
                ticker: "HSS"
            }, {
                name: "Local buisness",
                quantity: 50,
                ticker: "sHS"
            }, {
                name: "Lemonade stand",
                quantity: 10,
                ticker: "TTS"
            }
        ],
        user: this.props.user
    }

    componentDidMount() {
        console.log(this.state)
        // this.loadStocks(this.props)
    }

    loadStocks(data) {
        console.log(data)
        this.setState({ user: data })
        console.log(this.state)
    }

    buyStocks(e, name, quantity) {
        e.preventDefault()
        API.buyStock({ name, quantity })
    }


    render() {
        return (
            <div>
                <Carousel responsive={responsive}>
                    {   // user specific 
                        this.state.user.stockData.map((stock, i) => {
                            // if (!this.state.user.stockData === undefined) {
                            //     return 
                            // }
                            return <div className="col p-2 m-3 border">
                                <div key={i}>
                                    <h2>{stock.ticker}</h2>
                                    <p className="text-muted">{stock.name}</p>
                                </div>
                            </div>
                        })
                    }
                    {   // static stock data
                        this.state.staticStock.map((stock, i) => (
                            <div className="col p-2 m-3 border">
                                <div key={i}>
                                    <h2>{stock.ticker}</h2>
                                    <p className="text-muted">{stock.name}</p>
                                </div>
                            </div>
                        ))
                    }
                    <div>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                    <div>Item 4</div>
                </Carousel>;
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