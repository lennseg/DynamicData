'use strict';
const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const imdb = require('imdb-api');
const Handlebars = require('handlebars');
const fs = require("fs");
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
    port: 3005
});
var sequelize = new Sequelize('db', 'username', 'password', {
    host: 'localhost'
    , dialect: 'sqlite'
    , pool: {
        max: 5
        , min: 0
        , idle: 10000
    }
    , // SQLite only
    storage: 'db.sqlite'
});
var Academy = sequelize.define('Academy', {
    actorName: {
        type: Sequelize.STRING
    }
    , movies: {
        type: Sequelize.STRING
    }
    , awards: {
        type: Sequelize.STRING
    }
, });
server.register([Blipp, Inert, Vision], () => {});
server.views({
    engines: {
        html: Handlebars
    }
    , path: 'views'
    , layoutPath: 'views/layout'
    , layout: 'layout'
    , helpersPath: 'views/helpers'
    , //partialsPath: 'views/partials'
});
server.route({
    method: 'GET'
    , path: '/'
    , handler: {
        view: {
            template: 'index'
        }
    }
});
server.route({
    method: 'GET'
    , path: '/{param*}'
    , handler: {
        directory: {
            path: './'
            , listing: false
            , index: false
        }
    }
});
server.route({
    method: 'GET'
    , path: '/createDB'
    , handler: function (request, reply) {
        // force: true will drop the table if it already exists
        Academy.sync({
            force: true
        })
        reply("Database Created")
    }
});
server.route({
    method: 'GET'
    , path: '/createAcademy'
    , handler: {
        view: {
            template: 'createAcademy'
        }
    }
});
server.route({
    method: 'POST'
    , path: '/formAcademy'
    , handler: function (request, reply) {
        var formresponse = JSON.stringify(request.payload);
        var parsing = JSON.parse(formresponse);
        //console.log(parsing);
        Academy.create(parsing).then(function (currentAcademy) {
            Speech.sync();
            console.log("...syncing");
            console.log(currentAcademy);
            return (currentAcademy);
        }).then(function (currentAcademy) {
            reply.view('createAcademy', {});
        });
    }
});
server.route({
    method: 'GET'
    , path: '/displayAll'
    , handler: function (request, reply) {
        Academy.findAll().then(function (users) {
            var allUsers = JSON.stringify(users);
            reply.view('dbresponse', {
                dbresponse: allUsers
            });
        });
    }
});
server.route({
    method: 'GET'
    , path: '/destroyAll'
    , handler: function (request, reply) {
        Academy.drop();
        reply("destroy all");
    }
});
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});