import assert from "assert";
import { Game } from "../../game/game.js";

export async function run(){
    // Test case 1: Basic game flow
    const game1 = new Game();

    game1.selectedWord = "apple";
    game1.allWords = ["apple", "angle", "grape", "peach"];


    assert.strictEqual(game1.attempts, 0);
    assert.strictEqual(game1.selectedWord, "apple");
    assert.strictEqual(game1.maxAttempts, 6);
    assert.deepStrictEqual(game1.allWords, ["apple", "angle", "grape", "peach"]);

}

    
    