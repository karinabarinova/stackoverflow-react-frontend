import React, { Component } from 'react';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import classes from './ResetPassword.module.css';
import { checkValidity } from '../../shared/utility';
import axios from 'axios';

class ConfirmResetPassword extends Component {
    state = {
        controls: {
            token: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Confirmation Token'
                },
                value: '',
                validation: {
                    required: true,
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
                    placeholder: ' Repeat password'
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
        error: false,
        result: false
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
        axios.post('/auth/reset-password', { 
            token: this.state.controls.token.value,
            password: this.state.controls.password.value,
            confirmPassword: this.state.controls.repeat_password.value 
        })
            .then(res => {
                this.setState({result: true})
            })
            .catch(e => {
                this.setState({ error: true});
            })
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
        if (this.state.error)
            errorMessage = (
                <p className={classes.ErrorMessage}>Invalid Token or Password</p>
            )
        let resultMessage = null;
        if (this.state.result)
                resultMessage = (
                    <p className={classes.SuccessMessage}>Password reset successfully, you can now login</p>
                )
        
        return (
            <div className={classes.ResetPassword}>
                {errorMessage}
                {resultMessage}
                <h3>Confirm your email</h3>
                <p>Provide the token you received to your mailbox</p>
                <form onSubmit={this.submitHander}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        )
    }
}

export default ConfirmResetPassword;
