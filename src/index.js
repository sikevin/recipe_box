//React
import React from 'react';
import {render} from 'react-dom';

//Components
import App from './components/App';
import Connection from './components/Connection';
import NotFound from './components/NotFound';

//CSS
import './index.css';

import {BrowserRouter, Match, Miss} from 'react-router';

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern='/' component={Connection} />
				<Match pattern='/box/:pseudo' component={App} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}

render(
	<Root />,
	document.getElementById('root')
);
