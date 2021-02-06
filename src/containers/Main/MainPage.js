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
import ResetPassword from '../Auth/ResetPassword';
import ConfirmResetPassword from '../Auth/ConfirmResetPassword';
import VerifyEmail from '../Auth/VerifyEmail';
import EditPost from '../../components/Posts/EditPost/EditPost';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as actions from '../../store/index';

import './MainPage.css';

class MainPage extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={Posts}/>
                <Route path="/register" component={Auth} />
                <Route path="/login" component={Login} />
                <Route path='/categories' exact component={Categories} />
                <Route path='/users' exact component={Users} />
                <Route path='/verify-email' exact component={VerifyEmail} />
                <Route path='/forgot-password' exact component={ResetPassword} />
                <Route path='/confirm-reset-password' exact component={ConfirmResetPassword} />
                <Route path="/posts/:id" exact component={FullPost} />
                <Route path="/categories/:id" exact component={FullCategory} />
                <Route path='/users/:id' exact component={FullUser} />
                <Route component={NotFound} />

            </Switch>
        );
        
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/" exact component={Posts}/>
                    <Route path="/new-post" component={NewPost} />
                    <Route path='/logout' component={Logout} />
                    <Route path="/login" component={Login} />
                    <Route path='/categories' exact component={Categories} />
                    <Route path='/users' exact component={Users} />
                    <Route path='/dashboard' exact component={Dashboard} />
                    <Route path='/editpost/:id' exact component={EditPost} />
                    <Route path="/posts/:id" exact component={FullPost} />
                    <Route path="/categories/:id" exact component={FullCategory} />
                    <Route path='/users/:id' exact component={FullUser} />
                    <Route component={NotFound} />

                </Switch>
            );
        }
        return (
            <div className="MainPage">
                <Layout/>
                {routes}
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.jwtToken != null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
