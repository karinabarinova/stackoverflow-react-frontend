import React, { Component } from 'react';
import axios from 'axios';
import classes from './Category.module.css';

class Category extends Component { 
    state = {
        count: null,
        error: false
    }

    componentDidMount() {
        axios.get('/categories/' + this.props.id + '/posts')
            .then(({data}) => {
                const count = data.length;
                this.setState({count: count});
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }
    
    render () {
        return (
            <article className={classes.Category} onClick={this.props.clicked}>
                <div className={classes.CategoryBlock}>
                </div>
                <p className={classes.Title}>{this.props.title}</p>
                <div className={classes.Info}>
                    <p>{this.props.description}</p>
                </div>
                <div>
                    {this.state.count} questions
                </div>
            </article>
        )
    }
    
}

export default Category;
