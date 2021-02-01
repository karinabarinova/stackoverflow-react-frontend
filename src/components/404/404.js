import React from 'react';
import './404.css';

const notFound = () => (
    <div className="notFound">
        <div className="col1">
            <img src="https://cdn.sstatic.net/Sites/stackoverflow/img/404.svg" alt="Page not fount" />
        </div>
        <div className="col2">
            <h3>Page not found</h3>
            <h5>We're sorry, we coundn't find the page you requested</h5>
        </div>
    </div>
)

export default notFound;
