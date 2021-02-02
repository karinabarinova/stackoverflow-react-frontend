import React, { Component } from 'react';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        categories: ''
    }

    postDataHandler = () => {
        const post = {
            title: this.state.title,
            content: this.state.content,
            categories: this.state.categories
        }
        axios.post('/posts', post, {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }})
            .then((res) => {
                console.log(res);
            })
            .catch(e => {
                console.log("New Post")
                console.log(e)
            })
    }

    render() {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Categories</label>
                <input type="text" value={this.state.categories} onChange={(event) => this.setState({categories: event.target.value})} />
                {/* <select value={this.state.categories} onChange={(event) => this.setState({categories: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select> */}
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        )
    }
}

export default NewPost;
