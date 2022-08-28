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

import Form from './Form';

const WordSelect = ({ handleWordButtonClick, getSyllables, isValid, tooManySyllables, userInput, handleInputChange, noResults, wordButton }) => {

    return (
        <section className='wordSelect'>

            {wordButton.map((wordObject) => {
                return <button key={wordButton.indexOf(wordObject)} onClick={() => handleWordButtonClick(wordObject.numSyllables, wordObject.word)}>{wordObject.word}</button>;
            })}

            { 
                noResults ?
                <>
                    <Form getSyllables={getSyllables} isValid={isValid} tooManySyllables={tooManySyllables} userInput={userInput} handleInputChange={handleInputChange} className={"wordSelectForm"}/>
                    <p className='errorMessage'>no results found, please add a word on the line above to continue</p>
                </>
                : null
            } 

        </section>
    );
}

export default WordSelect;