import React from 'react';
import classes from './Category.module.css';

const category = (props) => {
    return (
    <article className={classes.Category} onClick={props.clicked}>
        <div className={classes.CategoryBlock}>
        </div>
        <h1>{props.title}</h1>
        <div className={classes.Info}>
            <p>{props.description}</p>
        </div>
    </article>
)}

export default category;
