import React, { Component } from 'react';
import './Comment.css';
import defaultUserAvatar from '../../assets/images/default-avatar.png';

class Comment extends Component {
    state = {};

    render() {
        return (
            <div className="Comment">
                <div className="ratingInfo">
                    <div onClick={() => this.postLikeHandler()} className="arrowUp"></div>
                    <span>0</span>
                    <div onClick={() => this.postDislikeHandler()} className="arrowDown"></div>
                </div>
                <div className="content">
                    <p>{this.props.content}</p>
                </div>
                <div className="aboutAuthor">
                    <div className="Info">
                        <div>answered {this.props.publish_date.replace('.000Z', '').replace('T', ' ')}</div>
                        <div className="avatar"><img src={ this.state.author ?  "http://localhost:3001/" + this.state.author.avatar.replace('resources', '') : defaultUserAvatar} target="_blank" alt="author avatar" /></div>
                        <div className="Author">{this.state.author}</div>
                    </div> 
                </div>   
                {/* <p>{this.props.author}</p> */}
            </div>
        );
    }
} 

export default Comment;
