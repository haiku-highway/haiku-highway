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