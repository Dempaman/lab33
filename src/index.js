import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/reducers.js'

const initialState = {
	history:[],
	login:{
		user: null,
	},
	adminItem: { past:[], present:[], future:[] },
	cartItems: { past:[], present:[], future:[] },
	items: {
		fetchState: 0,
		itemsData: null,
	}
};


const store = createStore(rootReducer, initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  ReactDOM.render((
  	<Provider store={store}>
  		<App />
  	</Provider>
  ), document.getElementById('root'));
  registerServiceWorker();
