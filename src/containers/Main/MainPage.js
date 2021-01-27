import React, { Component } from 'react';
import axios from 'axios';
// import Logo from '../../components/Logo/Logo'
import Layout from '../../components/Layout/Layout';

import './MainPage.css';

class MainPage extends Component {
    state = {};

    render() {
        return (
            <div className="MainPage">
                <Layout />
            </div>
        )
    }
}

export default MainPage;