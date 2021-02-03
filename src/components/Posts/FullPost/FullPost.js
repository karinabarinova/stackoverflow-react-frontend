import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';
import Comment from '../../Comment/Comment';
import { connect } from 'react-redux';
import defaultUserAvatar from '../../../assets/images/default-avatar.png';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';

class FullPost extends Component {
    state = {
        loadedPost: null,
        CommentsUnderPost: [],
        author: {},
        needsUpdate: false,
        commentContent: '',
        errorMessage: ''
    }

    componentDidMount () {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData = () => {
        if (this.props.match.params.id)
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)
            || (this.state.loadedPost && this.state.needsUpdate)) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(res => {
                        this.setState({loadedPost: res.data})
                        this.setState({needsUpdate: false});
                        axios.get('/users/' + this.state.loadedPost.author)
                            .then(res => {
                                console.log(res)
                                this.setState({ author: res.data})
                            })
                            .catch(e => {
                                this.setState({errorMessage: e.response.data.message})
                            })
                    })
                    .catch(e => {
                        this.setState({errorMessage: e.response.data.message})
                    })
                axios.get('/posts/' + +this.props.match.params.id + '/comments')
                    .then(res => {
                        this.setState({ CommentsUnderPost: res.data})
                    })
                    .catch(e => {
                        this.setState({errorMessage: e.response.data.message})
                    })
        }       
    }

    deletePostHandler = () => {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        const res = window.confirm('Are you sure you want to delete your post?')
        
        if (res) {
            axios.delete('/posts/' + this.props.match.params.id, config)
                .then(res => {
                    this.props.history.push('/');
                })
                .catch(e => {
                    this.setState({errorMessage: e.response.data.message})
                })
        }
    }

    subscribePostHandler = () => {
        axios.post('/posts/' + this.props.match.params.id + '/subscribe') //TODO: Pass auth token
            .then()
            .catch()
    }    

    postLikeHandler(id) {
        axios.post('/posts/' + id + '/like', { 
            "type": "like" 
        }, {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }})
            .then (res => {
                this.setState(prevState => {
                    let post = Object.assign({}, prevState.loadedPost);
                    post.rating = post.rating++;
                    return post;
                });
                this.setState({ needsUpdate: true});
            })
            .catch(e => {
                this.setState({errorMessage: e.response.data.message})
            })
    }

    commentSubmitHandler = (event) => {
        event.preventDefault();
        const content = this.state.commentContent;
        let data = '';
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }

        if (content.length) {
            data = { content };
            axios.post("/posts/" + this.state.loadedPost.id + '/comments', data, config)
                .then(res => {
                    this.setState({commentContent: '', needsUpdate: true})
                })
                .catch(e => this.setState({errorMessage: e.response.data.message}))
        }
    }

    postDislikeHandler(id) {
        axios.post('/posts/' + id + '/like', { 
            "type": "dislike" 
        }, {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }})
            .then (res => {
                this.setState(prevState => {
                    let post = Object.assign({}, prevState.loadedPost);
                    post.rating = post.rating++;
                    return post;
                });
                this.setState({ needsUpdate: true});
            })
            .catch(e => {
                this.setState({errorMessage: e.response.data.message})
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Post Not Found!</p>;
        let comments = null;
        
        if (post.props.id)
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        if (this.state.loadedPost && this.state.author) {
            const editPost = this.state.loadedPost;
            const date = new Date(this.state.loadedPost.publish_date);
            const changedDate = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
        
            post = (
                <div className="FullPost">
                    <div className="column">
                        <div className="Postblock2">
                            <div>
                                <div onClick={() => this.postLikeHandler(this.state.loadedPost.id)} className="arrowUp"></div>
                                <span>{this.state.loadedPost.rating}</span>
                                <div onClick={() => this.postDislikeHandler(this.state.loadedPost.id)} className="arrowDown"></div>
                            </div>
                        </div>
                        <div className="Postblock1">
                            <div>
                                <span>{this.state.loadedPost.rating}</span>
                            </div>
                            <div>Votes</div>
                        </div>
                    </div>
                    <div className="column2">
                        <div>
                            <h4>{this.state.loadedPost.title}</h4>
                        </div>
                        <div>
                            <div>{this.state.loadedPost.content}</div>
                        </div>
                        <div className="column3">
                        <div className="Info">
                            <div>asked {changedDate}</div>
                            <div className="avatar"><img src={ this.state.author.avatar ?  "http://localhost:3001/" + this.state.author.avatar.replace('resources', '') : defaultUserAvatar} target="_blank" alt="author avatar" /></div>

                            <div className="Author">{this.state.author.fullName}</div>
                        </div> 
                    </div>      
                    <div className="Edit">
                        <button onClick={this.subscribePostHandler}>Subscribe</button>
                        {this.state.author.login === this.props.loggedInUser ? <Link to={{pathname: '/editpost/' + this.props.match.params.id, state: {editPost, from: this.props.location.pathname} }}><button onClick={this.editPostHandler} className="Edit">Edit</button></Link> : null}
                        {this.state.author.login === this.props.loggedInUser ? <button onClick={this.deletePostHandler} className="Delete">Delete</button> : null}
                    </div>
                    </div>
                    
                </div>
    
            );
            if (this.state.CommentsUnderPost && this.state.CommentsUnderPost.length) {
                comments = this.state.CommentsUnderPost.map(comment => {
                    return <Comment 
                            key={comment.id}
                            id={comment.id}
                            content={comment.content}
                            author={comment.author} //TODO: incorrect author
                            publish_date={comment.publish_date}
                            // clicked={() => this.postSelectedHandler(post.id)}
                        />
                })
            }
        }
        let errorMessage = null;
        if (this.state.errorMessage)
            errorMessage = <p className="ErrorMessage">{this.state.errorMessage}</p>
        return (
            <div className="container">
                {errorMessage}
                {post}
                <div className="Comments">{comments}</div>
                <div className="newComment">
                    <form onSubmit={this.commentSubmitHandler}>
                        <h4>Your answer</h4>
                        <textarea
                            cols="92"
                            rows="15"
                            tabIndex="101"
                            value={this.state.commentContent}
                            onChange={(event) => this.setState({commentContent: event.target.value})}></textarea>
                        <Button btnType="CommentSuccess" type="submit">Post your answer</Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.jwtToken !== null,
        loggedInUser: state.auth.login
    };
};

export default connect(mapStateToProps)(FullPost);
