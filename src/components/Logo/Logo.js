import React from 'react';
import stackoverflowLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <a href="/">
            <img src={stackoverflowLogo} alt="UStackoverflow"/>
        </a>
    </div>
);

export default logo;
