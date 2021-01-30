import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';
import Comment from '../../Comment/Comment';

class FullPost extends Component {
    state = {
        loadedPost: null,
        CommentsUnderPost: []
    }

    componentDidMount () {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData = () => {
        if (this.props.match.params.id)
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(res => {
                        console.log(res)
                        this.setState({loadedPost: res.data})
                    })
                    .catch(e => {
                        console.log("Full Post")
                        console.log(e);
                    })
                axios.get('/posts/' + +this.props.match.params.id + '/comments')
                    .then(res => {
                        console.log(res);
                        this.setState({ CommentsUnderPost: res.data})
                    })
                    .catch(e => {
                        console.log("Full Post")
                        console.log(e)
                    })
        }       
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(res => {
                // console.log(res)
            })
            .catch()
    }    

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        let comments = null;
        if (post.props.id)
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <div className="Postblock2">
                        <div>
                            <div className="arrowUp"></div>
                            <span>{this.state.loadedPost.rating}</span>
                            <div className="arrowDown"></div>
                        </div>
                    </div>
                    <div className="Postblock1">
                        <div>
                            <span>{this.state.loadedPost.rating}</span>
                        </div>
                        <div>Votes</div>
                    </div>
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.content}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
            if (this.state.CommentsUnderPost.length) {
                comments = this.state.CommentsUnderPost.map(comment => {
                    return <Comment 
                            key={comment.id}
                            content={comment.content}
                            author={comment.author} //TODO: incorrect author
                            publish_date={comment.publish_date}
                            // clicked={() => this.postSelectedHandler(post.id)}
                        />
                })
            }
        }
        return [post, comments];
    }
}

export default FullPost;
