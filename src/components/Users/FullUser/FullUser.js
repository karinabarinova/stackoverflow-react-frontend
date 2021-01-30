import React, { Component } from 'react';
import axios from 'axios';
import './FullUser.css';

class FullUser extends Component {
    state = {
        loadedUser: null,
    }

    componentDidMount () {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData = () => {
        if (this.props.match.params.id)
            if (!this.state.loadedUser || (this.state.loadedUser && this.state.loadedUser.id !== +this.props.match.params.id)) {
                axios.get('/users/' + this.props.match.params.id)
                    .then(res => {
                        this.setState({loadedUser: res.data})
                    })
                    .catch(e => {
                        console.log("Full User")
                        console.log(e);
                    })
        }       
    }

    render () {
        let user = <p style={{textAlign: 'center'}}>Please select a User!</p>;
        if (user.props.id)
            user = <p style={{textAlign: 'center'}}>Loading...</p>;
        if (this.state.loadedUser) {
            user = (
                <div className="FullUser">
                    <h1>{this.state.loadedUser.fullName}</h1>
                    <div>
                        <p>Rating: {this.state.loadedUser.rating}</p>
                        <p>{this.state.loadedUser.login}</p>
                        <p>{this.state.loadedUser.email}</p>
                        <p>Account created on: {this.state.loadedUser.created.slice(0, 10)}</p>
                    </div>

                    {/* <div className="Edit">
                        <button onClick={this.deleteCategoryHandler} className="Delete">Delete</button>
                    </div> */}
                </div>
    
            );
        }
        return user;
    }
}

export default FullUser;
