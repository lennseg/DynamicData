const Handlebars = require('handlebars');

Handlebars.registerHelper('bold', function(options){
    
    var test= new Handlebars.Safestrings('<b>'+ options.fn(this) +'</b>');
    
    
});