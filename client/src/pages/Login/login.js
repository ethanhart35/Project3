import React, { Component } from 'react';
import API from '../../utils/API';

class Login extends Component {

    state = {
        msg: []
    }

    formSubmit = (e, email, password) => {
        e.preventDefault()
        API.loginUser({ email, password })
            .then(res => {
                console.log(res.body)
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Login</h5>

                                {this.state.msg.map((msg, i) =>
                                    <div key={i} className="row">
                                        <div className="col">
                                            <div className="alert alert-dark alert-dismissible" role="alert">
                                                <h4 className="text-center">{msg.msg}</h4>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={e => this.formSubmit(e, this.refs.email.value, this.refs.password.value)}>

                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input className="form-control" ref="email" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" ref="password" placeholder="Password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <p className="text-muted">Need an account? <a href="/login">Register</a></p>
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