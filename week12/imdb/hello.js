exports.register = function (server, options, next) {
    server.dependency('database', (server, after) => {
        //can do some dependency logic here
        return after();
    });
    
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
    return reply ('Hello Word\n');
    }
});
next();
};
exports.register.attributes = {
name: 'hello'
}
