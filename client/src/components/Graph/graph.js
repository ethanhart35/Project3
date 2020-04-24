import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import API from '../../utils/API'

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class Graph extends Component {

    generateStock(e) {
        e.preventDefault()
        
        API.searchStock( this.refs.time.value , this.refs.name.value )
        .then(data => console.log(data))
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
                            <option value="TIME_SERIES_DAILY">Daily</option>
                            <option value="TIME_SERIES_WEEKLY">Weekly</option>
                            <option value="TIME_SERIES_MONTHLY">Monthly</option>
                        </select>
                    </div>
                    <input type='submit' value='Submit' />
                </form>
                <div >
                    <Line data={data} />
                </div>
            </div>
        )
    }

}

export default Graph