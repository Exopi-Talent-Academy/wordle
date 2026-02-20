import readline from "readline";

import { validateGuess } from "../utils/validation.js";
import { giveFeedback, errorMessage } from "./feedback.js";
import { showStatistics, loadWords, saveResult } from "../services/fileHandle.js";


export class Game {
    constructor(){
        this.wordLength = 5;
        this.maxAttempts = 6;
        this.attempts = 0;
        this.selectedWord = loadWords();
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
            if(validateGuess(guess)){
                this.attempts += 1;
                console.log("Your guess is valid:=>   ", giveFeedback(guess, this.selectedWord));
                
            }
            else {
                errorMessage();
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
}
