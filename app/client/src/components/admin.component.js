import React, { Component } from 'react';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { login } from '../util/session';

export default class AdminLoginForm extends Component {
    constructor(props) {
        super(props);

        // bind this to methods
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Username: '',
            Password: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            Username: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            Password: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            Username: this.state.Username,
            Password: this.state.Password
        }

        login(user);
    }

    render() {
        return (
            <div>
                <h2>Admin Login</h2>
                <p id="err-msg"></p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.Username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.Password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}