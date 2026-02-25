 import fs from "fs";
 import readline from "readline";
 
 import { mapResult } from "../utils/helper.js";


 export function showStatistics(){
        let content = fs.readFileSync("./src/data/result.txt", "utf8");
        let result = content.split("\n").map(res => res.trim()).filter(res => res !== "");
        let res = mapResult(result);
        console.table([{total: result.length, first: res.first, second: res.second, third: res.third, fourth: res.fourth, fifth: res.fifth, sixth: res.sixth}], ['total', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth']);
    }

export function wordList(){
        let allWords = fs.readFileSync("./src/data/words.txt", "utf8");
        allWords =  allWords.split("\r\n").map(word => word.trim());
        return allWords;
    }

export function saveResult(win, attempts){
        let content = win + ' ' + attempts + "\n";
        fs.writeFileSync("./src/data/result.txt", content, {flag: 'a+'}, err=>{
            if(err){
                console.log(err);
            }else {
                console.log("files saved successfully....");
            }
        } )
    }
