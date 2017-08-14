export default function Component(name) {
	let obj = {};

	obj.name = name;
	obj.date = new Date();
	obj.children = [];
	obj.childCount = 0;

	for (let i = 0; i < 9; i++) {
		obj.children[i] = null;
	}

	return obj;
}