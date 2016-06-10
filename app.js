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
	alert
});

// STORE
// var middleware = ReactRouterRedux.routerMiddleware(ReactRouter.browserHistory);
// var store = Redux.createStore(app, middleware);
var store = Redux.createStore(app);

var unsubscribe = store.subscribe(() => console.log(store.getState()) );

// REACT COMPONENTS - PRESENTATIONAL
var App = React.createClass({
	render() {
		var { children } = this.props;
		console.log('children:', children);

		return React.createElement('div', { id:'app', className:'app' },
			'App',
			React.createElement('div', { id:'nav', className:'nav' },
				'Nav:',
				React.createElement(ReactRouter.Link, { to:'file:///C:/Users/Mercurius/Documents/GitHub/Non-JSX-React-Router-Redux-Demo/app.html' },
					'Index'
				),
				' | ',
				React.createElement(ReactRouter.Link, { to:'file:///C:/Users/Mercurius/Documents/GitHub/Non-JSX-React-Router-Redux-Demo/app.html?contact' },
					'Recording'
				),
				' | ',
				React.createElement(ReactRouter.Link, { to:'file:///C:/Users/Mercurius/Documents/GitHub/Non-JSX-React-Router-Redux-Demo/app.html?about' },
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
		return React.createElement('div', null,
			'INVALID'
		);
	}
});

// REACT COMPONENTS - CONTAINER

// end - react-redux

function init() {
	console.log('rendering');
	var myhistory = History.useBasename(ReactRouter.useRouterHistory(History.createHistory))({
			basename: 'file:///C:/Users/Mercurius/Documents/GitHub/Non-JSX-React-Router-Redux-Demo/app.html'
	});
	ReactDOM.render(
		React.createElement(ReactRedux.Provider, { store },
			React.createElement(ReactRouter.Router, { history:ReactRouter.browserHistory },
				React.createElement(ReactRouter.Route, { path:BASE_PATH, component:App },
					React.createElement(ReactRouter.IndexRoute, { component:IndexPage }),
					React.createElement(ReactRouter.Route, { path:'/C:/Users/Mercurius/Documents/GitHub/Non-JSX-React-Router-Redux-Demo/app.html?contact', component:ContactPage }),
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
