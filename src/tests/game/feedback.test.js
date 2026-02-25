import assert from 'assert';
import { findProperColor } from '../../game/feedback.js';

export async function run(){
    // Test case 1: Basic feedback
    const guess1 = "apple";
    const selectedWord1 = "angle";
    const expected1 =  {
                0: 'green',
                1: 'gray',
                2: 'gray',
                3: 'green',
                4: 'green'
        };
    const actual1 = findProperColor(guess1, selectedWord1);
    assert.deepStrictEqual(actual1, expected1); 

    // Test case 2: All letters match
    const guess2 = "grape";
    const selectedWord2 = "grape";
    const expected2 = {
                0: 'green',
                1: 'green',
                2: 'green',
                3: 'green',
                4: 'green'
        };
    const actual2 = findProperColor(guess2, selectedWord2);
    assert.deepStrictEqual(actual2, expected2);

}