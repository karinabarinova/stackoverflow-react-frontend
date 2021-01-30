import React, { Component } from 'react';
import axios from 'axios';
import classes from './Dashboard.module.css';
import Button from '../Button/Button';

class Dashboard extends Component {
    state = {
        questions: [],
        answers: [],
        login: null,
        rating: null,
        name: null,
        email: null,
        avatar: null
    }

    // componentDidMount() {
    //     axios.get()
    // }
    render() {
        return(
            <div className={classes.Dashboard}>
                <Button btnType="Success">Upload Avatar</Button>
                <Button btnType="Danger">Change Password</Button>
            </div>
        ) 
    }
}

export default Dashboard;
