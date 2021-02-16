import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ResetPassword.module.css';
import { checkValidity } from '../../shared/utility';
import axios from 'axios';

class ResetPassword extends Component {
    state = {
        controls: {
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
            }
        }
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
        axios.post('auth/password-reset', { email: this.state.controls.email.value})
            .then(res => {
                this.props.history.push('/confirm-reset-password');
            })
            .catch(e => {
                console.log(e);
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
        if (this.props.error)
            errorMessage = (
                <p style={{textTransform: 'capitalize'}}>{this.props.error}</p>
            )
        
        return (
            <div className={classes.ResetPassword}>
                {errorMessage}
                <h3>Wanna Reset your Password?</h3>
                <p>Provide your email address and check out your mailbox to get a token</p>
                <form onSubmit={this.submitHander}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        )
    }
}

export default ResetPassword;
