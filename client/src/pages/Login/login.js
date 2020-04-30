import React, { Component } from 'react';
import API from '../../utils/API';

class Login extends Component {

    formSubmit(e){
        e.preventDefault()

        let loginData = {
            email: this.refs.email.value,
            password: this.refs.password.value,
        } 

        API.loginUser(loginData)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Login</h5>
                                <form onsubmit={this.formSubmit.bind(this)}>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login