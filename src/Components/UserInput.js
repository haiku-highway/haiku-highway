import Form from './Form';

const UserInput = ( {isValid, tooManySyllables, userInput, handleInputChange, getSyllables} ) => {
    return (
        <div>
            <h2>add your first word</h2>
            <Form getSyllables={getSyllables} isValid={isValid} tooManySyllables={tooManySyllables} userInput={userInput} handleInputChange={handleInputChange} className={"userInputForm"} />
        </div>
    )
}

export default UserInput;