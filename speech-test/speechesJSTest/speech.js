var speech = "Mr. Speaker, Mr. Vice President, Members of Congress, the First Lady of the United States, and Citizens of America: Tonight, as we mark the conclusion of our celebration of Black History Month, we are reminded of our Nation's path toward civil rights and the work that still remains.";

speech = speech.replace(/[^\w\s]|_/g, "");


//console.log(speech);


var splitting = speech.split(" ");

//console.log(splitting);

var countingWords = {};


for (var i=0; i<splitting.length; i++) {
    //console.log(splitting[i]);
    
    var inArray = 0;
    
    //checks if word is in list
    for(var words in countingWords){
        
        if(words == splitting[i]){
            inArray = 1;
        }
        
    }
    
    if(inArray == 0){
        countingWords[splitting[i]] = 0;
        countingWords[splitting[i]]++;
    }
    
    if(inArray == 1){
        countingWords[splitting[i]]++;
    }
}

console.log(countingWords);




