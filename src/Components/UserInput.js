import Form from './Form';

const UserInput = ( {isValid, tooManySyllables, userInput, handleInputChange, getSyllables, hasFirstWord } ) => {
    return (
        hasFirstWord ? 
        <div>
            <h2>create your haiku</h2>
        </div> : 
        <div>
            <h2>add your first word</h2>
            <Form getSyllables={getSyllables} isValid={isValid} tooManySyllables={tooManySyllables} userInput={userInput} handleInputChange={handleInputChange} className={"userInputForm"} />
        </div>
        
    )
}

export default UserInput;