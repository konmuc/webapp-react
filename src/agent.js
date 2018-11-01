import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from './stores/common';
import authStore from './stores/auth';
import { request } from 'http';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://api.kongeos-muenchen.de';

const encode = encodeURIComponent;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        authStore.singout();
    }
    return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
    if (commonStore.clientInfo && commonStore.clientInfo.accessToken) {
        console.info(commonStore.clientInfo.accessToken);
        req.query.token = commonStore.clientInfo.accessToken;
        req.header["x-access-token"] = commonStore.clientInfo.accessToken;
    }

    return req;
};

const requests = {
    del: url =>
      superagent
        .del(`${API_ROOT}${url}`)
        .use(tokenPlugin)
        .end(handleErrors)
        .then(responseBody),
    get: url =>
      superagent
        .get(`${API_ROOT}${url}`)
        .use(tokenPlugin)
        .end(handleErrors)
        .then(responseBody),
    put: (url, body) =>
      superagent
        .put(`${API_ROOT}${url}`, body)
        .use(tokenPlugin)
        .end(handleErrors)
        .then(responseBody),
    post: (url, body) =>
      superagent
        .post(`${API_ROOT}${url}`, body)
        .use(tokenPlugin)
        .end(handleErrors)
        .then(responseBody)
  };

const auth = {
    signin: (username, password) => {
        return requests.post('/auth/signin', { username, password });
    },
    singup: (username, password) => {
        return requests.post('/auth/signup', { username, password });
    },
    singout: (username, clientId) => {
        return requests.post('/auth/signout', { username, clientId });
    },
    token: (refreshToken, clientId) => {
        return requests.post('/auth/token', { refreshToken, clientId });
    }
};

const post = {
    createPost: (content) => {
        return requests.post('/v1/posts', {content});
    },
    loadPosts: () => {
        return requests.get('/v1/posts');
    },
    upvote: (postId) => {
        return requests.post('/v1/posts/')
    }
}

export default {
    auth,
    post
};