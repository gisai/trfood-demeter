var config = {
development: {
    //url to be used in link generation
    url: 'http://my.site.com',  //no used
    //mongodb connection settings
    database: {
        host:   'localhost',
        port:   '27017',
        db:     'trfood',
        user: '',
        pass: ''
    },

    //server details

    server: {
        host: '127.0.0.1',
        port: '3000'  //not used
    }
},

production: {
    //url to be used in link generation
    url: 'http://my.site.com',
    //mongodb connection settings
    database: {
        host: '127.0.0.1',
        port: '27017',
        db:     'site'
    },

    //server details
    server: {
        host:   '127.0.0.1',
        port:   '3000'
    }
}
};

module.exports = config;