import Form from './Form';

const UserInput = ( {isValid, tooManySyllables, userInput, handleInputChange, getSyllables, hasFirstWord } ) => {
    return (
        <section className={hasFirstWord ? "userInput slide" : "userInput"}>
        {   
            hasFirstWord ?
            
                <h2>create your haiku</h2>
            : 
            <>
                <h2>add your first word</h2>
                <Form getSyllables={getSyllables} isValid={isValid} tooManySyllables={tooManySyllables} userInput={userInput} handleInputChange={handleInputChange} className={"userInputForm"} />
            </>
        }
        </section>
    )
}

export default UserInput;