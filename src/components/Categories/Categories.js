import { React, Component } from 'react';
import Category from './Category/Category';
import axios from 'axios';
import './Categories.css';

class Categories extends Component {
    state = {
        categories: [],
        error: false
    };

    componentDidMount() {
        axios.get('/categories')
            .then(({data}) => {
                const categories = data;
                this.setState({ categories: categories });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    categorySelectedHandler = (id) => {
        this.props.history.push('/categories/' + id);
    }

    render() {
        let categories = <p style={{textAlign: "center"}}>Something went wrong!</p>
        if (!this.state.error) {
            categories = this.state.categories.map(category => {
                return <Category 
                        key={category.id}
                        title={category.title}
                        id={category.id}
                        description={category.description}
                        clicked={() => this.categorySelectedHandler(category.id)}
                    />
            })
        }
        return(
            <div className="container">
                <div>
                    <h3>Categories</h3>
                    <p>A category is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
                </div>
                <section className="Categories">
                    {categories}
                </section>
            </div>
            
        )
    }
}

export default Categories;
