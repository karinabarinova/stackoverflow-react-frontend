import React from 'react';
import './Comment.css';

const comment = (props) => (
    <div className="Comment">
        <p>{props.content}</p>
        <p>answered {props.publish_date.replace('.000Z', '').replace('T', ' ')}</p>
        <p>{props.author}</p>
    </div>
);

export default comment;
