import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

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
                        yAxisID: 'A',
                        data: [1, 2, 3, 3, 3]
                    }, {
                        label: 'high',
                        fill: false,
                        borderColor: 'rgba(0,0,255,1)',
                        yAxisID: 'A',
                        data: [1, 3, 4, 2, 5]
                    }, {
                        label: 'low',
                        fill: false,
                        borderColor: 'rgba(255,255,0,1)',
                        yAxisID: 'A',
                        data: [1, 3, 2, 4, 5]
                    }, {
                        label: 'close',
                        fill: false,
                        borderColor: 'rgba(255,0,0,1)',
                        yAxisID: 'A',
                        data: [1, 2, 2, 3, 3]
                    }, {
                        label: 'volume',
                        fill: false,
                        borderColor: 'rgba(0,192,0,1)',
                        yAxisID: 'B',
                        data: [1, 2, 3, 4, 5]
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        id: 'A',
                        type: 'linear',
                        position: 'left',
                    }, {
                        id: 'B',
                        type: 'linear',
                        position: 'right',
                        // ticks: {
                        //     max: 20000000,
                        //     min: 0
                        // }
                    }]
                }
            }
        }
    }

    // when input new data, run the graphdataparsing if its new.
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.APIdata !== prevProps.APIdata) {
            this.reGenerateGraph()
        }
    }

    reGenerateGraph() {
        let label = [];
        let open = [];
        let high = [];
        let low = [];
        let close = [];
        let volume = [];

        Object.entries(this.props.APIdata).map((entry) => {
            label.push(entry[0]);
            open.push(entry[1]["1. open"]);
            high.push(entry[1]["2. high"]);
            low.push(entry[1]["3. low"]);
            close.push(entry[1]["4. close"]);
            volume.push(entry[1]["5. volume"])
        }
        )

        label.reverse()
        open.reverse()
        high.reverse()
        low.reverse()
        close.reverse()
        volume.reverse()

        var newData = {
            labels: label,
            datasets: [
                {
                    label: 'open',
                    fill: false,
                    borderColor: 'rgba(148,0,211,1)',
                    yAxisID: 'A',
                    data: open
                }, {
                    label: 'high',
                    fill: false,
                    borderColor: 'rgba(0,0,255,1)',
                    yAxisID: 'A',
                    data: high
                }, {
                    label: 'low',
                    fill: false,
                    borderColor: 'rgba(255,255,0,1)',
                    yAxisID: 'A',
                    data: low
                }, {
                    label: 'close',
                    fill: false,
                    borderColor: 'rgba(255,0,0,1)',
                    yAxisID: 'A',
                    data: close
                }, {
                    label: 'volume',
                    fill: false,
                    borderColor: 'rgba(0,192,0,1)',
                    yAxisID: 'B',
                    data: volume
                }
            ]
        };

        this.setState({
            graphData: newData
        })
    }


    render() {
        return (
            <div>
                <Line
                    data={this.state.graphData}
                    options={this.state.options}
                />
            </div>
        )
    }

}

export default Graph