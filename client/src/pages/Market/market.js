import React, { Component } from 'react';
import Graph from '../../components/Graph'
import API from '../../utils/API';

// both are needed
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Display from '../../components/marketDisplay/display';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 8,
        slidesToSlide: 3
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        slidesToSlide: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
        slidesToSlide: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 2
    }
};

class Market extends Component {
    constructor(props) {
        super(props)

    }

    state = {
        test: "test",
        search: [],
        staticStock: [
            {
                name: "Corporation",
                quantity: 100,
                ticker: "IBM"
            }, {
                name: "Local buisness",
                quantity: 50,
                ticker: "sHS"
            }, {
                name: "Lemonade stand",
                quantity: 10,
                ticker: "TTS"
            }, {
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
            }, {
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
        // user: this.props.user
    }

    // to be used in the carosell to search all the tickers and give back percentage changes
    // cant work becouse limited API calls
    loadStocks(data) {
        console.log(data)
        this.setState({ user: data })
        console.log(this.state)
    }

    // api the stock and display data on the graph
    loadGraph(e, ticker, time) {
        e.preventDefault()
        if (ticker === "") { return false }

        API.graphStockSearch(ticker, time).then(res => {
            if (res.data.Note !== undefined || res.data["Error Message"] !== undefined) {
                console.log("Invalid or over API key call limit")
                return false
            }
            // the API timeInterval name and the JSON data recovery timeInterval name are different and need to be
            // changed in order so variables can be grabbed later
            let dataInterval = []
            switch (time) {
                case "Time_Series_Daily":
                    dataInterval = "Time Series (Daily)"
                    break;
                case "Time_Series_Weekly":
                    dataInterval = "Weekly Time Series"
                    break;
                case "Time_Series_Monthly":
                    dataInterval = "Monthly Time Series"
                    break;
                default:
            }

            this.setState({ APIdata: res.data[dataInterval] })
        })
    }

    googleStock(e, search) {
        e.preventDefault()
        let currentComponent = this
        API.searchStock(search).then(res => {
            currentComponent.setState({ search: res.data.bestMatches })
        })
    }

    // api search current price, calculate and then api.buy to change user data accordingly
    buyStock(e, name, quantity) {
        e.preventDefault()
        if (this.props.user._id === undefined) return false;

        let id = this.props.user._id
        let stats = { name, quantity, id }
        API.buyStock(stats)
    }

    // api search current price, calculate then api.sell to change user data acordingly
    sellStock(e, name, quantity) {
        e.preventDefault()
        if (this.props.user._id === undefined) return false;

        let id = this.props.user._id
        let stats = { name, quantity, id }
        API.sellStock(stats)
    }

    render() {
        return (
            <div>
                <Carousel responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    // showDots={true}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    // autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {   // user specific 
                        this.props.user.stockData.map((stock, i) => {
                            return <div className="col p-2 m-3 border bg-sucess">
                                <div key={i}>
                                    <h2>{stock.ticker}</h2>
                                    <p className="text-muted">{stock.name}</p>
                                    <p cl></p>
                                </div>
                            </div>
                        })
                    }
                    {   // static stock data
                        this.state.staticStock.map((stock, i) => {
                            return <a onClick={e => this.loadGraph(e, stock.ticker, this.refs.time.value)}>
                                <div className="col p-2 m-3 border bg-danger">
                                    <div key={i}>
                                        <h2>{stock.ticker}</h2>
                                        <p className="text-muted">{stock.name}</p>
                                    </div>
                                </div>
                            </a>
                        })
                    }
                </Carousel>

                <Display data={this.state.APIdata} />

                {/* <div>
                    <form className="form-inline border p-2 m-2" onSubmit={e =>
                        this.buyStock(e, this.refs.name1.value, this.refs.quantity1.value)}>
                        <h2>Buy Stocks</h2>
                        <div className="form-group">
                            <label>Stock Name</label>
                            <input className="form-control" ref="name1" placeholder="Enter stock tag" />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input className="form-control" type="number" ref="quantity1" placeholder="Enter stock quantity" />
                        </div>
                        <button type="submit" className="btn btn-primary">Buy</button>
                    </form>
                </div>

                <div>
                    <form className="form-inline border p-2 m-2" onSubmit={e =>
                        this.sellStock(e, this.refs.name2.value, this.refs.quantity2.value)}>
                        <h2>Sell Stocks</h2>
                        <div className="form-group">
                            <label>Stock Name</label>
                            <input className="form-control" ref="name2" placeholder="Enter stock tag" />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input className="form-control" type="number" ref="quantity2" placeholder="Enter stock quantity" />
                        </div>
                        <button type="submit" className="btn btn-primary">Buy</button>
                    </form>
                </div> */}

                {/* https://www.alphavantage.co/documentation/  SEARCH ENDPOINTS API call could help autofill the .refs.name      set it on a ticker so the call goes off as second or 2 after they stop typing */}
                <form className="form-inline" onSubmit={e => this.loadGraph(e, this.refs.ticker.value, this.refs.time.value)}>
                    <div className="form-group p-2">
                        <label for="ticker">Stock Label</label>
                        <input type='text' ref="ticker" />
                    </div>
                    <div className="form-group p-2">
                        <label for="time">Choose a timeframe:</label>
                        <select ref="time">
                            <option value="Time_Series_Daily">Daily</option>
                            <option value="Time_Series_Weekly">Weekly</option>
                            <option value="Time_Series_Monthly">Monthly</option>
                        </select>
                    </div>

                    <input type='submit' value='Submit' />
                </form>

                <form onSubmit={e => this.googleStock(e, this.refs.search.value)}>
                    <lablel>Ticker Search</lablel>
                    <input type="text" ref="search"></input>
                    <input type='submit' value='Submit' />
                </form>

                {this.state.search.map((google, i) => (
                    <div key={i} className="border container-fluid">
                        <div className="row">
                            <div className="col">
                                {google["1. symbol"]}
                            </div>
                            <div className="col">
                                {google["2. name"]}
                            </div>
                            <div className="col">
                                {google["3. type"]}
                            </div>
                            <div className="col">
                                {google["4. region"]}
                            </div>
                        </div>
                    </div>
                ))}

                <Graph APIdata={this.state.APIdata} />
            </div>
        )
    }
}

export default Market