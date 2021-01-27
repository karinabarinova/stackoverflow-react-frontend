import React from 'react';

import classes from './Search.module.css';

const search = () => (
    <div className={classes.searchContainer}>
            <form>
                <input type="text" placeholder="Search.." name="search"/>
                <button type="submit"><i className="fa fa-search"></i></button>
            </form>
    </div>
)

export default search;
