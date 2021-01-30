import React from 'react';
import './Comment.css';

const comment = (props) => (
    <div>
        <p>{props.content}</p>
        <p>{props.publish_date}</p>
        <p>{props.author}</p>
    </div>
);

export default comment;
