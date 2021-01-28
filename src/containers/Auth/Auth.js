import React, { Component } from 'react';
import Input from '';
import Button from '';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    render() {
        return(
            <div>
                <form>

                </form>
            </div>
        )
    }
}

export default Auth;
