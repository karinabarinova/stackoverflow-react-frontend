import { React, Component } from 'react';
import Post from './Post/Post';
import axios from 'axios';

class Posts extends Component {
    state = {
        posts: [],
        error: false
    };

    componentDidMount() {
        axios.get('/posts?page=1&limit=10&order_by=createdAt&order_direction=desc')
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
                return <Post 
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    rating={post.rating}
                    publish_date={post.publish_date}
                />
            })
        }
        return(
            <section className="Posts">
                <h3>Top Questions</h3>
                {posts}
            </section>
        )
    }
}

export default Posts;
