import React, { Component } from 'react';
import API from "../../utils/API"

class Register extends Component {

    formSubmit(e, name, email, password1, password2) {
        e.preventDefault()

        API.registerUser({name,email,password1,password2})
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Create an Account</h5>
                                <form onSubmit={e => this.formSubmit( e,
                                    this.refs.Name.value,
                                    this.refs.Email.value,
                                    this.refs.Password1.value,
                                    this.refs.Password2.value
                                )}>
                                    <div className="form-group">
                                        <label >Name</label>
                                        <input className="form-control" ref="Name" placeholder="Name" />
                                    </div>
                                    <div className="form-group">
                                        <label >Email address</label>
                                        <input className="form-control" ref="Email" placeholder="Email" />
                                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type="password" className="form-control" ref="Password1" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label >Reenter password</label>
                                        <input type="password" className="form-control" ref="Password2" placeholder="Password authentication" />
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