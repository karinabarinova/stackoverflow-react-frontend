import React, { Component } from 'react';
import Aux from '../Auxx/Auxx';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component {
    state = {};

    render() {
        return (
            <Aux>
                <Toolbar />
            </Aux>
        )
    }
}

export default Layout;
