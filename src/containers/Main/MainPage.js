import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Posts from '../../components/Posts/Posts';
import FullPost from '../../components/Posts/FullPost/FullPost';
import NewPost from '../../components/Posts/NewPost/NewPost';

import './MainPage.css';

class MainPage extends Component {
    render() {
        return (
            <div className="MainPage">
                <Layout/>
                <Switch>
                    <Route path="/" exact component={Posts}/>
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/posts/:id" exact component={FullPost} />
                    {/* <Route component={NotFound} */}
                    <Route render={() => <h1>Page not found</h1>} />
                </Switch>
                
            </div>
        )
    }
}

export default MainPage;