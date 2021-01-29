import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './store/reducer';
import authReducer from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	reducer: reducer,
	auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

axios.defaults.baseURL = 'http://localhost:3001/api';
// axios.defaults.headers.common['Authorization'] = 'SOME_TOKEN'

axios.interceptors.request.use(req => {
	console.log(req);
  	return req;
}, error => {
	  console.log(error);
	  return Promise.reject(error);
})

axios.interceptors.response.use(req => {
	console.log(req);
	return req;
}, error => {
	console.log(error);
	return Promise.reject(error);
})

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
  	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
