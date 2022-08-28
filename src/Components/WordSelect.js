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
import Form from './Form'

const WordSelect = ({ mostRecentWord, handleWordButtonClick, syllablesRemaining, getSyllables, isValid, tooManySyllables, userInput, handleInputChange }) => {
    const [wordButton, setWordButton] = useState([]);

    const [noResults, setNoResults] = useState(false);

    const populateWordButton = (resultData) => {
        let newWords = [];
        for (let i = 0; i < 10; i++) {
            const resultLength = resultData.length;
            const selectedIndex = Math.floor(Math.random() * resultLength);
            if (resultData.length === 0) {
            } else if (
            !/^(?=.*?[A-Za-z])[A-Za-z+]+$/.test(
                resultData[selectedIndex].word
            )
            ) {
            i--;
            resultData.splice(selectedIndex, 1);
            } else if (
            resultData[selectedIndex].numSyllables > syllablesRemaining
            ) {
            console.log(resultData[selectedIndex]);
            resultData.splice(selectedIndex, 1);
            i--;
            } else {
            newWords.push(resultData[selectedIndex]);
            resultData.splice(selectedIndex, 1);
            }
        }
        if (newWords.length === 0) {
            setNoResults(true);
            return;
        }
        setWordButton(newWords);
    }

    useEffect(() => {
        if (mostRecentWord === "") { return };
        setNoResults(false);
        axios({
            url: "https://api.datamuse.com/words",
            method: "GET",
            dataResponse: "json",
            params: {
                lc: mostRecentWord,
                md: "s",
            }
        }).then((result) => {
            populateWordButton(result.data);
        });
    }, [mostRecentWord]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {wordButton.map((wordObject) => {
                return <button key={wordButton.indexOf(wordObject)} onClick={() => handleWordButtonClick(wordObject.numSyllables, wordObject.word)}>{wordObject.word}</button>;
            })}
            { 
                noResults ?
                <>
                    <Form getSyllables={getSyllables} isValid={isValid} tooManySyllables={tooManySyllables} userInput={userInput} handleInputChange={handleInputChange} className={"wordSelectForm"}/>
                    <p>no results found, please add a word on the line above to continue</p>
                </>
                    : null
            } 
        </>
    );
}

export default WordSelect;