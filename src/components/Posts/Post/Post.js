import React from 'react';
import classes from './Post.module.css';

const post = (props) => {
    const date = new Date(props.publish_date);
    const changedDate = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
    return (
    <article className={classes.Post}>
        <div className={classes.Postblock}>
            <div>
                <span>{props.rating}</span>
            </div>
            <div>Votes</div>
        </div>
        <h1>{props.title}</h1>
        <div className={classes.Info}>
            <div>asked {changedDate}</div>
            <div className={classes.Author}>{props.author}</div>
        </div>
    </article>
)}

export default post;
