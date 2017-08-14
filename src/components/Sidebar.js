import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import SingleComponent from './Single_component';

class Sidebar extends Component {
	constructor(props) {
		super(props);
	}

	renderList() {
		return this.props.componentList.map((component) => {
			let hasChildren;
			if(component.childCount == 0) {
				hasChildren = "";
			} else {
				hasChildren = "--hasChildren";
			}
			console.log("Component Name: " + component.name + "Child Count: " + component.childCount);
			return (
				<ListGroupItem 
					key={component.date}
					className={"sidebar__listItem" + hasChildren}>
					<SingleComponent 
						component={component}
						selectedComponent={this.props.selectedComponent} />
				</ListGroupItem>
			);
		});
	}

	render() {
		return(
			<div className="sidebar">
				<h3 className="sidebar__header">
					Current Components:
				</h3>
				<ListGroup className="sidebar__list">
					{this.renderList()}
				</ListGroup>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		selectedComponent: state.component.selectedComponent,
		componentList: state.component.componentList
	}
}

export default connect(mapStateToProps, null)(Sidebar);
