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
    port: 3003
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