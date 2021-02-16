import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../../../store/index';

class Logout extends Component {
    componentDidMount() {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.post('/auth/logout', config)
            .then(res => {
                return;
            })
            .catch(e => console.log(e))
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);
