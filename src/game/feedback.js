import chalk from "chalk";

export function giveFeedback(guessWord, selectedWord) {
        let result = "";
        for(let i=0; i<guessWord.length; i++){
                result += selectedWord[i] === guessWord[i]? chalk.green(guessWord[i]): 
                selectedWord.includes(guessWord[i])? isItYellow(guessWord, i, selectedWord) : 
                chalk.gray(guessWord[i]);    
        }
        return result;
    }

export function errorMessage(){
        console.log(chalk.red("your guess is not valid. Try again."));
}


function isItYellow(guessWord, i, selectedWord) {

        let count = selectedWord.split(guessWord[i]).length - 1;

        return chalk.yellow(guessWord[i]);

}