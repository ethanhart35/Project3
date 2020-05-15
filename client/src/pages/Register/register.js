import React, { Component } from 'react';
import API from "../../utils/API"
// import Jumbo from '../../components/Jumbotron'
import "./register.css"

class Register extends Component {

    state = {
        msg: []
    };

    formSubmit(e, name, email, password1, password2) {
        e.preventDefault()
        const currentComponent = this

        API.registerUser({ name, email, password1, password2 })
            .then(res => { 
                console.log(res)
                currentComponent.setState({ msg: res.data }) 
            })
    }

    render() {
        return (
            <div id="register" className="container-fluid">
                {this.state.msg.map((msg, i) =>
                    <div key={i} className="row pt-3">
                        <div className="col">
                            <div className="alert alert-dark alert-dismissible" role="alert">
                                <h4 className="text-center">{msg.msg}</h4>
                            </div>
                        </div>
                    </div>
                )}
                <div className="row p-3">
                    <div className="col-md-6 offset-md-3">
                        <div className="card p-2">
                            <h5 className="card-title p-2">Register</h5>

                            <div className="card-body">
                                <form onSubmit={e => this.formSubmit(e, this.refs.name.value, this.refs.email.value, this.refs.password1.value, this.refs.password2.value)}>
                                    <div className="form-group">
                                        <label htmlFor="name" >Name</label>
                                        <input type="text" className="form-control" ref="name" placeholder="Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" >Email</label>
                                        <input type="text" className="form-control" ref="email" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password1" >Password</label>
                                        <input type="password" className="form-control" ref="password1" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password2" >Password Confirm</label>
                                        <input type="password" className="form-control" ref="password2" placeholder="Password validate" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
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