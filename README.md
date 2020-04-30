This is a connect four game I built for Springboard

Click to play:
https://druserkes.github.io/Connect-Four-Game/

**
What this project was about: 
This unit was another chance to solidify my skills working with html, css, and javascript. I was given some starter code and had to create a version of the game Connect 4.

**
What I did: 
I started with an html table to hold the game. With Javascript, I first generated a row with an id attribute of 'top' and a listener for user click. I then created the rest of the game board, 6 rows of 7 cells, each with its own id attribute of its coordinates 'y-x' on the board. I also initialized a variable for current player. 

I also created an in-memory game board - an array of 6 arrays with 7 cells (initial value of null) each.

I wrote a number of helper functions. 1) to create and place a div with classes of 'piece' and 'p1' or 'p2' depending on the current player variable inside of a cell (given its Id of y-x). 2) to find a y cell for a given column x that checks for the furthest down cell in memory that isn't a value of null. 3) to alert the player when the game is over.

The top row click event uses the target as the given column x, uses the helper function to find a cell y in that column. It then updates the DOM by placing a piece in the corresponding cell, and changes the value of that cell in memory to 1 or 2 based on the value of currPlayer. 

It then checks for a win, and returns the endGame message if true. It also checks for a tie (checking if every top cell is filled) and returns endGame with a tie message if true. The handler ends with a ternary operator that switches currPlayer between 1 and 2. 

The project came with the checkForWin helper function already written and tasked me with understanding and commenting the code. The algorithm is a little advanced for my current level of experience, so I did appreciate the help (who knows how long it would've taken me to get there), but I also wish I had the opportunity to figure out and write at least some of the code myself.  

**
What I learned: 

This was an opportunity to approach a problem keeping in mind the separation of data and the physical elements. I enjoyed feeling better able to keep my script clean and my code concise.  

I'm finally making some headway getting comfortable with css. I was able to get the page positioning and style to look presentable more efficiently, utilizing the extra time I'd budgeted to find creative ways to make the page appealing (background with a linear gradient color, finding animation code on Animista to get the pieces to fall into their cells).

The project seemed daunting at first, but the assignment did a nice job of breaking it down into writing smaller functions that each served their own pupose. I learned that this will be the process for every program - thinking it through, deciding how to represent/store the data, considering the process for how the game actually functions, then writing it one function at a time. 

Taking time to understand and comment the provided checkForWin function gave me an idea of how different functions can work together to provide a desired return from a series of values. While not my first look at an algo, this has maybe been the most enlightening as to how writing them may be approached in the future.

** 
Looking forward:

I know the next unit will have me refactoring the code (based on OOP principles) so I'm looking forward to that. I'd like to also spend time becoming more familiar with the basic animation function (rather than just copying code for keyframes and animation from a code generator) so I could be more specific with the positioning of the pieces as they fall. 

I also want to create another game (currently thinking tic tac toe) with a similar solution, for the opportunity to code the entire game and win-checking function myself. 
