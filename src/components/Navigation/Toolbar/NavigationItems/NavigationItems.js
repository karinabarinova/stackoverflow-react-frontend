import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Search from '../Search/Search';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <Search />
        <NavigationItem link="/" active>Home</NavigationItem>
        <NavigationItem link="/">New Post</NavigationItem>
        <NavigationItem link="/">Login</NavigationItem>
        <NavigationItem link="/">Register</NavigationItem>
    </ul>
)

export default navigationItems;
