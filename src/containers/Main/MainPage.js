import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Posts from '../../components/Posts/Posts';
import FullPost from '../../components/Posts/FullPost/FullPost';
import FullCategory from '../../components/Categories/FullCategory/FullCategory';
import NewPost from '../../components/Posts/NewPost/NewPost';
import Auth from '../Auth/Auth';
import Logout from '../Auth/Logout/Logout';
import Categories from '../../components/Categories/Categories';
import Users from '../../components/Users/Users';
import FullUser from '../../components/Users/FullUser/FullUser';

import './MainPage.css';

class MainPage extends Component {
    render() {
        return (
            <div className="MainPage">
                <Layout/>
                <Switch>
                    <Route path="/" exact component={Posts}/>
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/register" component={Auth} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/categories' exact component={Categories} />
                    <Route path='/users' exact component={Users} />
                    <Route path="/posts/:id" exact component={FullPost} />
                    <Route path="/categories/:id" exact component={FullCategory} />
                    <Route path='/users/:id' exact component={FullUser} />

                    {/* <Route component={NotFound} */}
                    <Route render={() => <h1>Page not found</h1>} />
                </Switch>
            </div>
        )
    }
}

export default MainPage;