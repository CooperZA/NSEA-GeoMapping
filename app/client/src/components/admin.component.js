import React, { Component } from 'react';
import axios from 'axios';

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

        const login = {
            Username: this.state.Username,
            Password: this.state.Password
        }

        axios.post('http://localhost:5000/admin/', login)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error (admin submit):' + err))

        window.location = '/projects/';
    }

    render() {
        return (
            <div>
                <h2>Admin Login</h2>
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