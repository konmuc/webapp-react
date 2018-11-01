import { observable, action, computed } from 'mobx';

import agent from '../agent';

import commonStore from './common';

class AuthStore  {
    @observable tokenRefresher = null;

    @observable values =  {
        username: '',
        password: ''
    };

    @action setUsername(username) {
        this.values.username = username;
    }

    @action setPassword(password) {
        this.values.password = password;
    }

    @action reset() {
        this.values.password = '';
        this.values.username = '';
    }

    @action signin() {
        agent.auth.signin(this.values.username, this.values.password)
            .then(action(({
                clientId,
                accessToken,
                refreshToken,
                expiresIn
            }) => {
                const expiresAt = new Date(Date.now() + expiresIn * 1000);

                commonStore.setClientInfo({
                    clientId,
                    accessToken,
                    refreshToken,
                    expiresAt
                });
            }));
    }

    @action singup() {
        agent.auth.singup(this.values.username, this.values.password)
            .then(action(() => {
                return this.login();
            }));
    }

    @action signout() {
        const clientId = commonStore.clientInfo && commonStore.clientInfo.clientId;
        
        if (!clientId) return;

        return agent.auth.singout(this.values.username, clientId)
            .then(action(() => {
                commonStore.setClientInfo(undefined);
                this.reset();
            }));
    }
};

export default new AuthStore();