import React, { Component } from 'react';
import { connect } from 'react-redux'; // this connects the component to the redux store 
                                      // that is provided by the <Provider> component.

import { fetchPosts } from '../actions/postActions';
import PropTypes from 'prop-types';                                   


class Posts extends Component {

    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost);
        }
    }

    render() {
        const postItems = this.props.posts.map(
            post => (<div key={post.id}>
                <h3>{post.title}</h3>
                <p> {post.body}</p>
            </div>
            )
        );
        return (
            <div style={this.postStyle()}>
                <h1>Blog Posts : </h1>
                {postItems}
            </div>
        )
    }

    postStyle = () => {
        return {
            background: 'lightblue',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
        }
    }

}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object.isRequired,
}    


// mapping the redux state to component properties :
const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item,
})


export default connect(mapStateToProps, {fetchPosts})(Posts)
