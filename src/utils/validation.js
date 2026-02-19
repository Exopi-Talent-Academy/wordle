
export function validateGuess(guessWord){
        const isAlphabetic = /^[A-Za-z]+$/.test(guessWord);
        return guessWord.length === 5 && isAlphabetic;
    }


