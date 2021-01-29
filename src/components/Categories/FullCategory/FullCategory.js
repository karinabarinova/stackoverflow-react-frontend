import React, { Component } from 'react';
import axios from 'axios';
import './FullCategory.css';

class FullCategory extends Component {
    state = {
        loadedCategory: null
    }

    componentDidMount () {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData = () => {
        if (this.props.match.params.id)
            if (!this.state.loadedCategory || (this.state.loadedCategory && this.state.loadedCategory.id !== +this.props.match.params.id)) {
                axios.get('/categories/' + this.props.match.params.id)
                    .then(res => {
                        this.setState({loadedCategory: res.data})
                    })
                    .catch(e => {
                        console.log("Full Category")
                        console.log(e);
                    })
        }       
    }

    deleteCategoryHandler = () => {
        axios.delete('/categories/' + this.props.match.params.id)
            .then(res => {
                // console.log(res)
            })
            .catch()
    }    

    render () {
        let category = <p style={{textAlign: 'center'}}>Please select a Category!</p>;
        if (category.props.id)
            category = <p style={{textAlign: 'center'}}>Loading...</p>;
        if (this.state.loadedCategory) {
            category = (
                <div className="FullCategory">
                    <h1>{this.state.loadedCategory.title}</h1>
                    <p>{this.state.loadedCategory.description ? this.state.loadedCategory.description : "No description was provided to this category"}</p>
                    <div className="Edit">
                        <button onClick={this.deleteCategoryHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return category;
    }
}

export default FullCategory;
