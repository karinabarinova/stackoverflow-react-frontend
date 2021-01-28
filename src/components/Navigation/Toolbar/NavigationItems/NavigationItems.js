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
        <NavigationItem link="/register">Sign Up</NavigationItem>
        <NavigationItem link="/login">Sign In</NavigationItem>
    </ul>
)

export default navigationItems;
