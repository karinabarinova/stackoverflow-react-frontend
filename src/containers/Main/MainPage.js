import React, { Component } from 'react';
import axios from 'axios';
// import Logo from '../../components/Logo/Logo'
import Layout from '../../components/Layout/Layout';
import Posts from '../../components/Posts/Posts';

import './MainPage.css';

class MainPage extends Component {
    
    render() {
        return (
            <div className="MainPage">
                <Layout>
                    <Posts />
                </Layout>
            </div>
        )
    }
}

export default MainPage;