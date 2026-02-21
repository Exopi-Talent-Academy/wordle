import chalk from "chalk";

export function giveFeedback(guessWord, selectedWord) {
        let result = "";
        let wordInfo = getWordInfo(guessWord, selectedWord);
        //  console.log(wordInfo);

        for(let i=0; i<guessWord.length; i++){
                result += selectedWord[i] === guessWord[i]? chalk.green(guessWord[i]): 
                selectedWord.includes(guessWord[i])? isItYellow(guessWord, i, selectedWord, wordInfo) : 
                chalk.gray(guessWord[i]);    
        }
        return result;
    }

export function errorMessage(){
        console.log(chalk.red("your guess is not valid. Try again."));
}



function isItYellow(guessWord, i, selectedWord, wordInfo) {
        let countInResult = selectedWord.split(guessWord[i]).length - 1;

        let alreadyWritten = wordInfo[guessWord[i]]?.ocurrences? wordInfo[guessWord[i]]['ocurrences'].filter(x => x < i).length : 0;
        let countInGuess =  guessWord.substring(0, i).split(guessWord[i]).length - alreadyWritten;
                
        let countInExactPosition = wordInfo[guessWord[i]]?.number ?? 0;
        // console.log(guessWord[i], countInExactPosition, countInResult, countInGuess, wordInfo[guessWord[i]]);
        if(countInResult >= (countInGuess + countInExactPosition)) {
                return chalk.yellow(guessWord[i]);
        }else {  
                return chalk.gray(guessWord[i]);
        }
}

function getWordInfo( guessWord, selectedWord) {
        let wordInfo = { };
         for(let i=0; i<guessWord.length; i++){
                if(selectedWord[i] === guessWord[i]) {
                        if(wordInfo[guessWord[i]]) {
                                
                                wordInfo[guessWord[i]] = {
                                        number : wordInfo[guessWord[i]].number + 1,
                                        ocurrences: [...wordInfo[guessWord[i]].ocurrences, i]
                                }

                        }else {
                                wordInfo[guessWord[i]] = {
                                        number : 1,
                                        ocurrences: [i]
                                }
                        }
                }  
        }
        return wordInfo;
}



/*

function isItYellow(guessWord, i, selectedWord) {
        let count = selectedWord.split(guessWord[i]).length - 1;
        let cnt = guessWord.split(guessWord[i]).length - 1;
        let alreadyWritten = guessWord.substring(0, i).split(guessWord[i]).length -1 ;
        let inSelectedWord =  selectedWord.substring(i+1).split(guessWord[i]);
        console.log(i, guessWord[i], guessWord.substring(0, i), alreadyWritten, inSelectedWord, count);

        if(count > (alreadyWritten + inSelectedWord.length -1) ) {
                return chalk.yellow(guessWord[i]);
               
        }else {  
                return chalk.gray(guessWord[i]);
        }
}

function isItYellow(guessWord, i, selectedWord, wordInfo, yellowGuess) {
        yellowGuess['myGuess'] = yellowGuess['myGuess'] + "" + guessWord[i]
        let countInResult = selectedWord.split(guessWord[i]).length - 1;
        let countInGuess =  yellowGuess['myGuess'].substring(0, i).split(guessWord[i]).length -2 ;
        let countInExactPosition = wordInfo[guessWord[i]] ?? 0;
        console.log(guessWord[i], yellowGuess['myGuess'], countInExactPosition, countInResult, countInGuess);
        if(countInResult > (countInGuess + countInExactPosition)) {
                return chalk.yellow(guessWord[i]);
               
        }else {  
                return chalk.gray(guessWord[i]);
        }
}

*/