import React, { Component } from 'react';
import axios from 'axios';
import './FullCategory.css';
import Post from '../../Posts/Post/Post';

class FullCategory extends Component {
    state = {
        loadedCategory: null,
        postsUnderCategory: []
    }

    componentDidMount () {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData = () => {
        if (this.props.match.params.id)
            if (!this.state.loadedCategory || (this.state.loadedCategory && this.state.loadedCategory.id !== +this.props.match.params.id)) {
                axios.get('/categories/' + this.props.match.params.id)
                    .then(res => {
                        this.setState({loadedCategory: res.data})
                    })
                    .catch(e => {
                        console.log("Full Category")
                        console.log(e);
                    })
                axios.get('/categories/' + +this.props.match.params.id + '/posts')
                    .then(res => {
                        console.log(res);
                        this.setState({ postsUnderCategory: res.data})
                    })
                    .catch(e => {
                        console.log("Full Category")
                        console.log(e)
                    })
        }       
    }

    deleteCategoryHandler = () => {
        axios.delete('/categories/' + this.props.match.params.id)
            .then(res => {
                // console.log(res)
            })
            .catch()
    }    

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id);
    }


    render () {
        let category = <p style={{textAlign: 'center'}}>Please select a Category!</p>;
        let posts = null;
        if (category.props.id)
            category = <p style={{textAlign: 'center'}}>Loading...</p>;
        if (this.state.loadedCategory) {
            category = (
                <div className="FullCategory">
                    <h1>{this.state.loadedCategory.title}</h1>
                    <p>{this.state.loadedCategory.description ? this.state.loadedCategory.description : "No description was provided to this category"}</p>
                    <div className="Edit">
                        <button onClick={this.deleteCategoryHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        if (this.state.postsUnderCategory.length) {
            posts = this.state.postsUnderCategory.map(post => {
                return <Post 
                        key={post.id}
                        title={post.title}
                        id={post.id}
                        author={post.author} //TODO: incorrect author
                        rating={post.rating}
                        publish_date={post.publish_date}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
            })
        }
        return (
            <div>
                {category}
                <div className="CategoryPosts">
                    {posts}
                </div>
            </div>
        );
    }
}

export default FullCategory;
