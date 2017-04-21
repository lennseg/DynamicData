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
const FormData = require("form-data");
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

//Create the data store for the API
var Nominee = [
    {
        "actorName": 'Meryl Streep',
        "movie": 'Mamma Mia'
    },
    {
        "actorName": 'Leonardo DiCaprio',
        "movie": 'Titanic'
    }
]
    
server.route([
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply("Hello World");
        }
        },
    {
        method: 'GET',
        path: '/api/v1/Nominee',
        handler: function(request, reply) {
            reply(Nominee);
        }
        },
    {
        method: 'POST',
        path: '/api/v1/Nominee',
        handler: function(request, reply) {
            newNominee = {"actorName":request.payload.actorName, "movie":request.payload.movie};
            Nominee.push(newNominee);
            reply(Nominee).code(201);
        }
        },
    {
        method: 'GET',
        path: '/api/v1/Nominee/{index}',
        handler: function(request, reply) {
            reply(Nominee[request.params.index-1]);
        }
        },
    {
        method: 'PUT',
        path: '/api/v1/Nominee/{index}',
        handler: function(request, reply) {
           newNominee = {"actorName":request.payload.actorName, "movie":request.payload.movie};
           Nominee[request.params.index-1] = newNominee;
           reply(Nominee[request.params.index-1]);
        }
        },
    {
        method: 'DELETE',
        path: '/api/v1/Nominee/{index}',
        handler: function(request, reply) {
            delete Nominee[request.params.index-1];
            reply().code(204);
        }
        }
])
server.start((err) => {
    console.log(`Server running at: ${server.info.uri}`);
});