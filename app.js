var BASE_PATH = 'Non-JSX-React-Router-Redux-Demo/app.html';
var BASE_PATH = '/';

// ACTIONS
const REPLACE_ALERT = 'REPLACE_ALERT';

// non-action constants

// ACTION CREATORS
function replace_alert(str) {
	return {
		type: REPLACE_ALERT,
		str
	};
}
// REDUCERS
/*
const initialState = {
	alert: ''
};
*/
function alert(state='', action) {
	switch (action.type) {
		case REPLACE_ALERT:
			return action.str;
		default:
			return state;
	}
}


const app = Redux.combineReducers({
	alert,
	routing: ReactRouterRedux.routerReducer
});

// STORE
// var middleware = ReactRouterRedux.routerMiddleware(ReactRouter.browserHistory);
// var store = Redux.createStore(app, middleware);
var store = Redux.createStore(app);
const history = ReactRouterRedux.syncHistoryWithStore(ReactRouter.hashHistory, store);

var unsubscribe = store.subscribe(() => console.log(store.getState()) );
history.listen(location => console.log('pathname:', location.pathname));

// REACT COMPONENTS - PRESENTATIONAL
var App = React.createClass({
	render() {
		var { children } = this.props;
		console.log('this.props:', this.props);

		return React.createElement('div', { id:'app', className:'app' },
			'App',
			React.createElement('div', { id:'nav', className:'nav' },
				'Nav:',
				React.createElement(ReactRouter.Link, { to:'/' },
					'Index'
				),
				' | ',
				React.createElement(ReactRouter.Link, { to:'/contact' },
					'Recording'
				),
				' | ',
				React.createElement(ReactRouter.Link, { to:'/about' },
					'About'
				)
			),
			React.createElement('div', { id:'page', className:'page' },
				children
			)
		);
	}
});

var AboutPage = React.createClass({
	render() {
		return React.createElement('div', null,
			'About'
		);
	}
});

var ContactPage = React.createClass({
	render() {
		return React.createElement('div', null,
			'Contact'
		);
	}
});

var IndexPage = React.createClass({
	render() {
		return React.createElement('div', null,
			'Index'
		);
	}
});

var InvalidPage = React.createClass({
	render() {
		console.log('InvalidPage props:', this.props);
		return React.createElement('div', null,
			'INVALID'
		);
	}
});

// REACT COMPONENTS - CONTAINER

// end - react-redux

function init() {
	console.log('rendering');
	ReactDOM.render(
		React.createElement(ReactRedux.Provider, { store },
			React.createElement(ReactRouter.Router, { history },
				React.createElement(ReactRouter.Route, { path:'/', component:App },
					React.createElement(ReactRouter.IndexRoute, { component:IndexPage }),
					React.createElement(ReactRouter.Route, { path:'contact', component:ContactPage }),
					React.createElement(ReactRouter.Route, { path:'about', component:AboutPage }),
					React.createElement(ReactRouter.Route, { path:'*', component:InvalidPage })
				)
			)
		),
		document.getElementById('root')
	);
	console.log('ok RENDERED');
}

window.addEventListener('DOMContentLoaded', init, false);
