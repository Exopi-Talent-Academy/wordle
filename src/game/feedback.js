import chalk from "chalk";

export function giveFeedback(guessWord, selectedWord) {
        let result = "";
        for(let i=0; i<guessWord.length; i++){
                result += selectedWord[i] === guessWord[i]? chalk.green(guessWord[i]): selectedWord.includes(guessWord[i])? chalk.yellow(guessWord[i]) : chalk.gray(guessWord[i]);    
        }
        return result;
    }