import assert from "assert";
import { getRandomWord, readWordsFromFile } from "../../services/fileHandle.js";

export async function run() {
  // Test case 1: Check if getRandomWord returns a word from the list
  const allWords = readWordsFromFile();
  const randomWord = getRandomWord();
  assert.ok(
    allWords.includes(randomWord),
    "getRandomWord should return a word from the list",
  );

  // Test case 2: Check if readWordsFromFile returns an array of words
  const words = readWordsFromFile();
  assert.ok(Array.isArray(words), "readWordsFromFile should return an array");
  assert.ok(
    words.length > 0,
    "readWordsFromFile should return a non-empty array",
  );
}
