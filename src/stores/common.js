import { observable, action, reaction } from 'mobx';
import api from '../api';

class CommonStore {
    @observable appName = 'KonMuc';
    @observable clientInfo = JSON.parse(window.localStorage.getItem('clientInfo'));

    constructor() {
        reaction(
          () => this.clientInfo,
          clientInfo => {
            if (clientInfo) {
              window.localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
            } else {
              window.localStorage.removeItem('clientInfo');
            }
          }
        );
    }

    @action setClientInfo(clientInfo) {
        this.clientInfo = clientInfo;
    }

    @action updateClientInfo({
        clientId,
        accessToken,
        refreshToken,
        expiresAt
    }) {
        if (!this.clientInfo) return;

        const clientInfo = { ...this.clientInfo };

        if (clientId) clientInfo.clientId = clientId;
        if (accessToken) clientInfo.accessToken = accessToken;
        if (refreshToken) clientInfo.refreshToken = refreshToken;
        if (expiresAt) clientInfo.expiresAt = expiresAt;

        this.clientInfo = clientInfo;
    }
};

export default new CommonStore();