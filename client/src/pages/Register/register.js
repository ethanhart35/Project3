import React, { Component } from 'react';

class Register extends Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Create an Account</h5>
                                <form>
                                    <div className="form-group">
                                        <label >Email address</label>
                                        <input type="email" className="form-control" id="Input-Email" placeholder="Enter email" />
                                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type="password" className="form-control" id="Input-Password" placeholder="Password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register Account</button>
                                    <p className="text-muted">Already have an account? <a href="/login">Login</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Register