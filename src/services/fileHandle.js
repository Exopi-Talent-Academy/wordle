import fs from "fs";
import readline from "readline";

import { mapResult } from "../utils/helper.js";

export function showStatistics() {
  let content = fs.readFileSync("./src/data/result.txt", "utf8");
  let result = content
    .split("\n")
    .map((res) => res.trim())
    .filter((res) => res !== "");
  let res = mapResult(result);
  console.table(
    [
      {
        total: result.length,
        first: res.first,
        second: res.second,
        third: res.third,
        fourth: res.fourth,
        fifth: res.fifth,
        sixth: res.sixth,
      },
    ],
    ["total", "first", "second", "third", "fourth", "fifth", "sixth"],
  );
}
/**
 * Reads data from a file and returns an array of words.
 *
 * @returns Array
 * @example
 * const words = readWordsFromFile();
 * console.log(words); // Output: ["apple", "grape", "peach", "mango", "berry"]
 */

export function readWordsFromFile() {
  let allWords = fs.readFileSync("./src/data/words.txt", "utf8");
  allWords = allWords.split("\r\n").map((word) => word.trim());
  return allWords;
}

export function getRandomWord() {
  let wordList = readWordsFromFile();
  return wordList[Math.floor(Math.random() * wordList.length)];
}

export function saveResult(win, attempts) {
  let content = win + " " + attempts + "\n";
  fs.writeFileSync("./src/data/result.txt", content, { flag: "a+" }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("files saved successfully....");
    }
  });
}
