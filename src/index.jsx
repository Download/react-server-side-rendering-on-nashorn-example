import log from 'picolog';
log.level = log.TRACE;
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RoutingContext, Route } from 'react-router'
import routes from './routes';

global.twoStepRenderer = {
	route: function(path) {
		log.info('Determining route for path ' + path);
		var result = {};
		match({routes, location:path}, function(error, redirect, props){
			result.error = error;
			result.redirect = redirect;
			result.props = props;
			for (var key in props) {
				log.info('   props[\'' + key + '\']=' + props[key]);
			}
			log.info('Determinined route for path ' + path + '. props=' + props);
		});
		return result;
	}
	,
	render: function(props) {
		log.info('RENDER');
		for (var key in props) {
			log.info('   props[\'' + key + '\']=' + props[key]);
		}
		return ReactDOMServer.renderToString(<RoutingContext {...props} />);
	}
};

global.render = function() {
	log.error('Simple render...');
	// Attempt to minimize influence of Nashorn by not doing a round-trip
	var result = '';
	match({routes, location:'/'}, function(error, redirect, props){
		log.info('Match result: error=' + error + ', redirect=' + redirect + ', props=' + props);
		result = ReactDOMServer.renderToString(<RoutingContext {...props} />);
	});
	return result;
}
