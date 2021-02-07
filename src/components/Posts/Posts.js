import { React, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/index';
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
        needsUpdate: false,
        search: null,
        order_by: 'createdAt',
        order_direction: 'desc',
        prevPage: 0,
        currentPage: 0,
        nextPage: 0,
        limit: '10'
    };

    componentDidUpdate(){

        if (this.state.needsUpdate || this.props.search.length) {
            if (this.props.search.length) {
                if (this.props.search && this.props.search !== '' && this.props.search !== this.state.search) {
                    this.setState({search: this.props.search});
                    this.loadData(this.props.search);
                    this.props.onSearch('');
                }
            } else if (this.state.order_direction)
                this.loadData(null)
            else if (this.state.order_by)
                this.loadData(null)
            else if (this.state.currentPage)
                this.loadData(null)
        }
        
    }

    componentDidMount() {
        this.loadData(null);
    }
    
    loadData = (search) => {
        let page = 1;
        if (page !== this.state.currentPage)
            page = this.state.currentPage;
        
        let url = `posts?page=${page}&limit=3&order_by=${this.state.order_by}&order_direction=${this.state.order_direction}`
        if (search && search.length > 0)
            url = `/posts?page=1&limit=10&order_by=createdAt&order_direction=desc&search=${search}`;
        axios.get(url)
            .then((res) => {
                const posts = res.data.data.data;
                this.setState({ posts: posts, needsUpdate: false, nextPage: res.data.data.nextPage, prevPage: res.data.data.previousPage});
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

    changeTimeHandler = (e) => {
        if (e.target.value !== this.state.order_direction)
            this.setState({order_direction: e.target.value, needsUpdate: true})
    }

    changeSortHandler = (e) => {
        if (e.target.value !== this.state.order_by)
            this.setState({order_by: e.target.value, needsUpdate: true})
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

    prevPageHandler = () => {
        this.setState({currentPage: this.state.prevPage, needsUpdate: true});
    }

    nextPageHandler = () => {
        this.setState({currentPage: this.state.nextPage, needsUpdate: true});
    }

    render() {
        
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
                <label>Filter by Categories: </label>
                <select
                value={this.state.selectedOption}
                onChange={this.changeCategoryUpdateHandler}>
                    <option value="0">None</option>
                    {this.state.categories.map(({title, id}, index) => <option key={id} value={id}>{title}</option>)}
                </select>
                <label>Sort by Time: </label>
                <select
                value='-'
                onChange={this.changeTimeHandler}>
                    <option value="-">-</option>
                    <option value="desc">Start from newest</option>
                    <option value="asc">Start from oldest</option>
                </select>
                <label>Sort by : </label>
                <select
                value='-'
                onChange={this.changeSortHandler}>
                    <option value="-">-</option>
                    <option value="rating">Most votes</option>
                    <option value="updatedAt">Recent Activity</option>
                    <option value="createdAt">Newest</option>
                </select>
                
            </div>
        )
        let nextPage, prevPage = null;

        if (this.state.prevPage) {
            prevPage = (
                <div className="Pagination">
                    <Button btnType="Pages" clicked={this.prevPageHandler}>Previous Page</Button>
                </div>
            )
        }
        
        if (this.state.nextPage) {
            nextPage = (
                <div className="Pagination">
                    <Button btnType="Pages" clicked={this.nextPageHandler}>Next Page</Button>
                </div>
            )
        }
        return(
            <section className="Posts">
                <div className="header">
                    <div><h3>All Questions</h3></div>
                    <div><Button btnType="PostSuccess" clicked={this.newPostHandler}>New Post</Button></div>
                </div>
                {selectCategory}
                {posts}
                <div className="Pages">
                    {prevPage}
                    {nextPage}
                </div>
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

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (text) => dispatch(actions.search(text))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
