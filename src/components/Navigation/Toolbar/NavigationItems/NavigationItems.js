import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUserCircle } from '@fortawesome/free-solid-svg-icons'
import defaultUserAvatar from '../../../../assets/images/default-avatar.png';


import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Search from '../Search/Search';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <Search />
        <NavigationItem 
        link="/" 
        exact
        activeClassName="home-active"
        >Posts</NavigationItem>
        <NavigationItem link="/categories" >Categories</NavigationItem>
        <NavigationItem link="/users" >Users</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/new-post">New Post</NavigationItem> : null}
        { !props.isAuthenticated 
            ? <><NavigationItem link="/login">Sign In</NavigationItem>
            <NavigationItem link="/register">Sign Up</NavigationItem></>
            : <NavigationItem link="/logout">Log out</NavigationItem>}
        {props.isAuthenticated ? <div><NavLink className={classes.Dashboard} to="/dashboard"><img src={localStorage.getItem('avatar') !== 'undefined' ? "http://localhost:3001/" + localStorage.getItem('avatar').replace('resources', '') : defaultUserAvatar} target="_blank" alt="user avatar"/>
{localStorage.getItem('username')}</NavLink></div> : null}
    </ul>
)

export default navigationItems;
