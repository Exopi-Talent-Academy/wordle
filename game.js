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
        this.maxAttempts = 6;
        this.selectedWord = this.loadWords();
    }

    loadGame(){
        console.log("Welcome to to WORDLE!!!");
        console.log("Remember you have only 6 attempts");
        console.log(chalk.red("hellow..."))
    }

    loadWords(){
        let words = fs.readFileSync("words.txt", "utf8");
        words =  words.split("\r\n").map(word => word.trim());
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }
}
