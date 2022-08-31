import Form from './Form';

const WordSelect = ({ handleWordButtonClick, getSyllables, isValid, tooManySyllables, userInput, handleInputChange, noResults, wordButton, isCompleted }) => {

    // when the user clicks on 'make a new haiku!' button...
    const refreshPage = () => {
        // refresh the page
        window.location.reload();
    }

    return (
        <section className='wordSelect'>
            { 
                noResults ?
                <div className="wordSelectFormContainer">
                    <Form getSyllables={getSyllables} isValid={isValid} tooManySyllables={tooManySyllables} userInput={userInput} handleInputChange={handleInputChange} className={"wordSelectForm"}/>
                    <p className='errorMessage'>no results found, please add a word on the line above to continue</p>
                </div>
                : 
                <div className="wordButtonContainer">
                    {wordButton.map((wordObject) => {
                        return (
                            <button
                                key={wordButton.indexOf(wordObject)}
                                onClick={() =>handleWordButtonClick(wordObject.numSyllables, wordObject.word)}
                                className="wordButton" >
                                {wordObject.word}
                            </button>
                        );
                    })}
                </div>
            } 

            {isCompleted ? 
                <div className="endBtnContainer">
                    <button className="endBtn" onClick={refreshPage}>make a new haiku!</button> 
                </div>
            : null}
        </section>
    );
}

export default WordSelect;