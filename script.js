//Created November 21, 2017 by Aiden Le

//REQUIREMENTS:

/* - A list of all the letters already guessed must be displayed
 * - After each guess the user must see updated progress mixing letters and blanks  For example:  “_ _ _” or “c _ t” or “ _ a t”
 * - The user must see how many guesses are remaining
 * - Game must have a title, legible font sizes/faces and a usable screen layout
 * - Letter guessing input must either be a select box or a text input box.  If text input, it must clear on submit
 * - The user must not be allowed to guess the same letter twice, or guess any non A-Z characters
 * - Once the game ends, a new game can be initiated on a button click without a page refresh
 */

var alphabet =  [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];
var easyWords = ["DOG", "BAO", "APPLE", "HAPPY", "YERBA", "PIZZA", "CHINA", "RAMEN", "WATER"];
var medWords = ["PRESTO", "FRANCE", "TUXEDO", "BARISTA", "JUSTICE", "HARMONY", "VIETNAM", "QUALITY"];
var hardWords = ["NONCHALANT", "SERENDIPITOUS", "FETTUCCINE", "CORRESPONDING", "MACCHIATO", "BUREAUCRACY", "CONDITIONER"];
var chosenDifficulty;
var word = "";
var guesses;
var letterChoice;
var guessedLetters = [];


//Reset the board, clear out any traces of the last round from guessedLetters
function newGame()
{
    chosenDifficulty = difficulty();
    guesses = 15;
    guessedLetters = [];

    // Choose a word - this code will grab  a random element from your words array for you:
    word = chosenDifficulty[Math.floor(Math.random() * chosenDifficulty.length)];
    console.log(word);

    document.getElementById("tempShow").innerHTML = guessedLetters;
    document.getElementById("yourW").innerHTML = "Your Word: ";
    printWord();
    document.getElementById("guessesLeft").innerHTML = "You have " + guesses + " guesses.";
}

//Gets the user's difficulty choice and assigns the corresponding array of words to getWord
function difficulty(choice, diff)
{
    choice = document.getElementById("difficulty").value;
    if(choice == 1) diff = easyWords;
    if(choice == 2) diff = medWords;
    if(choice == 3) diff = hardWords;
    return diff;
}


//Compare word to guessedLetters using guessedLetters.indexOf(letter in word)
// to build the “_” word with the correctly guessed letters filled in.
function printWord()
{
    var fillBlanks = "";
    for(var i = 0; i < word.length; i++)
    {
        if(guessedLetters.indexOf(word[i]) == -1)
        {
            fillBlanks += "_";
        }
        else
        {
            fillBlanks += word[i];
        }
    }


    document.getElementById("word").innerHTML = fillBlanks;
    console.log(word == fillBlanks);
    return fillBlanks;
}

// Take the most recently guessed letter and validate it, re-print the word,
// deduct from guesses, check to see if the user has won or lost yet.
function guessLetter(x, y)
{
    x = document.getElementById("letter").value;
    for(var i = 0; i <= guessedLetters.length; i++)
    {
        if(guessedLetters[i] == alphabet[x-1])
        {
            return guesses;
        }
    }

    if(guesses >= 1 && word.indexOf(alphabet[x-1]) == -1)
    {
        guesses -= 1;
    }

    guessedLetters += alphabet[x-1];
    letterChoice = alphabet[x-1];
    if(guesses == -1)
    {
        printWord();
        checkWinLose();
        return guesses;
    }

    document.getElementById("guessesLeft").innerHTML = guesses + " guesses left.";
}

function checkWinLose(won)
{
    if(word == printWord())
    {
        document.getElementById("guessesLeft").innerHTML = "You Win! Play again.";
        won = true;
    }
    else if(guesses == 0)
    {
        document.getElementById("guessesLeft").innerHTML = "You Lose! Restart.";
        document.getElementById("word").innerHTML = word;
        won = false;
    }
    return won;
}

function onSubmit()
{
    checkWinLose();
    printWord();
    guessLetter();
    printWord();
    guessLetter();
    checkWinLose();
    if(!checkWinLose()) document.getElementById("tempShow").innerHTML = guessedLetters;
}