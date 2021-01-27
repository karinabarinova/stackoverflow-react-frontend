import React, { Component } from 'react';
import axios from 'axios';

import './MainPage.css';

class MainPage extends Component {
    state = {};

    render() {
        return (
            <div className="MainPage">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/register">Register</a></li>
                        </ul>
                    </nav>
                </header>
            </div>
        )
    }
}

export default MainPage;