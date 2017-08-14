import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid } from 'react-bootstrap';
import CraftingTableGrid from './Crafting_table_grid';

class CraftingTable extends Component {
	constructor(props) {
		super(props);
	}

	renderGrid() {
		if (!this.props.component) {
			return;
		}
		return this.props.component.children.map((name, index) => {
			return (
				<Col 
				xs={4}
				key={index}
				style={{
					padding: "0"
				}}>
					<CraftingTableGrid 
						componentName={name}
						index={index}/>
				</Col>
			);
		});
	}

	render() {
		return(
			<Grid fluid={true}>
				<Row>
					{this.renderGrid()}
				</Row>
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	return {
		component: state.component.selectedComponent
	};
}

export default connect(mapStateToProps, null)(CraftingTable);