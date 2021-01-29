import React, { Component } from 'react';
import Aux from '../Auxx/Auxx';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
import Footer from '../Footer/Footer';

class Layout extends Component {
    state = {};

    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                />
                {this.props.children}
                {/* <Footer /> */}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.jwtToken !== null
    };
};

export default connect(mapStateToProps)(Layout);
