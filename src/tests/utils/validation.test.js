import assert from "assert";
import { validateGuess } from "../../utils/validation.js";

export async function run(){
    // Test case 1: Valid guess
    const allWords = ["apple", "angle", "grape", "peach"];
    const guess1 = "apple";
    assert.strictEqual(validateGuess(guess1, allWords), true);      

    // Test case 2: Invalid guess (not in allWords)
    const guess2 = "berry";
    assert.strictEqual(validateGuess(guess2, allWords), false);
    // Test case 3: Invalid guess (not 5 letters)
    const guess3 = "app";
    assert.strictEqual(validateGuess(guess3, allWords), false);             
    // Test case 4: Invalid guess (contains non-alphabetic characters)
    const guess4 = "appl3";
    assert.strictEqual(validateGuess(guess4, allWords), false);             
}