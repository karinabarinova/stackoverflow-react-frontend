import { React, Component } from 'react';
import axios from 'axios';
import User from './User/User';
import './Users.css';

class Users extends Component {
    state = {
        users: [],
        error: false
    };

    componentDidMount() {
        axios.get('/users')
            .then((res) => {
                const users = res.data;
                this.setState({ users: users });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    userSelectedHandler = (id) => {
        this.props.history.push('/users/' + id);
    }

    render() {
        let users = <p style={{textAlign: "center"}}>Something went wrong!</p>
        if (!this.state.error) {
            users = this.state.users.map(user => {
                return <User 
                        key={user.id}
                        fullName={user.fullName}
                        email={user.email}
                        login={user.login}
                        rating={user.rating}
                        avatar={user.avatar}
                        created={user.created}
                        clicked={() => this.userSelectedHandler(user.id)}
                    />
            })
        }
        return(
            <div>
                <div>
                    <h3>Users</h3>
                </div>
                <section className="Users">
                    {users}
                </section>
            </div>
            
        )
    }
}

export default Users;
