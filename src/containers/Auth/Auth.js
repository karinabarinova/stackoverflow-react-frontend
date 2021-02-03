import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/index';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            login: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', //TO DO: change to text
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            fullName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', //TO DO: change to text
                    placeholder: 'Full Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
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
                    minLength: 6
                },
                valid: false,
                touched: "false"
            },
            repeat_password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Repeat Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHander = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.login.value, this.state.controls.password.value,
            this.state.controls.repeat_password.value, this.state.controls.email.value, this.state.controls.fullName.value, true);
        this.props.history.push('/verify-email');

    }

    switchAuthModeHandler = () => {
        this.props.history.push('/login');

    }

    render() {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementtype}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if (this.props.loading)
            form = <Spinner />

        let errorMessage = null;
        if (this.props.error)
            errorMessage = (
                <p className={classes.ErrorMessage}>{this.props.error}</p>
            )

        return(
            <div className={classes.Auth}>
                <svg xmlns="http://www.w3.org/2000/svg" height="10em" fill="none" opacity="0.25" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {errorMessage}
                <form onSubmit={this.submitHander}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch to SIGNIN
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (login, password, repeat_password, email, fullName, isSignup) => dispatch(actions.auth(login, password, repeat_password, email, fullName, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
