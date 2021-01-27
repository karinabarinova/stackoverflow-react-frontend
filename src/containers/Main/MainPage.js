import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Posts from '../../components/Posts/Posts';

// import './MainPage.css';

class MainPage extends Component {
    render() {
        return (
            <div className="MainPage">
                <Layout/>
                <Route path="/" exact component={Posts}/>
            </div>
        )
    }
}

export default MainPage;