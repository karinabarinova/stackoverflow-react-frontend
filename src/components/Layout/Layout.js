import React, { Component } from 'react';
import Aux from '../Auxx/Auxx';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Footer from '../Footer/Footer';

class Layout extends Component {
    state = {};

    render() {
        return (
            <Aux>
                <Toolbar />
                {this.props.children}
                {/* <Footer /> */}
            </Aux>
        )
    }
}

export default Layout;
