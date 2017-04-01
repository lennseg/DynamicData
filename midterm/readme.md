#Midterm: Word Frequency in Historical Speeches

The goal for this assignment was to view the frequency of words in speeches. I didn't want to get too political and have just Presidential speeches. I thought about focusing on speeches that were memorable to our society.

Speeches I focused on:
* Martin Luther King's "I Have a Dream" speech
* Barack Obama's first State of the Union speech
* Preseident Donald Trump's first State of the Union speech

#Inspiration:
* http://twitter.github.io/interactive/sotu2014/#p1

#Process

I began my process by first cleaning the text files for all the speeches (I took out the extra spaces and quotations). Afterwards, I created the script testing the word count for each speech. 

I started by creating a variable of the speech. Then created another variable to take out all the spaces, punctuations, etc and just focused solely on the letters. All the letters were then converted to lowercase to avoid repetition. Then I worked on ignoring certain words that were not important; I wanted to focus just on the key words. The only way the words were ignored was by putting all the words into a string instead of an array. To this day, I have no idea why it just works that way.

Words that are ignored in the script:

* and, you, i, am, its, it, the, to, of, a, on, can, with, for, this, that, in, be, as, has, if, from, but, so, also, there, their, are, than, do, here, must, make, about, by, have, not, who, know, how, those, these, when, they, why, your, must, because, day, one, was, just, will

Then the words are split by a space. Now it's time for the word count.

The Algorithm:

Look at each word, is it a a new word? If it is, add it and set the count to 1. 
If it's not a new word increase it's exisistence by 1. 

I ended the script by counting words that were frequent 10 or more times (this is what the user will see). 

![speech-js-test-code-01](https://cloud.githubusercontent.com/assets/21225598/24537488/67ab965c-15b0-11e7-9aeb-4cde14edf97c.jpg)
![speech-js-test-code-02](https://cloud.githubusercontent.com/assets/21225598/24537532/c23b0fe4-15b0-11e7-9862-7031830ef567.jpg)

##Creating the Server

I followed the examples we worked on in class to created my server and database. For the database, I created three columns the name of the speech, author and date.

![creating-server-01](https://cloud.githubusercontent.com/assets/21225598/24573305/a7344ea0-164f-11e7-9872-7394fb01990a.jpg)
![creating-server-02](https://cloud.githubusercontent.com/assets/21225598/24573320/d11b0f9c-164f-11e7-8aa5-02d640c001f4.jpg)
![creating-database-02](https://cloud.githubusercontent.com/assets/21225598/24573349/1a180736-1650-11e7-9ba5-22a079ccdf4d.jpg)

##Creating the Database

![creating-database-01](https://cloud.githubusercontent.com/assets/21225598/24573381/69c3b208-1650-11e7-9a22-57105d4fcfac.jpg)

#Inputing the Data

I inputted the javascript into the dbresponse page. I also replaced the MLK speech with the variables from the columns (speech, author and date).

![inputing-data-01](https://cloud.githubusercontent.com/assets/21225598/24573395/9cdb961a-1650-11e7-8fbf-93fa1a985a16.jpg)
![inputing-data-02](https://cloud.githubusercontent.com/assets/21225598/24573424/e75d2078-1650-11e7-98eb-3f7f59607ec5.jpg)

#Displaying the Data

![displaying-data-01](https://cloud.githubusercontent.com/assets/21225598/24573492/9a5a4674-1651-11e7-9bab-c0745c7501bc.jpg)

##Running the Server

<img width="619" alt="screen shot 2017-03-31 at 8 39 04 pm" src="https://cloud.githubusercontent.com/assets/21225598/24573562/9fa26d90-1652-11e7-8878-7e0552ed4a27.png">

##User's Input

The user can replace the sample content with theirs. If they wanted to see how the database works they can sample the MLK, Trump or Obama speech and view the word frequencies.

<img width="505" alt="screen shot 2017-03-31 at 8 40 04 pm" src="https://cloud.githubusercontent.com/assets/21225598/24573571/d3df074e-1652-11e7-9cf0-d37623ed5abf.png">

##Output

After clicking 'Submit' and then 'Show Frequent Words' the user will see all the word frequiences along with the author and date. The data has an id showing how many times it's been inputted into the database. If the user goes to the 'DestoyAll' page, all the data will be deleted. 

<img width="202" alt="screen shot 2017-03-31 at 8 40 34 pm" src="https://cloud.githubusercontent.com/assets/21225598/24573597/5cfb373c-1653-11e7-9c65-49dcb969c1f6.png">

##Troubleshooting

I was having issues inputting text from the internet. In order for the database to work, the user has to input a clean text file or else it will display nothing. Another option, is if the user types the speech but that is very time consuming. 

I also couldn't generate a chart because I can't control what the user will input. Chart.js only displays the data that is given, not randomly. Is there a solution for this?

#Next Steps

I would like to visualize the word frequency with chart.js.
