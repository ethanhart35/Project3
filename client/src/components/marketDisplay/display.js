import React, { Component } from "react";

class Display extends Component {
    constructor(props){
        super(props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("tick")
        if (this.props.data !== prevProps.data) {
            console.log("tick2")
            console.log(this.props)
            // this.reGenerateGraph()
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col">

                    </div>
                </div>
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>
        )
    }
}

export default Display