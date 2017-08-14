import { combineReducers } from 'redux';

import ComponentReducer from './component_reducer';

const rootReducer = combineReducers({
	component: ComponentReducer
});

export default rootReducer;