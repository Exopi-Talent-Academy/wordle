/*
    const fs = require("fs");
    const readline = require("readline");
    const feedback = require("./feedback");
    const chalk = require("chalk");
*/

import fs from "fs";
import readline from "readline";

import { validateGuess } from "../utils/validation.js";
import { giveFeedback } from "./feedback.js";
import { mapResult } from "../utils/helper.js"


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
        let words = fs.readFileSync("./src/data/words.txt", "utf8");
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
            if(validateGuess(guess)){
                this.attempts += 1;
                console.log("Your guess is valid:=>   ", giveFeedback(guess, this.selectedWord));
                
            }
            else {
                console.log(chalk.red("your guess is not valid. Try again."));
            }

            rl.close();

            if(guess === this.selectedWord)
            {
                console.log("Congratulations... you won the game.");
                this.saveResult(true);
                this.showStatistics();
                return;
               
            }else if(this.attempts < this.maxAttempts) {
               
               this.yourGuess();
            } else {
                this.saveResult(false);
                this.showStatistics();
                console.log("Game is Over. Sorry for your Badluck. Word is: ", this.selectedWord);
                return;
            }
            
        })

    }


    saveResult(win){
        let content = win + ' ' + this.attempts + "\n";
        fs.writeFile("./src/data/result.txt", content, {flag: 'a+'}, err=>{
            if(err){
                console.log(err);
            }else {
                console.log("files saved successfully....");
            }
        } )
    }

    showStatistics(){
        let content = fs.readFileSync("./src/data/result.txt", "utf8");
        let result = content.split("\n").map(res => res.trim()).filter(res => res !== "");
        let res = mapResult(result);
        console.table([{total: result.length, first: res.first, second: res.second, third: res.third, fourth: res.fourth, fifth: res.fifth, sixth: res.sixth}], ['total', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth']);
    }

}
