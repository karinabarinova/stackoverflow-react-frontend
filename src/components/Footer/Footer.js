import React from 'react';
import classes from './Footer.module.css'

const footer = () => (
    <div className={classes.Footer}>
        <div className={classes.container}>
            <div className={classes.row}>
                <div className={classes.col}>
                        <h4>UStackoverflow</h4>
                        <ul className={classes.list_unstyled}>
                            <li>234-232-5678</li>
                            <li>Kyiv, Ukraine</li>
                            <li>123 Street South North</li>
                        </ul>
                </div>
                <div className={classes.col}>
                        <h4>New Stuff</h4>
                        <ul className={classes.list_unstyled}>
                            <li>Some stuff</li>
                            <li>Policy</li>
                            <li>Other Stuff</li>
                        </ul>
                </div>
                <div className={classes.col}>
                        <h4>New Column</h4>
                        <ul className={classes.list_unstyled}>
                            <li>Some info</li>
                            <li>Info about stuff</li>
                            <li>Other INFO</li>
                        </ul>
                </div>
            </div>
            <hr />
            <div className={classes.row}>
                <p>&copy;{new Date().getFullYear()} All Rights Reserved</p>
            </div>
        </div>
    </div>
);

export default footer;
