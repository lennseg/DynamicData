function Concordance() {
    this.dict = {};
    this.keys = [];
    //splitting up the text
    this.split = function (text) {
            //split into array of tokens
            return text.split(/\W+/);
        }
        //a function to validate a toke
    this.validate = function (token) {
            return /\w{2,}/.test(token);
        }
        //process new text
    this.process = function (data) {
            var tokens = this.split(data);
            //for every token
            for (var i = 0; i < tokens.length; i++) {
                //lowercase everything to ignore case
                var token = tokens[i].toLowerCase();
                if (this.validate(token)) {
                    //increase the count for the token
                    this.increment(token);
                }
            }
        }
        //an array of keys
    this.getKeys = function () {
            return this.keys;
        }
        //get the count for a word
    this.getCount = function (word) {
            return this.dict[word];
        }
        //increment the count for a word
    this.increment = function (word) {
            //is this a new word?
            if (!this.dict[word]) {
                this.dict[word] = 1;
                this.keys.push(word);
                //otherwise just increment its count
            }
            else {
                this.dict[word]++;
            }
        }
        //sort array of keys by counts
    this.sortByCount = function () {
        //for this function to work for sorting, I have
        //to store a reference to this so the context is not lost
        var concordance = this;
        //a fancy way to sort each element
        //compare the counts
        function sorter(a, b) {
            var diff = concordance.getCount(b) - concordance.getCount(a);
            return diff;
        }
        //sort using the function above
        this.keys.sort(sorter);
    }
}