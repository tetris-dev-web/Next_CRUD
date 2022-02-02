const apiUrl = process.env.NODE_ENV === 'development' 
	? 'http://localhost' // development api
	: 'http://localhost'; // production api

export {
	apiUrl
};