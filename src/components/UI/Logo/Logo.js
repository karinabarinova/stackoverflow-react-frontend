import React from 'react';
import { Link } from 'react-router-dom';
import stackoverflowLogo from '../../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <Link to="/">
            <img src={stackoverflowLogo} alt="UStackoverflow"/>
        </Link>
    </div>
);

export default logo;
