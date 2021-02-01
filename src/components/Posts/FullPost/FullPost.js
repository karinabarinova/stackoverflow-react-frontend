import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';
import Comment from '../../Comment/Comment';
import defaultUserAvatar from '../../../assets/images/default-avatar.png';

class FullPost extends Component {
    state = {
        loadedPost: null,
        CommentsUnderPost: [],
        author: null
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
                        axios.get('/users/' + this.state.loadedPost.author)
                            .then(res => {
                                // console.log(res.data);
                                this.setState({ author: res.data})
                            })
                            .catch(e => {
                                console.log("FULLPOST")
                                console.log(e);
                            })
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
        if (this.state.loadedPost && this.state.author) {
            const date = new Date(this.state.loadedPost.publish_date);
            const changedDate = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
        
            post = (
                <div className="FullPost">
                    <div className="column">
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
                            {/* <div className="avatar">{this.state.loade}</div> */}
                            <div className="avatar"><img src={ this.state.author.avatar ?  "http://localhost:3001/" + this.state.author.avatar.replace('resources', '') : defaultUserAvatar} target="_blank"/></div>

                            <div className="Author">{this.state.author.fullName}</div>
                        </div> 
                    </div>      
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
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
        return (
            <div>
                {post}
                <div className="Comments">{comments}</div>
            </div>
        );
    }
}

export default FullPost;
