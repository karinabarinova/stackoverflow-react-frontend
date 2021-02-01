import React from 'react';
import classes from './User.module.css';
import defaultUserAvatar from '../../../assets/images/default-avatar.png';

const user = (props) => {
    return (
    <article className={classes.User} onClick={props.clicked}>
        <h1>{props.login}</h1>
        <div>
            <p>{props.rating}</p>
        </div>
        <div className={classes.avatar}><img src={ props.avatar ?  "http://localhost:3001/" + props.avatar.replace('resources', '') : defaultUserAvatar} target="_blank" alt="user avatar"/></div>
        {/* <div className={classes.Info}>
            <p>{props.description}</p>
        </div> */}
    </article>
)}

export default user;
