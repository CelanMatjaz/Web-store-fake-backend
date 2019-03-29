import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

//Sass
import './sass/index.scss';

//Store
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>	
	</Provider>, 
	document.getElementById('root')
);