import { React, Component } from 'react';
import Post from './Post/Post';
import axios from 'axios';
import './Posts.css';

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

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id);
    }

    render() {
        let posts = <p style={{textAlign: "center"}}>Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                console.log(post)
                return <Post 
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        authorId={post.authorId}
                        content={post.content}
                        author={post.author}
                        rating={post.rating}
                        publish_date={post.publish_date}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
            })
        }
        return(
            <section className="Posts">
                <h3>All Questions</h3>
                {posts}
            </section>
        )
    }
}

export default Posts;
