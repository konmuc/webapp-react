import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import SigninComponent from './SigninComponent';

export default function withAuthentication(WrappedComponent) {

    @observer
    @inject('commonStore')
    class AuthenticationWrapper extends Component {
        render() {
            const { commonStore, ...props } = this.props;
            const { clientInfo } = commonStore;
    
            const isLoggedIn = clientInfo && clientInfo.clientId;
    
            console.info('loggedIn=', isLoggedIn);

            return isLoggedIn ? <WrappedComponent {...props} /> : <SigninComponent />
        }
    }

    return AuthenticationWrapper;
};