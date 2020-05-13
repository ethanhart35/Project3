import React, { Component } from 'react'

class Profile extends Component {


    render() {
        return (
            <div className="body">
                {/* <div className="jumbotron" style={{ textAlign: 'center' }}> */}
                    {/* <h1 className="display-4">FAUX FINANCE</h1> */}
                {/* </div> */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg">
                            <div className="username" style={{ margin: '0 0 1rem' }}>USERNAME</div>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" style={{ margin: '0 0 1rem' }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    My stock
                    </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                            <div className="acctval" style={{ margin: '0 0 1rem' }}>ACCOUNT VALUE</div>
                            <h5>Company Research Buy Stock</h5>
                            <h5>ticker symbol company name
                    <input type="search" className="search" />
                            </h5>
                        </div>
                        <div className="col-lg">
                            <div className="graph">placeholder for graph</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Profile
