import { observable, action, computed } from 'mobx';

import api from '../api';

import agent from '../agent';

class PostStore  {
    @observable posts = [];

    @action loadPosts() {
        agent.post.loadPosts()
            .then(action((posts) => {
                this.posts = posts;
            }));
    }

    @action createPost(content) {
        agent.post.createPost(content)
            .then(action((post) => {
                // FIXME: unsure if the new posts gets returned
                this.posts.push(post)
            }));
    }

    @action upVotePost(postId) {
        agent.post.upVotePost(postId)
            .then(action((post) => {
                // FIXME: unsure if the new posts gets returned
                let postIndex = this.posts.findIndex(post => post.id == postId)
            }));
    }

    @action downVotePost() {
        agent.post.downVotePost()
    }

    @action createComment() {
        agent.post.createComment()
    }

    @action upVoteComment() {
        agent.post.upVoteComment()
    }

    @action downVoteComment() {
        agent.post.downVoteComment()
    }

}

export default new PostStore();