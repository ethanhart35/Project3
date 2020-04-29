import React, { Component } from 'react';
import API from "../../utils/API"

class Register extends Component {

    formSubmit(e){
        e.preventDefault()

        let registerData = {
            name: this.refs.Name.value,
            email: this.refs.Email.value,
            password: this.refs.Password.value
        }

        API.registerUser(registerData)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Create an Account</h5>
                                <form onSubmit={this.formSubmit.bind(this)}>
                                    <div className="form-group">
                                        <label >Name</label>
                                        <input className="form-control" ref="Name" placeholder="Name" />
                                    </div>
                                    <div className="form-group">
                                        <label >Email address</label>
                                        <input className="form-control" ref="Email" placeholder="Enter email" />
                                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input className="form-control" ref="Password" placeholder="Password" />
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