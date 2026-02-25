import readline from "readline";

import { validateGuess } from "../utils/validation.js";
import { giveFeedback, failureMessage } from "./feedback.js";
import { showStatistics, saveResult, wordList } from "../services/fileHandle.js";


export class Game {
    constructor(){
        this.wordLength = 5;
        this.maxAttempts = 6;
        this.attempts = 0;
        this.allWords = wordList();
        this.selectedWord =  this.getAWord();
        
    }

    loadGame(){
        console.log("Welcome to to WORDLE!!!");
        console.log("Remember you have only 6 attempts");

        this.yourGuess();
    }


    yourGuess(){
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question("Enter your guess: ", (userInput)=>{
            const guess = userInput.trim().toLowerCase();
            if(validateGuess(guess, this.allWords)){
                this.attempts += 1;
                console.log("Your guess is valid:=>   ", giveFeedback(guess, this.selectedWord));
                
            }
            else {
                failureMessage();
            }

            rl.close();

            if(guess === this.selectedWord)
            {
                console.log("Congratulations...  Correct Word in only", this.attempts , this.attempts > 1? " attempts.": "attempt" );
                saveResult(true, this.attempts);
                showStatistics();
                return;
               
            }else if(this.attempts < this.maxAttempts) {
               
               this.yourGuess();
            } else {
                saveResult(false, this.attempts);
                showStatistics();
                console.log("Game is Over. Sorry for your Badluck. Word is: ", this.selectedWord);
                return;
            }
            
        })

    }

    getAWord(){
        return this.allWords[Math.floor(Math.random() * this.allWords.length)];
    }
}
