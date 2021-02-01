import React, { Component } from 'react';
import axios from 'axios';
import ShowMoreText from 'react-show-more-text';
import classes from './Post.module.css';

class Post extends Component {

    state = {
        commentsCount: null
    }

    componentDidMount () {
        axios.get('/posts/' + this.props.id + '/comments')
            .then(res => {
                const count = res.data.length;
                this.setState({commentsCount: count})
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        const date = new Date(this.props.publish_date);
        const changedDate = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
        return (
            <article className={classes.Post} onClick={this.props.clicked}>
                <div className={classes.Postblock2}>
                    <div>
                        <div className={classes.arrowUp}></div>
                        <span>{this.props.rating}</span>
                        <div className={classes.arrowDown}></div>
                    </div>
                </div>
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
                <h1>{this.props.title}</h1>
                <ShowMoreText
                lines={3}
                more='Show more'
                less='Show less'
                className={classes.contentCSS}
                anchorClass='my-anchor-css-class'
                onClick={this.executeOnClick}
                expanded={false}
                width={280}>
                    <div>{this.props.content}</div>
                </ShowMoreText>
                <div className={classes.Info}>
                    <div>asked {changedDate}</div>
                    <div className={classes.Author}>{this.props.author}</div>
                </div>
            </article>
        )
    }
}

export default Post;
