import _ from 'lodash';

export default function LazyStore(properties) {
	var instance = this;

	_.each(properties, function (value, name) {
		instance[name] = value;
	});
};