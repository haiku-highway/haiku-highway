// Set state variable for the input 
// set State vaiable for isValid that checks validity of input and if true 
// add a function to check user input to verify user choice is usable. 
// enable useEffect to update everytime the state variable changes
// if user selection is null then don't allow submit
// use ternary statement to alert user if word selection is not usable. And make another selection
    // [word].match(^(?=.*?[A-Za-z])[A-Za-z+]+$) to check viabilty of user selection 
// If user selection does match the regex allow them to proceed and sets isValid to true.
    // if does not match set isValid to false and give them an error
// When user submits onSubmit (and the word is accepted) if !isValid stop the submit. call the checkInput function and useState to make API call
// second API call and store the amount of syllables in state to be used again and passed down to future word selections
// set State variable to isValid = false by default 





const UserInput = () => {
    return (
    <div>UserInput</div>
    )
}

export default UserInput;