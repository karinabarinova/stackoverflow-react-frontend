import React, { Component } from 'react';
import './Comment.css';
import axios from 'axios';
import defaultUserAvatar from '../../assets/images/default-avatar.png';
import Subcomment from './Subcomment/Subcomment';

class Comment extends Component {
    state = {
        author: {},
        comment: {},
        subcomments: [],
        errorMessage: '',
        isEdit: false,
        editStatus: null,
        needsUpdate: false,
        subcommentContent: ''
    };

    componentDidUpdate() {
        this.loadData();
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        if (this.props.id) {
            if (!this.state.comment || (this.state.comment && this.props.id !== +this.state.comment.id) || this.state.needsUpdate) {
                axios.get('/comments/' + this.props.id)
                    .then(res => {
                        this.setState({author: res.data.author, comment: res.data.comment, editStatus: res.data.comment.status, needsUpdate: false})
                    })
                    .catch(e => {
                        this.setState({errorMessage: e.message})
                    })
                axios.get('/comments/' + this.props.id + '/comments')
                    .then(res => {
                        this.setState({subcomments: res.data})
                    })
                    .catch(e => console.log(e))
            }
        }
    }

    editCommentHandler = () => {
        this.setState({isEdit: true, editStatus: this.state.comment.status});
    };

    submitEditHandler = (e, id) => {
        e.preventDefault();
        this.setState({isEdit: false});
        const commentStatus = { status: this.state.editStatus };
        const config = {
            headers: {
                "authorization": `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.patch('/comments/' + id, commentStatus, config)
            .then(res => console.log(res))
            .catch(e => console.log(e))
    };

    cancelEditHandler = () => {
        this.setState({isEdit: false});
    }

    deleteCommentHandler = () => {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        const res = window.confirm('Are you sure you want to delete your comment?')
        
        if (res) {
            axios.delete('/comments/' + this.props.id, config)
                .then(res => {
                    this.forceUpdate() //TODO: does not work
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    commentLikeHandler(id, type) {
        axios.post('/comments/' + id + '/like', { 
            "type": type 
        }, {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }})
            .then (res => {
                if (type === 'like')
                    this.setState(prevState => {
                        let comment = Object.assign({}, prevState.comment);
                        comment.rating = comment.rating++;
                        return comment;
                    });
                else
                    this.setState(prevState => {
                        let comment = Object.assign({}, prevState.comment);
                        comment.rating = comment.rating--;
                        return comment;
                    });
                this.setState({ needsUpdate: true});
            })
            .catch(e => {
                this.setState({errorMessage: e.response.data.message})
            })
    }

    SubcommentSubmitEditHandler = (e) => {
        e.preventDefault();
        if (this.state.subcommentContent )
            axios.post('/comments/' + this.props.id + '/comments', { 
                "content": this.state.subcommentContent  
            }, {headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }})
                .then(res => this.setState({ needsUpdate: true, subcommentContent: '' }))
                .catch(e => console.log(e))
    }

    render() {
        let editBlock = null;
        let subcomments = null;
        if (this.state.comment) {
            if (this.state.isEdit) {
                editBlock = (
                    <div className="CommentEdit">
                        <form onSubmit={(e) => this.submitEditHandler(e, this.props.id)}>
                            <select
                            onChange={(event) => this.setState({editStatus: event.target.value})}>
                                <option value="active">active</option>
                                <option value="inactive">inactive</option>
                            </select>
                            <button type="submit" className="SubmitButton"> Submit </button>
                            <button onClick={this.cancelEditHandler} className="DeleteButton">Cancel</button>
                        </form>
                    </div>
                )
            }
            if (this.state.subcomments)
                subcomments = this.state.subcomments.map((comment) => {
                    return <Subcomment 
                        key={comment.id}
                        content={comment.content}
                        id={comment.id}
                        author={comment.author}
                        publish_date={comment.publish_date}
                        // clicked={() => this.categorySelectedHandler(category.id)}
                    />
                })
            return (
                <div className="container">
                    <div className="Comment">
                        <div className="ratingInfo">
                            <div onClick={() => this.commentLikeHandler(this.props.id, "like")} className="arrowUp"></div>
                            <span>{this.state.comment.rating}</span>
                            <div onClick={() => this.commentLikeHandler(this.props.id, "dislike")} className="arrowDown"></div>
                        </div>
                        <div className="content">
                            <p>{this.props.content}</p>
                        </div>
                        <div className="aboutAuthor">
                            <div className="Info">
                                {this.props.auth ? (<div className="Buttons">
                                    <button className="EditButton" onClick={this.editCommentHandler}>Edit</button>
                                    <button className="DeleteButton" onClick={this.deleteCommentHandler}>Delete</button>
                                </div>) : null }
                                <div className="User">
                                    <div>answered {this.props.publish_date.replace('T', ' ').slice(0, 16)}</div>
                                    <div className="avatar"><img src={ this.state.author.avatar ?  "http://localhost:3001/" + this.state.author.avatar.replace('resources', '') : defaultUserAvatar} target="_blank" alt="author avatar" /></div>
                                    <div className="Author">{this.state.author.login}</div>
                                </div>
                            </div> 
                        </div>
                        {editBlock}
                    </div>
                    <div className="newSubcomment">
                        <form onSubmit={(e) => this.SubcommentSubmitEditHandler(e)}>
                            <input type="text" placeholder="Add new comment..." value={this.state.subcommentContent} onChange={(e) => this.setState({subcommentContent: e.target.value})}></input>
                            <button type="submit" className="SubcommentSubmitButton"> Submit </button>
                        </form>
                    </div>
                    {subcomments}
                </div>
                
            );
        }
    }
} 

export default Comment;
