'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Handlebars = require('handlebars');

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
    port: 3001
});

var sequelize = new Sequelize('db', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    storage: 'db.sqlite'
});


var Mojito = sequelize.define('mojito', {

    mojitoName: {
        type: Sequelize.STRING
    },
    rum: {
        type: Sequelize.STRING
    },
    fruit: {
        type: Sequelize.STRING
    },
    limes: {
        type: Sequelize.STRING
    }

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
            template: 'index'
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
        console.log(request.payload.firstname);
        var firstname = request.payload.firstname;

        reply.view('formresponse', {
            firstname: firstname,
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
        //console.log(formResponse);
        var jsonForm = JSON.stringify(formResponse);
        //console.log(typeof(jsonForm));
        console.log("Writing Data");
        fs.writeFile('savedata.txt', jsonForm, function (err) {
            if (err) {
                return console.error(err);
            }

            console.log("reading saved data");
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

server.route({

    method: 'GET',
    path: '/savedata',
    handler: function (request, reply) {
        console.log("Let's read newly written data");
        var currentData = "";
        fs.readFile('savedata.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            currentData = JSON.parse(data.toString());
            console.log("Asynchronous read: " + currentData);

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
        Mojito.sync({
            force: true
        })
        reply("Database Created")
    }
});

server.route({
    method: 'GET',
    path: '/destroyAll',
    handler: function (request, reply) {

        Mojito.drop();

        reply("destroy all");
    }
});

server.route({
    method: 'GET',
    path: '/addDB/{mojitoName}/{rum}/{fruit}/{limes}',
    handler: function(request, reply){
        Mojito.create({
            mojitoName: encodeURIComponent(request.params.mojitoName),
            rum: encodeURIComponent(request.params.rum),
            fruit: encodeURIComponent(request.params.fruit),
            limes: encodeURIComponent(request.params.limes),
        });

        Mojito.sync();

        reply("saved entry");
    }
});

server.route({
    method: 'GET',
    path: '/displayAll',
    handler: function (request, reply) {

        Mojito.findAll().then(function(users){

            //console.log(users[0].mojitoName);

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
