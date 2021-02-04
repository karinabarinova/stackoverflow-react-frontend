import React, { Component } from 'react';
import './Comment.css';
import axios from 'axios';
import Button from '../Button/Button';
import defaultUserAvatar from '../../assets/images/default-avatar.png';

class Comment extends Component {
    state = {
        author: {},
        comment: {},
        errorMessage: '',
        isEdit: false,
        editStatus: null
        // needsUpdate: 
    };

    componentDidUpdate() {
        this.loadData();
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        if (this.props.id) {
            if (!this.state.comment || (this.state.comment && this.props.id !== +this.state.comment.id)) {
                axios.get('/comments/' + this.props.id)
                    .then(res => {
                        this.setState({author: res.data.author, comment: res.data.comment, editStatus: res.data.comment.status})
                    })
                    .catch(e => {
                        this.setState({errorMessage: e.message})
                    })
            }
        }
    }

    commentLikeHandler(id) {
        // const alert = useAlert();
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
                this.setState({errorMessage: e.message})
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
                this.setState({errorMessage: e.message})
            })
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

    render() {
        let editBlock = null;
        if (this.state.comment) {
            if (this.state.isEdit) {
                editBlock = (
                    <div className="CommentEdit">
                        <form onSubmit={() => this.submitEditHandler(this.props.id)}>
                            {/* <textarea rows="10" cols="60" value={this.state.editContent} onChange={(event) => this.setState({editContent: event.target.value})} /> */}
                            <select
                            // value={this.state.editStatus}
                            onChange={(event) => this.setState({editStatus: event.target.value})}>
                                <option value="active">active</option>
                                <option value="inactive">inactive</option>
                            </select>
                            <button type="submit" className="SubmitButton"> Submit </button>
                            <button className="" onClick={this.cancelEditHandler} className="DeleteButton">Cancel</button>
                        </form>
                    </div>
                )
            }
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
                            <div className="Buttons">
                                <button className="EditButton" onClick={this.editCommentHandler}>Edit</button>
                                <button className="DeleteButton" onClick={this.deleteCommentHandler}>Delete</button>
                            </div>
                            <div className="User">
                                <div>answered {this.props.publish_date.replace('T', ' ').slice(0, 16)}</div>
                                <div className="avatar"><img src={ this.state.author.avatar ?  "http://localhost:3001/" + this.state.author.avatar.replace('resources', '') : defaultUserAvatar} target="_blank" alt="author avatar" /></div>
                                <div className="Author">{this.state.author.login}</div>
                            </div>
                        </div> 
                    </div>
                    {editBlock}   
                    {/* <p>{this.props.author}</p> */}
                </div>
            );
        }
    }
} 

export default Comment;
