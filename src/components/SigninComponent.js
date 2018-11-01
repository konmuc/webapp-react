import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

export default @observer @inject('authStore') class SigninComponent extends Component {

    onSubmit = () => {
        const { authStore } = this.props;

        authStore.signin();
    }

    onUsernameChange = (evt) => {
        const { authStore } = this.props;

        authStore.setUsername(evt.target.value);
    }

    onPasswordChange = (evt) => {
        const { authStore } = this.props;

        authStore.setPassword(evt.target.value);
    }

    render() {
        const { authStore } = this.props;

        const disabled = authStore.values.username && authStore.values.password;

        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Username:</label>
                <input type="text" onChange={this.onUsernameChange} />
                <label>Password:</label>
                <input type="password" onChange={this.onPasswordChange} />
                <input type="submit" onClick={this.onSubmit} disabled={disabled} />
            </div>
        );
    }
}