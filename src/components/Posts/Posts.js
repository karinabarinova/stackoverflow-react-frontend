import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Post from './Post/Post';
import Button from '../Button/Button';
import axios from 'axios';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        categories: [],
        selectedOption: '0', 
        error: false,
        needsUpdate: false
    };

    // componentDidUpdate(){
    //     // this.loadData();
    // }

    componentDidMount() {
        if (!this.props.posts)
            this.loadData();
    }
    
    loadData = () => {
        axios.get('/posts?page=1&limit=10&order_by=createdAt&order_direction=desc')
            .then((res) => {
                const posts = res.data.data.data;
                this.setState({ posts: posts, needsUpdate: false });
            })
            .catch(error => {
                this.setState({ error: true })
            })
        axios.get('/categories')
            .then((res) => {
                this.setState({ categories: res.data, needsUpdate: false });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    changeCategoryHandler = () => {
        const categoryId = this.state.selectedOption;
        if (categoryId !== '0') {
            console.log(categoryId);
            axios.get('/categories/' + +categoryId + '/posts')
                .then(res => {
                    this.setState({posts: res.data, needsUpdate: true})
            })
                .catch(e => console.log(e))
        }
    }

    changeCategoryUpdateHandler = (e) => {
        this.setState({selectedOption: e.target.value}, this.changeCategoryHandler)
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id);
    }

    newPostHandler = () => {
        if (this.props.isAuthenticated)
            this.props.history.push('/new-post');
        else
            this.props.history.push('/login');
    }

    render() {
        console.log("SEARCG_DATA", this.props.search)
        let posts = <p style={{textAlign: "center"}}>Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
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
        let selectCategory = (
            <div>
                <select
                value={this.state.selectedOption}
                onChange={this.changeCategoryUpdateHandler}>
                    <option value="0">None</option>
                    {this.state.categories.map(({title, id}, index) => <option key={id} value={id}>{title}</option>)}
                </select>
            </div>
        )

        return(
            <section className="Posts">
                <div className="header">
                    <div><h3>All Questions</h3></div>
                    <div><Button btnType="Success" clicked={this.newPostHandler}>New Post</Button></div>
                </div>
                {selectCategory}
                {posts}
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.jwtToken !== null,
        search: state.auth.search
    };
};

export default connect(mapStateToProps, null)(Posts);
