import React, { Component } from 'react';
import axios from 'axios';
// import Logo from '../../components/Logo/Logo'
import Layout from '../../components/Layout/Layout';
import Post from '../../components/Post/Post'

import './MainPage.css';

class MainPage extends Component {
    state = {
        posts: [],
        error: false
    };

    componentDidMount() {
        axios.get('/posts')
            .then((res) => {
                const posts = res.data.data.data;
                // console.log(posts)
                this.setState({ posts: posts });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        let posts = <p style={{textAlign: "center"}}>Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                console.log(post)
                return <Post 
                    key={post.id}
                    title={post.title}
                    author={post.author}
                />
            })
        }
        return (
            <div className="MainPage">
                <Layout>
                    <section className="Posts">
                        {posts}
                    </section>
                </Layout>
            </div>
        )
    }
}

export default MainPage;