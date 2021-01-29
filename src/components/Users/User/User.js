import React from 'react';
import classes from './User.module.css';

const user = (props) => {
    return (
    <article className={classes.User} onClick={props.clicked}>
        <h1>{props.login}</h1>
        <div>
            <p>{props.rating}</p>
        </div>
        {/* <div className={classes.Info}>
            <p>{props.description}</p>
        </div> */}
    </article>
)}

export default user;
