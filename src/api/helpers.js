/**
 * Convert the query object to query url
 * @param  {Object} query - The query to convert
 * @return {String} - The url
 */
export const convertQuery = (query) => {
	return Object.keys(query)
		.filter(key => query[key] !== null && query[key] !== undefined)
		.reduce((values, attribute) => {
			const value = query[attribute];
			if (value instanceof Array) {
				values.splice(-1, 0, ...value.map(item => [attribute, item]));
			} else {
				values.push([attribute, value]);
			}
			return values;
		}, [])
		.map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
		.join("&");
};

/**
 * Split the query url to object for the form
 * @param  {String} query - The query to convert into object
 * @return {Object} - The query object
 */
export const splitQuery = (query) => {
	if (!query) {
		return {};
	}

	return query.split('&').reduce((accumulator, querySegment) => {
		const [ name, param ] = querySegment.split('=');
		accumulator[name] = accumulator[name] || null;

		if (!accumulator[name]) {
			accumulator[name] = [decodeURIComponent(param)];
		} else {
			accumulator[name] = Array.isArray(accumulator[name]) ? accumulator[name] : [accumulator[name]];
			accumulator[name].push(decodeURIComponent(param));
		}

		return accumulator;
	}, {});
};
