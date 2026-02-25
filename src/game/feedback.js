import chalk from "chalk";

export function giveFeedback(guessWord, selectedWord) {
        let result = "";
        let matchedResult = findProperColor(guessWord, selectedWord) ;
        for(let i=0; i<guessWord.length; i++){
                let color = matchedResult[i];
                if(color === 'green') {
                        result += chalk.green(guessWord[i]);
                } else if(color === 'yellow') {
                        result += chalk.yellow(guessWord[i]);
                }else {
                        result += chalk.gray(guessWord[i]);
                }    
        }
        return result;
    }

export function failureMessage(){
        console.log(chalk.red("your guess is not valid. Try again."));
}

export function findProperColor(guessWord, targetWord) {
        let matchedResult = {
                0: '',
                1: '',
                2: '',
                3: '',
                4: ''
        }
        let guessWordArray = guessWord.split('');
        let targetWordArray = targetWord.split('');

        guessWordArray.forEach((char, index) => {
                if(char === targetWordArray[index]) {
                        matchedResult[index] = "green";
                        guessWordArray[index] = '';
                        targetWordArray[index] = '';
                }
        })

         guessWordArray.forEach((char, index) => {
                if(targetWordArray.includes(char)) {
                        if(!char){
                                return;
                        }
                        matchedResult[index] = 'yellow';
                        guessWordArray[index] = '';
                        let indexInTarget = targetWordArray.indexOf(char);
                        targetWordArray[indexInTarget] = '';
                }
                else {
                        matchedResult[index] = 'gray';
                }
        })

        return matchedResult;
        l
}
