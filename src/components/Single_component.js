import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import store from '../index';
import { selectComponent, updateComponentChild } from '../actions/index';

const singleComponentSource = {
	beginDrag(props) {
		return { name: props.component.name };
	},

	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			console.log("Did not find drop target");
			return;
		}

		const dropResult = monitor.getDropResult();

		if (dropResult.target === "table") {
			store.dispatch(selectComponent(props.component));
		} 
		else if (dropResult.target === "grid") {
			store.dispatch(updateComponentChild(props.component.name, dropResult.index));
		}
	},

	canDrag(props) {
		if (!props.selectedComponent) {
			return true;
		} 
		else if (props.component.name === props.selectedComponent.name) {
			return false;
		}

		return true;
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
};

class SingleComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { connectDragSource, isDragging , component} = this.props;
		return connectDragSource(
			<div>
				{component.name}
			</div>
		);
	}
}

SingleComponent.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired
};

export default DragSource("SINGLE_COMPONENT", singleComponentSource, collect)(SingleComponent);