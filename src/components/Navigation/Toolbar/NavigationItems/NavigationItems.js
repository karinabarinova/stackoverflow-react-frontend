import React from 'react';
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
        {props.isAuthenticated ? <div><p>{props.loggedInUser}</p></div> : null}
    </ul>
)

export default navigationItems;
