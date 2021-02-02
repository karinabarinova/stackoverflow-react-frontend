import React, { Component } from 'react';
import axios from 'axios';
import classes from './Dashboard.module.css';
import Button from '../Button/Button';
import Post from '../Posts/Post/Post';
import defaultUserAvatar from '../../assets/images/default-avatar.png';
import Comment from '../Comment/Comment';

class Dashboard extends Component {
    state = {
        questions: [],
        answers: [],
        user: {},
        error: false,
        avatar: {}
    }

    componentDidMount() {
        const id = +localStorage.getItem('userId');
        axios.get('/users/' + id)
            .then(res => {
                this.setState({ user: res.data })
            })
            .catch(e => {
                this.setState({error: true})
                console.log("Dashboard")
            })
        axios.get('/users/' + id + '/posts', {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }})
            .then(res => {
                this.setState({ questions: res.data })
            })
            .catch(e => {
                this.setState({error: true})
                console.log("Dashboard")
            })
        axios.get('/users/' + id + '/comments', {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }})
            .then(res => {
                this.setState({ answers: res.data })
            })
            .catch(e => {
                this.setState({error: true})
                console.log("Dashboard")
            })
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id);
    }

    handlerInputChange = (event) => {
        event.preventDefault();
        this.setState({
            avatar: event.target.files[0] 
        })
    }

    submitHander = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('avatar', this.state.avatar);
        const config = {
            headers: { 
                'Content-type': 'multipart/form-data',
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }

        axios.post('/users/avatar', formData, config)
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        let questions = <p>You have not asked any questions yet ;(</p>;
        let answers = <p>You have not answer to any questions yet ;(</p>;

        if (!this.state.error) {
            questions = this.state.questions.map(post => {
                return <Post 
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        authorId={post.author}
                        content={post.content}
                        author={post.author}
                        rating={post.rating}
                        publish_date={post.publish_date}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
            })
            answers = this.state.answers.map(answer => {
                return <Comment 
                            key={answer.id}
                            content={answer.content}
                            author={answer.author} //TODO: incorrect author
                            publish_date={answer.publish_date}
                        />
            })
        }
        return(
            <div className={classes.Dashboard}>
                <div className={classes.Info}>
                    <div>
                        <img src={localStorage.getItem('avatar') !== 'undefined' ? "localhost:3001/api/" + localStorage.getItem('avatar').replace('resources', '') : defaultUserAvatar} alt="Profile {hoto" />
                    </div>
                    <div className={classes.generalInfo}>
                        <p><b>User:</b> {this.state.user.login}</p>
                        <p><b>Account created at:</b> {this.state.user.created}</p>
                        <p><b>Your email:</b> {this.state.user.email}</p>
                        <p><b>Full name:</b> {this.state.user.fullName}</p>
                        <p><b>Your rating:</b> {this.state.user.rating}</p>
                    </div>
                    <form onSubmit={(e) => this.submitHander(e)} enctype="multipart/form-data">
                        <label className={classes.UploadAvatar}>Upload Avatar 
                            <input type="file" single onChange={(e) => this.handlerInputChange(e)} name="avatar" accept="image/*" />
                        </label>
                        <Button btnType="DashboardSuccess">Submit Avatar</Button>
                    </form>
                    
                    {/* <Button btnType="DashboardSuccess">Upload Avatar</Button> */}
                    <Button btnType="DashboardDanger">Change Password</Button>
                </div>
                <div className={classes.Content}>
                    <div className={classes.questions}>
                        {questions}
                    </div>
                    <div className={classes.answers}>
                        {answers}
                    </div>
                </div>
            </div>
        ) 
    }
}

export default Dashboard;
