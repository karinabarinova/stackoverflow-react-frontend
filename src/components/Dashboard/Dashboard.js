import React, { Component } from 'react';
import axios from 'axios';
import classes from './Dashboard.module.css';
import Button from '../Button/Button';
import defaultUserAvatar from '../../assets/images/default-avatar.png';

class Dashboard extends Component {
    state = {
        questions: [],
        answers: [],
        user: {}
    }

    componentDidMount() {
        const id = +localStorage.getItem('userId');
        axios.get('/users/' + id)
            .then(res => {
                // console.log(res.data)
                this.setState({ user: res.data })
            })
            .catch(e => {
                console.log(e)
                console.log("Dashboard")
            })
    }

    render() {
        return(
            <div className={classes.Dashboard}>
                <div className={classes.Info}>
                    <div>
                        <img src={this.state.user.avatar ? "localhost:3001/api" + localStorage.getItem('avatar').replace('resources', '') : defaultUserAvatar} alt="Profile {hoto" />
                    </div>
                    <div className={classes.generalInfo}>
                        <p><b>User:</b> {this.state.user.login}</p>
                        <p><b>Account created at:</b> {this.state.user.created}</p>
                        <p><b>Your email:</b> {this.state.user.email}</p>
                        <p><b>Full name:</b> {this.state.user.fullName}</p>
                        <p><b>Your rating:</b> {this.state.user.rating}</p>
                    </div>
                </div>
                <Button btnType="DashboardSuccess">Upload Avatar</Button>
                <Button btnType="DashboardDanger">Change Password</Button>
                <div className={classes.questions}>

                </div>
                <div className={classes.answers}></div>
            </div>
        ) 
    }
}

export default Dashboard;
