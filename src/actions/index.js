import Component from "../models/component";

export const ADD_COMPONENT = "ADD_COMPONENT";
export const SELECT_COMPONENT = "SELECT_COMPONENT";
export const UPDATE_COMPONENT_CHILD = "UPDATE_COMPONENT_CHILD";

export function addComponent(name) {
	const payloadComponent =     Component(name);
	return {
		type: ADD_COMPONENT,
		payload: payloadComponent
	};
}

export function selectComponent(component) {
	return {
		type: SELECT_COMPONENT,
		payload: component
	};
}

export function updateComponentChild(name, index) {
	return {
		type: UPDATE_COMPONENT_CHILD,
		payload: {
			name,
			index
		}
	};
}
