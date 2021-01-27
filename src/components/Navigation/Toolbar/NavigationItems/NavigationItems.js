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
        <NavigationItem link="/">New Post</NavigationItem>
        <NavigationItem link="/login">Login</NavigationItem>
        <NavigationItem link="/register">Register</NavigationItem>
    </ul>
)

export default navigationItems;
