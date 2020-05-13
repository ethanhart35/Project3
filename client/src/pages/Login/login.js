import React, { Component } from 'react';
import API from '../../utils/API';
import history from '../../utils/history';
import "./login.css";


class Login extends Component {

    state = {
        msg: []
    }

    formSubmit = (e, email, password) => {
        e.preventDefault()
        API.loginUser({ email, password })
            .then(res => {
                this.setState({ msg: [res.data[0]] })
                if (res.data[0].msg === "no user") return false
                this.props.callback(res.data[1])
            }
            )
    }

    render() {
        return (
            <div className="row" id="login-body">
                <div className="container">

                    {this.state.msg.map((msg, i) =>
                        <div key={i} className="row">
                            <div className="col">
                                <div className="alert alert-dark alert-dismissible" role="alert">
                                    <h4 className="text-center">{msg.msg}</h4>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Login</h5>

                                    <form onSubmit={e => this.formSubmit(e, this.refs.email.value, this.refs.password.value)}>

<<<<<<< HEAD
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input className="form-control" ref="email" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" ref="password" placeholder="Password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <p className="text-muted">Need an account? <a href="/login">Register</a></p>
                                </form>
=======
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
>>>>>>> 729d71e3b3245503f5fbba960189dbc0a5829e94
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login