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
import Login from '../Auth/Login';
import Dashboard from '../../components/Dashboard/Dashboard';
import NotFound from '../../components/404/404';


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
                    <Route path="/login" component={Login} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/categories' exact component={Categories} />
                    <Route path='/users' exact component={Users} />
                    <Route path='/dashboard' exact component={Dashboard} />
                    <Route path="/posts/:id" exact component={FullPost} />
                    <Route path="/categories/:id" exact component={FullCategory} />
                    <Route path='/users/:id' exact component={FullUser} />

                    {/* <Route component={NotFound} */}
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default MainPage;