function process(txt) {
    clearText();
    var concordance = new Concordance();
    concordance.process(txt);
    concordance.sortByCount();
    console.log(concordance);
    var p = createP('');
    p.class('text');
    paragraphs.push(p);
    var ul = createElement('ul', '');
    ul.parent(p);
    var keys = concordance.getKeys();
    for (var i = 0; i < keys.length; i++) {
        var li = createElement('li', keys[i] + ': ' + concordance.getCount(keys[i]));
        li.parent(ul);
    }
}
//DOM elements
var dropZone, input, button, sample, clearButton;
//an array to keep track of all the new DOM elements being added
var paragraphs = [];
var inputText = '';

function setup() {
    noCanvas();
    //selecting the text field and button
    input = select('#textinput');
    button = select('#submit');
    //what to do when button pressed
    button.mousePressed(handleInput);
    //selected the div which will be the "drop zone"
    //for dragging and dropping files
    dropZone = select('#drop_zone');
    //here are the events to handle
    dropZone.dragOver(highlight);
    dropZone.drop(gotFile, unHighlight);
    //this link allows quick testing with a file
    //that's ready to load instantly
    sample = select('#sample');
    sample.mousePressed(loadFile);
}
//when the file is loaded
function fileLoaded(data) {
    var txt = data.join('\n');
    input.html(txt);
}
//handle dropzone events
function highlight() {
    dropZone.style('background', '#AAA');
}

function unHighlight() {
    dropZone.style('background', '');
}

function gotFile(file) {
    if (file.type === 'text') {
        //process(file.data);
        inputText += file.data + '\n\n';
        input.html(inputText);
    }
    else {
        //in case it's some weird other kind of file
        alert('this is not a text file.');
    }
}
//handle the text input field
function handleInput() {
    process(input.value());
}
//clear all the divs with remove()
function clearText() {
    //input.html('');
    for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].remove();
    }
    paragraphs = [];
}