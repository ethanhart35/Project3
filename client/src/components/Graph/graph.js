import React, { Component } from 'react';
import reactDom from 'react-dom'
// import { Line } from 'react-chartjs-2';
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
                        borderColor: 'rgba(75,0,192,1)',
                        data: [1, 2, 3, 3, 3]
                    }, {
                        label: 'high',
                        fill: false,
                        borderColor: 'rgba(0,0,192,1)',
                        data: [1, 3, 4, 2]
                    }, {
                        label: 'low',
                        fill: false,
                        borderColor: 'rgba(0,192,0,1)',
                        data: [1, 3, 2, 4, 5]
                    }, {
                        label: 'close',
                        fill: false,
                        borderColor: 'rgba(0,192,0,1)',
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
        // API call cant use 'this' whist in the callback this is the fix
        let currentComponent = this

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
        API.searchStock(this.refs.time.value, this.refs.name.value)
            .then(function (APIdata) {

                // all the actual numbers "meta data" also has useful information to be used (eventually)
                let stockData = APIdata.data[dataInterval]

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
                            borderColor: 'rgba(75,0,192,1)',
                            data: open
                        }, {
                            label: 'high',
                            fill: false,
                            borderColor: 'rgba(0,0,192,1)',
                            data: high
                        }, {
                            label: 'low',
                            fill: false,
                            borderColor: 'rgba(0,192,0,1)',
                            data: low
                        }, {
                            label: 'close',
                            fill: false,
                            borderColor: 'rgba(0,192,0,1)',
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
                    open.push(entry[1]["1. open"]);
                    high.push(entry[1]["2. high"]);
                    low.push(entry[1]["3. low"]);
                    close.push(entry[1]["4. close"]);
                    // this one is missing its decimal and also skews the graph so the others are invisible
                    if(currentComponent.refs.volume.checked){
                        volume.push(entry[1]["5. volume"].slice(0, 3) + '.' + entry[1]["5. volume"].slice(3))
                    }
                }
                )
                
                currentComponent.setState({
                    graphData: graphData
                })

            })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.generateStock.bind(this)}>
                    <div>
                        <label for="name">Stock Label</label>
                        <input type='text' ref="name" />
                    </div>
                    <div>
                        <label for="time">Choose a timeframe:</label>
                        <select id="time" ref="time">
                            <option value="Time_Series_Daily">Daily</option>
                            <option value="Time_Series_Weekly">Weekly</option>
                            <option value="Time_Series_Monthly">Monthly</option>
                        </select>
                    </div>
                    <div>
                        <input type="checkbox" name="volume" ref='volume' />
                        <label for='volume'>Display Volume?</label>
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