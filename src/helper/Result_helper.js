export default function calculateResult(component, componentList) {
	let result = {};


	function stringToComponent(string) {
		let tempComponent = null;

		for (let i = 0; i < componentList.length; i++) {
			if(componentList[i].name === string) {
				tempComponent = componentList[i];
				return tempComponent;
			}
		}
	}

	function recursiveCalc(currentComponent) {
		for(let i = 0; i < 9; i++) {
			if(currentComponent.children[i]){
				let tempComponent = stringToComponent(currentComponent.children[i]);
				if(tempComponent.childCount == 0) {
					result[tempComponent.name] = (result[tempComponent.name] || 0) + 1;
				}
				else {
					recursiveCalc(tempComponent);
				}
			}
		}
	}

	recursiveCalc(component);
	return result; 
}