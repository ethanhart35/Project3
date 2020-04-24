import React, { Component } from 'react';
// import { Line } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import API from '../../utils/API'

const temp = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'open',
            fill: false,
            borderColor: 'rgba(75,0,192,1)',
            data: [65, 59, 80, 81, 56, 55, 40],
        }, {
            label: 'high',
            fill: false,
            borderColor: 'rgba(0,0,192,1)',
            data: [65, 20, 80, 40, 56, 30, 0]
        }, {
            label: 'low',
            fill: false,
            borderColor: 'rgba(0,192,0,1)',
            data: [100, 59, 80, 88, 56, 55, 50]
        }, {
            label: 'close',
            fill: false,
            borderColor: 'rgba(0,192,0,1)',
            data: [100, 59, 80, 88, 56, 55, 50]
        }, {
            label: 'volume',
            fill: false,
            borderColor: 'rgba(0,192,0,1)',
            data: [100, 59, 80, 88, 56, 55, 50]
        }
    ]
};

class Graph extends Component {

    generateStock(e) {
        e.preventDefault()

        // the API timeInterval name and the JSON data recovery timeInterval name are different and need to be
        // changed in order for data processing
        let dataInterval = []
        switch (this.refs.time.value) {
            case "Time_Series_Daily":
                dataInterval = "Time Series (Daily)"
                break;
            case "Time_Series_Weekly":
                dataInterval = "Time Series (Weekly)"
                break;
            case "Time_Series_Monthly":
                dataInterval = "Time Series (Monthly)"
                break;
        }

        // search API using name and a time interval for options
        API.searchStock(this.refs.time.value, this.refs.name.value)
            .then(function (APIdata) {
                console.log(APIdata)

                let stockData = APIdata.data[dataInterval]

                let labels = [];
                let open = [];
                let high = [];
                let low = [];
                let close = [];
                let volume = [];

                console.log(stockData)
                Object.entries(stockData).map((entry) => {
                    labels.push(entry[0]);
                    open.push(entry[1]["1. open"]);
                    high.push(entry[1]["2. high"]);
                    low.push(entry[1]["3. low"]);
                    close.push(entry[1]["4. close"]);
                    volume.push(entry[1]["5. volume"])
                }
                )
                console.log(Labels)
                console.log(open)
                console.log(high)
                console.log(low)
                console.log(volume)

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
                    <input type='submit' value='Submit' />
                </form>

                <div >
                    <Line
                    // data={graphData}
                    // options={options}
                    />
                </div>
            </div>
        )
    }

}

export default Graph