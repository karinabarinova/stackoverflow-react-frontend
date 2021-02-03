import React, { Component, useContext, useState } from 'react';
import axios from 'axios';
import '../NewPost/NewPost.css';

class EditPost extends Component {
    state = {
        id: null,
        title: '',
        content: '',
        status: ''
    }

    componentDidMount() {
        console.log(this.props);
        if (this.props.location.state && this.props.location.state.editPost) {
            this.setState({
                id: this.props.location.state.editPost.id,
                title: this.props.location.state.editPost.title,
                content: this.props.location.state.editPost.content,
                status: this.props.location.state.editPost.status
            })
        } else {
            this.props.history.goBack();
        }
    }

  handleTitleChange = (event) => {
    this.setState({...this.state, title: event.target.value });
  }

  handleContenChange = (event) => {
    this.setState({...this.state, content: event.target.value });
  }
  handleStatusChange = (event) => {
      this.setState({...this.state, status: event.target.value});
  }

  submitHandler = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const content = event.target.content.value;
    const status = event.target.status.value;

    const data = {title,
                  content,
                  status
                 }
    const config = {
        headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }
    }
    axios.patch("/posts/" + this.state.id, data, config)
      .then(res => this.props.history.push(`/posts/${this.state.id}`))
      .catch(err => console.log(err))
  }

    render() {
        return(
            <div className="NewPost">
                <form onSubmit={this.submitHandler}>
                    <h1>Edit Post</h1>
                    <label>Title</label>
                    <input
                        id='title'
                        label='title'
                        margin="normal"
                        value={this.state.title}
                        onChange={this.handleTitleChange} 
                    ></input>                    
                    <label>Content</label>
                    <input
                        id='content'
                        label='content'
                        multiline
                        rows="4"
                        margin='normal'
                        value={this.state.content}
                        onChange={this.handleContenChange} 
                    ></input>                        
                    <label>Status</label>
                    <select value={this.state.status} onChange={this.handleStatusChange} id='status'>
                        <option>active</option>
                        <option>inactive</option>
                    </select>
                        <button type="submit"> Submit </button>
                </form>
                <button onClick={() => this.props.history.push(`/posts/${this.state.id}`)}> Cancel </button>
            </div>
    )}
}

export default EditPost;
