import React, { Component } from 'react';
import './Comment.css';
import axios from 'axios';
import defaultUserAvatar from '../../assets/images/default-avatar.png';

class Comment extends Component {
    state = {
        author: {},
        comment: {},
        // needsUpdate: 
    };

    componentDidMount() {
        axios.get('/comments/' + this.props.id)
            .then(res => {
                this.setState({author: res.data.author, comment: res.data.comment})
            })
            .catch(e => {
                console.log("Comment", e);
            })
    }

    commentLikeHandler(id) {
        axios.post('/comments/' + id + '/like', { 
            "type": "like" 
        }, {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }})
            .then (res => {
                this.setState(prevState => {
                    let comment = Object.assign({}, prevState.comment);
                    comment.rating = comment.rating++;
                    return comment;
                });
                this.setState({ needsUpdate: true});
            })
            .catch(e => {
                console.log(e)
            })
    }

    commentDislikeHandler(id) {
        axios.post('/comments/' + id + '/like', { 
            "type": "dislike" 
        }, {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }})
            .then (res => {
                this.setState(prevState => {
                    let comment = Object.assign({}, prevState.comment);
                    comment.rating = comment.rating++;
                    return comment;
                });
                this.setState({ needsUpdate: true});
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        if (this.state.comment) {
            console.log("COMMENT", this.state.comment)
            return (
                <div className="Comment">
                    <div className="ratingInfo">
                        <div onClick={() => this.commentLikeHandler(this.props.id)} className="arrowUp"></div>
                        <span>0</span>
                        <div onClick={() => this.commentDislikeHandler(this.props.id)} className="arrowDown"></div>
                    </div>
                    <div className="content">
                        <p>{this.props.content}</p>
                    </div>
                    <div className="aboutAuthor">
                        <div className="Info">
                            <div>answered {this.props.publish_date.replace('T', ' ').slice(0, 16)}</div>
                            <div className="avatar"><img src={ this.state.author.avatar ?  "http://localhost:3001/" + this.state.author.avatar.replace('resources', '') : defaultUserAvatar} target="_blank" alt="author avatar" /></div>
                            <div className="Author">{this.state.author.login}</div>
                        </div> 
                    </div>   
                    {/* <p>{this.props.author}</p> */}
                </div>
            );
        }
    }
} 

export default Comment;
