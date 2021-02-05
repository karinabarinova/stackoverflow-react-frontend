import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/index';

import classes from './Search.module.css';

const Search = (props) => {
    const [search, setSearch] = useState('');

    const passSearchData = (e) => {
        e.preventDefault();
        props.onSearch(search);
        setSearch('')
    }

    return(
    <div className={classes.searchContainer}>
            <form>
                <input type="text" value={search} placeholder="Search for posts..." name="search" onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" onClick={passSearchData}><i className="fa fa-search"></i></button>
            </form>
    </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (text) => dispatch(actions.search(text))
    };
};

export default connect(null, mapDispatchToProps)(Search);
