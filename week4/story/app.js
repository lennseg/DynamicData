'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Path = require('path');
const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');

const server = new Hapi.Server({

    connections:{

        routes:{
            files:{
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }

});

server.connection({ port: 3000, host: 'localhost' });

server.register([Blipp, Inert, Vision], ()=> {});

server.views({
    engines: {
        html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
    helpersPath: 'views/helpers'


});

server.route({
    method: 'GET',
    path: '/',
    handler:{
        view: {
            template: 'index',
            context:{
                title: 'My Story',
                message: 'Rey the Cat',
                pic:'',
                nav: [
                    {
                        url: "/page2/bank",
                        title: "bank"
                    },
                    {
                        url: "/page2/weapon",
                        title: "weapon"
                    },
                    {
                        url: "/page2/money",
                        title: "money"
                    },

                ],
                menu: [{item: "hello"},{item: "hello"},{item: "hello"}]
            }
        }
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler:{
        directory:{
            path: './',
            listing: true,
            index: false,
            redirectToSlash: true
        }
    }
});




server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});'