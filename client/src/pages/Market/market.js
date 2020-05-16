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
    state = {
        test: "test",
        search: [],
        hold: [
            {
                quantity: 100,
                ticker: "IBM"
            }, {
                quantity: 50,
                ticker: "AAPL"
            }, {
                quantity: 10,
                ticker: "TTS"
            }, {
                quantity: 100,
                ticker: "GOOG"
            }, {
                quantity: 50,
                ticker: "WMT"
            }, {
                quantity: 80,
                ticker: "EA"
            }, {
                quantity: 20,
                ticker: "MDO.BER"
            }, {
                quantity: 40,
                ticker: "WMT"
            }
        ],
        staticStock: [
            {
                quantity: 100,
                ticker: "IBM"
            }, {
                quantity: 50,
                ticker: "AAPL"
            }, {
                quantity: 10,
                ticker: "TTS"
            }, {
                quantity: 100,
                ticker: "GOOG"
            }, {
                quantity: 50,
                ticker: "WMT"
            }, {
                quantity: 80,
                ticker: "EA"
            }, {
                quantity: 20,
                ticker: "MDO.BER"
            }, {
                quantity: 40,
                ticker: "WMT"
            }
        ],
    }

    // checks for user, and updates staticStock or UserStocks when mounting
    componentDidMount() {
        if (this.props.user.name === "Guest" && this.staticStock === []) {
            console.log("componentMount Guest data")
            this.setState({ staticStock: this.state.hold })
        }
        if (this.props.user.name !== "Guest" && this.state.staticStock !== []) {
            console.log("componentMount User data")
            this.setState({ staticStock: [] })
        }
    }

    // renders staticstocks + unrenders userStocks if the user logs out while on market page
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.user.name !== prevProps.user.name){
            this.setState({staticStock: this.state.hold})
        }
    }

    // api the stock and display data on the graph
    loadGraph(e, ticker, time) {
        e.preventDefault()
        console.log(ticker)
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
            console.log(res)
            this.setState({ APIdata: res.data[dataInterval], meta: res.data["Meta Data"], search: [] })
        })
    }

    googleStock(e, search) {
        e.preventDefault()
        let currentComponent = this
        if (search === "") return false
        API.searchStock(search).then((res, err) => {
            if (err) throw err
            console.log(res)
            if (res.data.bestMatches.length === 0 || res.data.Note !== undefined) {
                console.log("stock search failure")
                return false
            }
            currentComponent.setState({ search: res.data.bestMatches })
        })
    }

    render() {
        return (
            <div>
                <h1></h1>
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
                    // removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {   // user specific 
                        this.props.user.stockData.map((stock, i) => (
                            <a key={i} onClick={e => this.loadGraph(e, stock.name, this.refs.time.value)}>
                                <div className="p-2 m-3 border">
                                    <h2 className="text-bold text-dark">{stock.name}</h2>
                                    <p className="text-muted">Owned:{stock.quantity}</p>
                                </div>
                            </a>
                        ))
                    }
                    {   // static stock data
                        this.state.staticStock.map((stock, i) => (
                            <a key={i} onClick={e => this.loadGraph(e, stock.ticker, this.refs.time.value)}>
                                <div className="p-2 m-3 border">
                                    <h2 className="text-bold text-dark">{stock.ticker}</h2>
                                    <p className="text-muted">Owned:{stock.quantity}</p>
                                </div>
                            </a>
                        ))
                    }
                </Carousel>

                {/* <form className="form-inline" onSubmit={e => this.loadGraph(e, this.refs.ticker.value, this.refs.time.value)}>
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
                </form> */}

                <form className="form-inline" onSubmit={e => this.googleStock(e, this.refs.search.value)}>
                    <div className="form-group p-2">
                        <lablel>Ticker Search</lablel>
                        <input type="text" ref="search"></input>
                        <input type='submit' value='Submit' />
                    </div>
                    <div className="form-group p-2">
                        <label for="time">Choose a timeframe:</label>
                        <select ref="time">
                            <option value="Time_Series_Daily">Daily</option>
                            <option value="Time_Series_Weekly">Weekly</option>
                            <option value="Time_Series_Monthly">Monthly</option>
                        </select>
                    </div>
                </form>

                {this.state.search.map((google, i) => (
                    <div key={i} className="border container-fluid" onClick={e => this.loadGraph(e, google["1. symbol"], this.refs.time.value)}>
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

                <Display
                    data={this.state.APIdata}
                    meta={this.state.meta}
                    user={this.props.user}
                    callback={this.props.callback}
                />

                <Graph APIdata={this.state.APIdata} />
            </div>
        )
    }
}

export default Market