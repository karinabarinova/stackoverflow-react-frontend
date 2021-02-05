import React from 'react';
import defaultUserAvatar from '../../../assets/images/default-avatar.png';
import './Subcomment.css';

const Subcomment = (props) => {
    return (
        <div className="Subcomment">
            <div className="content">
                <p>{props.content}</p>
            </div>
            <div className="aboutAuthor">
                <div className="Info">
                    {props.auth ? (<div className="Buttons">
                        <button className="EditButton">Edit</button>
                        <button className="DeleteButton">Delete</button>
                    </div>) : null }
                    <div className="User">
                        <div>answered {props.publish_date.replace('T', ' ').slice(0, 16)}</div>
                        <div className="avatar"><img src={props.author.avatar ?  "http://localhost:3001/" + props.author.avatar.replace('resources', '') : defaultUserAvatar} target="_blank" alt="author avatar" /></div>
                        <div className="Author">{props.author.login}</div>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Subcomment;
