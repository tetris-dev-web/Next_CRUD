const apiUrl = process.env.NODE_ENV === 'development' 
    ? 'https://cgkg2.sse.codesandbox.io/api' // development api
    : 'https://cgkg2.sse.codesandbox.io/api'; // production api

export {
    apiUrl
};