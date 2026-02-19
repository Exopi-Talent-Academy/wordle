/*
    const fs = require("fs");
    const readline = require("readline");
    const feedback = require("./feedback");
    const chalk = require("chalk");
*/

import fs from "fs";
import readline from "readline";

import chalk from "chalk";


export class Game {
    constructor(){
        this.wordLength = 5;
        this.maxAttempts = 2;
        this.attempts = 0;
        this.selectedWord = this.loadWords();
    }

    loadGame(){
        console.log("Welcome to to WORDLE!!!");
        console.log("Remember you have only 6 attempts");

        this.yourGuess();
    }

    loadWords(){
        let words = fs.readFileSync("words.txt", "utf8");
        words =  words.split("\r\n").map(word => word.trim());
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    yourGuess(){
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question("Enter your guess: ", (userInput)=>{
            const guess = userInput.trim().toLowerCase();
            if(this.validateGuess(guess)){
                this.attempts += 1;
                console.log("Your guess is valid ", guess); 
                console.log(this.giveFeedback(guess));
                
            }
            else {
                console.log(chalk.red("your guess is not valid. Try again."));
            }

            rl.close();

            if(guess === this.selectedWord)
            {
                console.log("Congratulations... you won the game.");
                return;
               
            }else if(this.attempts < this.maxAttempts) {
               
               this.yourGuess();
            } else {
                console.log("Game is Over. Sorry for your Badluck.")
                return;
            }
            
        })

    }

    validateGuess(guessWord){
        const isAlphabetic = /^[A-Za-z]+$/.test(guessWord);
        return guessWord.length === 5 && isAlphabetic;
    }

    giveFeedback(guessWord) {
        let result = "";
        for(let i=0; i<guessWord.length; i++){
                result += this.selectedWord[i] === guessWord[i]? chalk.green(guessWord[i]): this.selectedWord.includes(guessWord[i])? chalk.yellow(guessWord[i]) : chalk.gray(guessWord[i]);    
        }
        return result;
    }
}
