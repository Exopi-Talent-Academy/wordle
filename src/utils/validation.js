export function validateGuess(guessWord, allWords) {
  const isAlphabetic = /^[A-Za-z]+$/.test(guessWord);
  return guessWord.length === 5 && isAlphabetic && allWords.includes(guessWord);
}
