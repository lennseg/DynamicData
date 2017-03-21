var txt;
var counts = {};

function preload(){
    txt = loadStrings('mlk-speech.txt');
}

function setup(){
    var allwords = txt.join("\n");
    var tokens = allwords.split(/\W+/);
    console.log(tokens);
    
    for(var i = 0; i < tokens.length; i++){
        var word = tokens[i];
        
    }
    
    noCanvas();
}
