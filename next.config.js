const fs = require('fs');

module.exports = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            // reset users json on codesandbox every 10 minutes because 
            // the same json data is viewed by all users
            setInterval(() => {
                const defaultUsers = [{
                    "title": "Mr",
                    "firstName": "Frank",
                    "lastName": "Murphy",
                    "email": "frank.murphy@rustvale.com",
                    "role": "User",
                    "password": "sue123",
                    "id": 1,
                    "dateCreated": "2021-04-08T05:33:05.184Z",
                    "dateUpdated": "2021-04-15T07:20:22.768Z"
                }];
                fs.writeFileSync('data/users.json', JSON.stringify(defaultUsers, null, 4));
                console.log('users reset to default in next.config.js');
            }, 10 * 60 * 1000);
        }

        if (!isServer) {
            // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.node = {
                fs: 'empty'
            }
        }

        return config;
    }
}
