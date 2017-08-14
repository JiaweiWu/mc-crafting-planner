const assert = require('assert');
const User = require('../src/models/user');

describe('Deleting a User', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe'});
		joe.save()
			.then(() => {
				done();
			});
	});

	it('model instance remove', (done) => {
		joe.remove()
			.then(() => {
				User.findOne({ name: 'Joe' })
					.then((user) => {
						assert(user === null);
						done();
					});
			});
	});

	it('class method remove', () => {

	});

	it('class method findAndRemove', () => {

	});




});