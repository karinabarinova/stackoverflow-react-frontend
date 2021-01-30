import React from 'react';
import classes from './User.module.css';

const user = (props) => {
    return (
    <article className={classes.User} onClick={props.clicked}>
        <h1>{props.login}</h1>
        <div>
            <p>{props.rating}</p>
        </div>
        {/* {props.avatar ? <div><img src={"http://localhost:3001/api/" + props.avatar} target="_blank"/></div> : null} */}
        {/* <div className={classes.Info}>
            <p>{props.description}</p>
        </div> */}
    </article>
)}

export default user;
