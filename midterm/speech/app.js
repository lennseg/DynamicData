'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Handlebars = require('handlebars');
const count2Word = require('count2word');

const fs = require("fs");

const Sequelize = require('sequelize');

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
    port: 3000
});

var sequelize = new Sequelize('db', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite'|'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    storage: 'db.sqlite'
});

var Speeches = sequelize.define('speech', {

    mlkSpeech: {
        type: Sequelize.STRING
    },
});


server.register([Blipp, Inert, Vision], () => {});

server.views({
    engines: {
        html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
    helpersPath: 'views/helpers',
    //partialsPath: 'views/partials'
});


server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: {
            template: 'index',
            context: {
                title: 'Speeches',
                message: 'See the keywords in Presidential Speeches'
            }
        }
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: './',
            listing: false,
            index: false
        }
    }
});

server.route({
    method: 'POST',
    path: '/form',
    handler: function (request, reply) {
        var formresponse = JSON.stringify(request.payload);;

        reply.view('formresponse', {
            formresponse: formresponse
        })
    }

});

server.route({
    method: 'GET',
    path: '/savefile',
    handler: {
        view: {
            template: 'savefile'
        }
    }

});

server.route({
    method: 'POST',
    path: '/savefile',
    handler: function (request, reply) {
        var formResponse = request.payload;

        var jsonForm = JSON.stringify(formResponse);

        fs.writeFile('savedata.txt', jsonForm, function (err) {
            if (err) {
                return console.error(err);
            }

            fs.readFile('savedata.txt', function (err, data) {
                if (err) {
                    return console.error(err);
                }

                console.log(data.toString());

            });
        });
        reply("File Saved");
    }
});

method: 'GET',
    path: '/savedata',
    handler: function (request, reply) {

        var currentData = "";
        fs.readFile('savedata.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            currentData = JSON.parse(data.toString());


            reply.view('savedata', {
                formresponse: currentData,
            });
        });

    }
});



server.route({
    method: 'GET',
    path: '/createDB',
    handler: function (request, reply) {
        // force: true will drop the table if it already exists
        Speech.sync({
            force: true
        })
        reply("Database Created")
    }
});

server.route({
    method: 'GET',
    path: '/destroyAll',
    handler: function (request, reply) {

        Speech.drop();

        reply("destroy all");
    }
});

server.route({
    method: 'GET',
    path: '/addDB/{mlkSpeech}',
    handler: function(request, reply){
        Speech.create({
            mlkSpeech: encodeURIComponent(request.params.mlkSpeech),
        });

        Speech.sync();

        reply("saved entry");
    }
});

server.route({
    method: 'GET',
    path: '/displayAll',
    handler: function (request, reply) {

        Speech.findAll().then(function(users){

            var allUsers = JSON.stringify(users);

            reply.view('dbresponse', {
                dbresponse: allUsers
            });
        })
    }
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);

});