const Form = ({ getSyllables, isValid, tooManySyllables, userInput, handleInputChange, className }) => {
    return(
            <form className={`form ${className}`} action="submit" onSubmit={getSyllables}>
            {isValid ? null : <p>Please input only letter characters</p>}
            {tooManySyllables ? <p>Enter a word with less syllables</p> : null}
                <label htmlFor="wordInput" className="sr-only">add your first word</label>
                    <input type="text" value={userInput} onChange={handleInputChange} name="wordInput" placeholder="choose a word" />
            </form>
    )
};

export default Form;