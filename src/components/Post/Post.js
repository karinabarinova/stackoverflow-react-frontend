import React from 'react';
import classes from './Post.module.css';

const post = (props) => (
    <article className={classes.Post}>
        <div className={classes.Postblock}>
            <div>
                <span>{props.rating}</span>
            </div>
            <div>Votes</div>
        </div>
        <h1>{props.title}</h1>
        <div className={classes.Info}>
            
            <div className={classes.Author}>{props.author}</div>
        </div>
    </article>
)

export default post;
