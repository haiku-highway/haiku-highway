const UserInput = ( {isValid, tooManySyllables, userInput, handleInputChange, getSyllables} ) => {
    return (
        <div>
            <h2>add your first word</h2>
            <form action="submit" onSubmit={getSyllables}>
            {isValid ? null : <p>Please input only letter characters</p>}
            {tooManySyllables ? <p>Enter a word with less syllables</p> : null}
            <label htmlFor="wordInput" className="sr-only">add your first word</label>
                <input type="text" value={userInput} onChange={handleInputChange} name="wordInput" placeholder="choose a word" />
            </form>
        </div>
    )
}

export default UserInput;