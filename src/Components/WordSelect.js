// run a function (or UseEffect? we can store current word in a state variable?) the Datamuse API to receive words often following the word inputted by the user ('/words' endpoint, params: lc=[usersWord]) & md=s) using a randomizer and limiting results to no more than 10-15 depending on how satisying the results are
// ensure that special characters are excluded from results
// if there are words being returned, display on page
// if not, display error message and provide user with an input field where they can type in another word of their choice (Making sure the word fits within the haiku parameters)
// /^[a-zA-Z]+$/g (RegEx: Only letters and apostrophes)
// to store info returned from an API in an array of objects: 
// [{ word: 'returned word', syllableCount: num }, { word: 'returned word', syllableCount: num }]

// to reference data-numSyllable in JS. Each word is a separate button
// <button value={word} data-numSyllable={syllableCount}>{word}</button?
// button.dataset.numSyllable

import { useEffect, useState } from "react";
import axios from "axios";

const WordSelect = () => {
    const [wordButton, setWordButton] = useState([])

    useEffect(() => {
        axios({
            url: "https://api.datamuse.com/words",
            method: "GET",
            dataResponse: "json",
            params: {
                lc: 'cookie',
                md: "s",
            },
        }).then((result) => {
            let newWords = [];
            for (let i = 0; i < 10; i++) {
                const resultData = result.data
                const resultLength = resultData.length
                const selectedIndex = Math.floor(Math.random() * resultLength)
                console.log(selectedIndex);
                if (newWords.includes(resultData[selectedIndex])){
                    i--
                } else if (/^(?=.*?[A-Za-z])[A-Za-z+]+$/.test(resultData[selectedIndex])) {
                    i--
                }
            }
        });
    })

    return (
        <div>WordSelect</div>
    )
}

export default WordSelect;