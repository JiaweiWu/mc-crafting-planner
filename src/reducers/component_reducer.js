import { ADD_COMPONENT, SELECT_COMPONENT, UPDATE_COMPONENT_CHILD, REMOVE_COMPONENT_CHILD } from "../actions/index";

const INITIAL_STATE = { newComponent: "" , componentList: [], selectedComponent: ""};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case ADD_COMPONENT:
			return {...state, newComponent: action.payload, componentList: [...state.componentList, action.payload]};

		case SELECT_COMPONENT:
			return {...state, selectedComponent: action.payload};

		case UPDATE_COMPONENT_CHILD:
			let tempChildArray = state.selectedComponent.children;
			let tempComponentArray = state.componentList;
			let name = action.payload.name;
			let index = action.payload.index;

			let childCount;

			if (!action.payload.name) {
				childCount = -1;
			} else {
				childCount = 1;
			}

			//Update component children array
			let updatedComponent = {
				...state.selectedComponent, 
				childCount: state.selectedComponent.childCount + childCount,
				children: tempChildArray.slice(0, index).concat(name, tempChildArray.slice(index + 1))
			};

			//Update component list
			let updatedComponentList = tempComponentArray.map((component) => {
				if (component.name === updatedComponent.name) {
					return updatedComponent;
				} else {
					return component;
				}
			});
			return {...state, componentList: updatedComponentList, selectedComponent: updatedComponent};
		default:
			return state;
	}
}