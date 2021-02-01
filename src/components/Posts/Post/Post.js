import React, { Component } from 'react';
import axios from 'axios';
import ShowMoreText from 'react-show-more-text';
import classes from './Post.module.css';
import defaultUserAvatar from '../../../assets/images/default-avatar.png';

class Post extends Component {

    state = {
        commentsCount: null,
        authorAvatar: null
    }

    componentDidMount () {
        axios.get('/posts/' + this.props.id + '/comments')
            .then(res => {
                const count = res.data.length;
                this.setState({commentsCount: count})
                axios.get('/users/' + this.props.authorId)
                            .then(res => {
                                console.log("USERINFO")
                                console.log(res.data)
                                this.setState({ authorAvatar: res.data.avatar})
                            })
                            .catch(e => {
                                console.log("POST")
                                console.log(e);
                            })
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        const date = new Date(this.props.publish_date);
        const changedDate = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
        // console.log(this.state.authorAvatar);
        // if (this.state.author)
        return (
            <article className={classes.Post} onClick={this.props.clicked}>
                <div className={classes.column}>
                    <div className={classes.Postblock1}>
                        <div>
                            <span>{this.props.rating}</span>
                        </div>
                        <div>Votes</div>
                    </div>
                    <div className={classes.Postblock1}>
                        <div>
                            <span>{this.state.commentsCount}</span>
                        </div>
                        <div>Answers</div>
                    </div>
                </div>
                <div className={classes.column2}>
                    <div className={classes.title}>
                        <h4>{this.props.title}</h4>
                    </div>
                    <div className={classes.content}>
                        <ShowMoreText
                        lines={3}
                        more='Show more'
                        less='Show less'
                        className={classes.contentCSS}
                        anchorClass='my-anchor-css-class'
                        onClick={this.executeOnClick}
                        expanded={false}
                        width={0}>
                            <div>{this.props.content}</div>
                        </ShowMoreText>
                    </div>
                    <div className={classes.column3}>
                        <div className={classes.Info}>
                            <div>asked {changedDate}</div>
                            <div className={classes.Author}>{this.props.author}</div>
                            <div className={classes.avatar}><img src={ this.state.authorAvatar ?  "http://localhost:3001/" + this.state.authorAvatar.replace('resources', '') : defaultUserAvatar} target="_blank"/></div>
                        </div> 
                    </div>                                           
                </div>
                
            </article>
        )
    }
}

export default Post;
