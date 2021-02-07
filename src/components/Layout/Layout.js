import React, { Component } from 'react';
import Aux from '../Auxx/Auxx';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {};

    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    loggedInUser={this.props.loggedInUser}
                />
                {this.props.children}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.jwtToken !== null,
        loggedInUser: state.auth.login
    };
};

export default connect(mapStateToProps)(Layout);
