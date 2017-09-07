import _ from 'lodash';

export default function Store(properties) {
	var instance = this;

	_.each(properties, function (value, name) {
		instance[name] = value;
	});
};