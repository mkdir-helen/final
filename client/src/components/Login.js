import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(result => {
                console.log(result);

                if (result.message === "ok") {
                    this.props.history.push('/gallery');
                } else if (result.message === "user") {
                    this.setState({
                        errorMessage: "Username does not exist."
                    })
                } else if (result.message === "password") {
                    this.setState({
                        errorMessage: "Username and password do not match."
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    handleUsername = (e) => {
        this.setState({ username: e.target.value });
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    }
    render() {
        const hasError = this.state.errorMessage !== "";
        return (
            <form action="/login"
                method="POST"
                className="login-container"
                onSubmit={this.handleSubmit}
            >
                <h1>Log In</h1>
                {hasError &&
                    <h4>{this.state.errorMessage}</h4>
                }
                <label>Username: </label>
                <input type='text'
                    name='username'
                    onChange={this.handleUsername}
                    value={this.state.username}
                />
                <br /><br />
                <label>Password: </label>
                <input type='password'
                    name='password'
                    onChange={this.handlePassword}
                    value={this.state.password}
                />
                <p><button type="submit">Login</button></p>
                <p>Not a member? <Link to="/register">Sign up now</Link></p>
            </form>
        );
    }
}

