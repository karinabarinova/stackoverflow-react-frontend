import React from 'react';
import stackoverflowLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={stackoverflowLogo} alt="UStackoverflow"/>
    </div>
);

export default logo;
