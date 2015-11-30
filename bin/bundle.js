(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\ws\\react-server-side-rendering-on-nashorn-example\\node_modules\\picolog\\dist\\picolog.umd.js":[function(require,module,exports){
(function (u, m, d) {
	if (typeof define == 'function') {define('picolog', [], d);}
	else if (typeof exports == 'object') {module.exports = d();} 
	else {u[m] = d();}
}(this, 'log', function() {

var log = {TRACE:1, DEBUG:2, INFO:3, WARN:4, ERROR:5, NONE:9},
	level = query(typeof window == 'object' && window.location.search.substring(1), log.WARN),
	fns = (function(){
		return Object.keys(log).slice(0, Object.keys(log).length - 1).map(function(x){return x.toLowerCase();});
	})();

Object.defineProperty(log, 'level', {
	get: function(){return level;},
	set: function(lvl) {if (lvl >= 1 && lvl <= 5 || lvl === 9) {patch(level = lvl);}}
});

patch(level);

function patch(lvl) {
	for (var i=0,name; name=fns[i]; i++) {
		log[name] = i+1 < lvl ? noop : logger(name, lvl);
	}
}

function logger(name, lvl) {
	if (typeof console == 'undefined') {
		if (typeof print != 'undefined') {return print;}
		else {return function() {
			if (typeof console != 'undefined') {
				patch(lvl);
				log[name].apply(log, arguments);
			}
		};}
	}
	return console[name] ? console[name].bind(console) : console.log.bind(console);
}

function query(qs, def) {
	for (var m; m = qs && /([^&=]+)=?([^&]*)/g.exec(qs); ) {
		if (m[1] == 'log') {return log[m[2].toUpperCase()] || Number(m[2]) || def;} 
	}
	return def;
}

function noop(){}

return log;
}));

},{}],"C:\\ws\\react-server-side-rendering-on-nashorn-example\\src\\App.jsx":[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(_x, _x2, _x3) {
	var _again = true;_function: while (_again) {
		var object = _x,
		    property = _x2,
		    receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);if (parent === null) {
				return undefined;
			} else {
				_x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
			}
		} else if ('value' in desc) {
			return desc.value;
		} else {
			var getter = desc.get;if (getter === undefined) {
				return undefined;
			}return getter.call(receiver);
		}
	}
};

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this);
		this.state = {
			test: false
		};
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement('div', { style: { color: 'green' } }, this.props.children);
		}
	}]);

	return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"C:\\ws\\react-server-side-rendering-on-nashorn-example\\src\\Home.jsx":[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(_x, _x2, _x3) {
	var _again = true;_function: while (_again) {
		var object = _x,
		    property = _x2,
		    receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);if (parent === null) {
				return undefined;
			} else {
				_x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
			}
		} else if ('value' in desc) {
			return desc.value;
		} else {
			var getter = desc.get;if (getter === undefined) {
				return undefined;
			}return getter.call(receiver);
		}
	}
};

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var Home = (function (_React$Component) {
	_inherits(Home, _React$Component);

	function Home() {
		_classCallCheck(this, Home);

		_get(Object.getPrototypeOf(Home.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Home, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement('h1', { style: { backgroundColor: 'green', color: 'white' } }, 'Style is not rendered???');
		}
	}]);

	return Home;
})(_react2['default'].Component);

exports['default'] = Home;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"C:\\ws\\react-server-side-rendering-on-nashorn-example\\src\\index.jsx":[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _picolog = require('picolog');

var _picolog2 = _interopRequireDefault(_picolog);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = (typeof window !== "undefined" ? window['ReactDOMServer'] : typeof global !== "undefined" ? global['ReactDOMServer'] : null);

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

var _reactRouter = (typeof window !== "undefined" ? window['ReactRouter'] : typeof global !== "undefined" ? global['ReactRouter'] : null);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

_picolog2['default'].level = _picolog2['default'].TRACE;

global.twoStepRenderer = {
	route: function route(path) {
		_picolog2['default'].info('Determining route for path ' + path);
		var result = {};
		(0, _reactRouter.match)({ routes: _routes2['default'], location: path }, function (error, redirect, props) {
			result.error = error;
			result.redirect = redirect;
			result.props = props;
			for (var key in props) {
				_picolog2['default'].info('   props[\'' + key + '\']=' + props[key]);
			}
			_picolog2['default'].info('Determinined route for path ' + path + '. props=' + props);
		});
		return result;
	},

	render: function render(props) {
		_picolog2['default'].info('RENDER');
		for (var key in props) {
			_picolog2['default'].info('   props[\'' + key + '\']=' + props[key]);
		}
		return _reactDomServer2['default'].renderToString(_react2['default'].createElement(_reactRouter.RoutingContext, props));
	}
};

global.render = function () {
	_picolog2['default'].error('Simple render...');
	// Attempt to minimize influence of Nashorn by not doing a round-trip
	var result = '';
	(0, _reactRouter.match)({ routes: _routes2['default'], location: '/' }, function (error, redirect, props) {
		_picolog2['default'].info('Match result: error=' + error + ', redirect=' + redirect + ', props=' + props);
		result = _reactDomServer2['default'].renderToString(_react2['default'].createElement(_reactRouter.RoutingContext, props));
	});
	return result;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./routes":"C:\\ws\\react-server-side-rendering-on-nashorn-example\\src\\routes.jsx","picolog":"C:\\ws\\react-server-side-rendering-on-nashorn-example\\node_modules\\picolog\\dist\\picolog.umd.js"}],"C:\\ws\\react-server-side-rendering-on-nashorn-example\\src\\routes.jsx":[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = (typeof window !== "undefined" ? window['ReactRouter'] : typeof global !== "undefined" ? global['ReactRouter'] : null);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./Home');

var _Home2 = _interopRequireDefault(_Home);

exports['default'] = _react2['default'].createElement(_reactRouter.Route, { component: _App2['default'] }, _react2['default'].createElement(_reactRouter.Route, { path: '/', component: _Home2['default'] }));
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./App":"C:\\ws\\react-server-side-rendering-on-nashorn-example\\src\\App.jsx","./Home":"C:\\ws\\react-server-side-rendering-on-nashorn-example\\src\\Home.jsx"}]},{},["C:\\ws\\react-server-side-rendering-on-nashorn-example\\src\\index.jsx"])

