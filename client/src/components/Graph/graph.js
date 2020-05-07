import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import API from '../../utils/API'

class Graph extends Component {
    constructor() {
        super()
        this.state = {
            graphData: {
                labels: ["Day Before", "Yesterday", "Today", "Tommorow", "Day After"],
                datasets: [
                    {
                        label: 'open',
                        fill: false,
                        borderColor: 'rgba(148,0,211,1)',
                        data: [1, 2, 3, 3, 3]
                    }, {
                        label: 'high',
                        fill: false,
                        borderColor: 'rgba(0,0,255,1)',
                        data: [1, 3, 4, 2, 5]
                    }, {
                        label: 'low',
                        fill: false,
                        borderColor: 'rgba(255,255,0,1)',
                        data: [1, 3, 2, 4, 5]
                    }, {
                        label: 'close',
                        fill: false,
                        borderColor: 'rgba(255,0,0,1)',
                        data: [1, 2, 2, 3, 3]
                    }, {
                        label: 'volume',
                        fill: false,
                        borderColor: 'rgba(0,192,0,1)',
                        data: [1, 2, 3, 4, 5]
                    }
                ]
            }
        }
    }


    generateStock(e) {
        e.preventDefault()
        // this.setstate cant use 'this' whist in the API.search callback, this is the fix
        let currentComponent = this

        if(this.refs.name.value===""){
            return false;
        }

        // the API timeInterval name and the JSON data recovery timeInterval name are different and need to be
        // changed in order so variables can be grabbed later
        let dataInterval = []
        switch (this.refs.time.value) {
            case "Time_Series_Daily":
                dataInterval = "Time Series (Daily)"
                break;
            case "Time_Series_Weekly":
                dataInterval = "Weekly Time Series"
                break;
            case "Time_Series_Monthly":
                dataInterval = "Monthly Time Series"
                break;
        }

        // search API using name and a time interval for options
        API.graphStockSearch(this.refs.time.value, this.refs.name.value)
            .then(function (APIdata) {
                // all the actual numbers "meta data" also has useful information to be used (eventually)
                let stockData = APIdata.data[dataInterval]
                console.log(APIdata)
                console.log(APIdata.data[0])
                console.log(APIdata.data[1])

                let label = [];
                let open = [];
                let high = [];
                let low = [];
                let close = [];
                let volume = [];

                var graphData = {
                    labels: label,
                    datasets: [
                        {
                            label: 'open',
                            fill: false,
                            borderColor: 'rgba(148,0,211,1)',
                            data: open
                        }, {
                            label: 'high',
                            fill: false,
                            borderColor: 'rgba(0,0,255,1)',
                            data: high
                        }, {
                            label: 'low',
                            fill: false,
                            borderColor: 'rgba(255,255,0,1)',
                            data: low
                        }, {
                            label: 'close',
                            fill: false,
                            borderColor: 'rgba(255,0,0,1)',
                            data: close
                        }, {
                            label: 'volume',
                            fill: false,
                            borderColor: 'rgba(0,192,0,1)',
                            data: volume
                        }
                    ]
                };

                Object.entries(stockData).map((entry) => {
                    label.push(entry[0]);

                    if(currentComponent.refs.volume.value === "Volume"){
                        volume.push(entry[1]["5. volume"])
                    } else {
                        open.push(entry[1]["1. open"]);
                        high.push(entry[1]["2. high"]);
                        low.push(entry[1]["3. low"]);
                        close.push(entry[1]["4. close"]);
                    }
                }
                )

                label.reverse()
                open.reverse()
                high.reverse()
                low.reverse()
                close.reverse()
                volume.reverse()

                currentComponent.setState({
                    graphData: graphData
                })

            })

    }

    render() {
        return (
            <div>
                <br></br><br></br>
                <form className="form-inline" onSubmit={this.generateStock.bind(this)}>
                    <div class="form-group p-2">
                        <label for="name">Stock Label</label>
                        <input type='text' ref="name" />
                    </div>
                    <div className="form-group p-2">
                        <label for="time">Choose a timeframe:</label>
                        <select ref="time">
                            <option value="Time_Series_Daily">Daily</option>
                            <option value="Time_Series_Weekly">Weekly</option>
                            <option value="Time_Series_Monthly">Monthly</option>
                        </select>
                    </div>
                    <div className="form-group p-2">
                        <label for='volume'>Display</label>
                        <select ref="volume">
                            <option value="Volume">Volume</option>
                            <option>High/Low/Open/Close</option>
                        </select>
                    </div>

                    <input type='submit' value='Submit' />
                </form>
                <Line
                    data={this.state.graphData}
                />
            </div>
        )
    }

}

export default Graph