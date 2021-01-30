import React from 'react';
import './Comment.css';

const comment = (props) => (
    <div className="Comment">
        <p>{props.content}</p>
        <p>{props.publish_date.slice(0, 10)}</p>
        <p>{props.author}</p>
    </div>
);

export default comment;
