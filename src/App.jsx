import React from 'react';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			test: false
		};
	}
	render() {
		return (
			<div style={{color:'green'}}>
				{this.props.children}
			</div>
		);
	}
}
