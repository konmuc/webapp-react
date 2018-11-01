import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import withAuthentication from './withAuthentication'

@observer @inject('postStore', 'authStore') class PostsComponent extends Component {

    componentDidMount() {
        this.props.postStore.loadPosts();
    }

    onClick = () => {
        this.props.authStore.signout();
    }

    render() {
        const { postStore } = this.props;
        const { posts } = postStore;

        return (
            <div>
                <button onClick={this.onClick}>LogOut</button>
                <ul>
                    {
                        posts.map(post => <li>{post.content.text}</li>)
                    }
                </ul>
            </div>
        );
    }
};

export default withAuthentication(PostsComponent);