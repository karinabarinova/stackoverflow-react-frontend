import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import classes from './Login.module.css';
import * as actions from '../../store/index';
import { checkValidity } from '../../shared/utility';


class Login extends Component {
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
            null, this.state.controls.email.value, null, false);
    }

    switchAuthModeHandler = () => {
        this.props.history.push('/register');

    }
    switchForgotPassword = () => {
        this.props.history.push('/forgot-password');
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
        
        let authRedirect = null;
        if (this.props.isAuthenticated)
                authRedirect = <Redirect to="/" />

        return(
            <div className={classes.Login}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHander}>
                    {form}
                    <div className={classes.forgot}>
                        <hr />
                        <Link to="/forgot-password">Forgot Password?</Link>
                    {/* <Button 
                        clicked={this.switchForgotPassword}
                        btnType="ForgotPassword">Forgot Password?
                    </Button> */}
                    </div>
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch to SIGNUP
                </Button>
                {/* <hr className={classes.hr} /> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.jwtToken !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (login, password, repeat_password, email, fullName, isSignup) => dispatch(actions.auth(login, password, repeat_password, email, fullName, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
