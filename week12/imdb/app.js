'use strict';
const Hapi = require('hapi');
const imdb = require('imdb-api');
const Handlebars = require('handlebars');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Sequelize = require('sequelize');
const Fetch = require("node-fetch");
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({
    port: 3007
});
console.log("Hapi is live!")
var sequelize = new Sequelize('db', 'username', 'password', {
    host: 'localhost'
    , dialect: 'sqlite'
    , pool: {
        max: 5
        , min: 0
        , idle: 10000
    }, // SQLite only
    storage: 'db.sqlite'
});
server.route([
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply("Hello World");
        }
        }
])
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});