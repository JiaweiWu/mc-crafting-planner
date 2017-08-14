import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import CalculateResult from "../helper/Result_helper";

class ComponentResult extends Component {
	constructor(props) {
		super(props);

		this.state = {
			result: null
		};
	}

	onButtonPress(event) {
		let result = CalculateResult(this.props.selectedComponent, this.props.componentList);
		this.setState({
			result, 
		});
	}	

	renderResult(result) {
		if(result) {
			let tableResult = [];
			Object.keys(result).forEach(function loop(key, index) {
				tableResult.push(
					<tr key={key}>
						<td>{key}</td>
						<td>{result[key]}</td>
					</tr>
				);
			});

			return(
				<Table>
					<thead>
						<tr>
							<th>Component</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{tableResult}
					</tbody>
				</Table>
			);
		}
	}

	render() {
		return(
			<div>
				<Button 
					onClick={this.onButtonPress.bind(this)}>
					Calculate Result
				</Button>
				<div>
					{this.renderResult(this.state.result)}
				</div>
			</div>
		);
	};
}

function mapStateToProps(state) {
	return {
		selectedComponent: state.component.selectedComponent,
		componentList: state.component.componentList
	};
}
export default connect(mapStateToProps, null)(ComponentResult);