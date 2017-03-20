var speech = "Mr. Speaker, Mr. Vice President, Members of Congress, the First Lady of the United States, and Citizens of America: Tonight, as we mark the conclusion of our celebration of Black History Month, we are reminded of our Nation's path toward civil rights and the work that still remains. Recent threats targeting Jewish Community Centers and vandalism of Jewish cemeteries, as well as last week's shooting in Kansas City, remind us that while we may be a Nation divided on policies, we are a country that stands united in condemning hate and evil in all its forms. Each American generation passes the torch of truth, liberty and justice in an unbroken chain all the way down to the present. That torch is now in our hands. And we will use it to light up the world.  I am here tonight to deliver a message of unity and strength, and it is a message deeply delivered from my heart. A new chapter of American Greatness is now beginning. A new national pride is sweeping across our Nation. And a new surge of optimism is placing impossible dreams firmly within our grasp.What we are witnessing today is the Renewal of the American Spirit.";

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




