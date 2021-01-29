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
        >Home</NavigationItem>
        <NavigationItem link="/new-post">New Post</NavigationItem>
        { !props.isAuthenticated 
            ? <><NavigationItem link="/login">Sign In</NavigationItem>
            <NavigationItem link="/register">Sign Up</NavigationItem></>
            : <NavigationItem link="/logout">Log out</NavigationItem>}
    </ul>
)

export default navigationItems;
