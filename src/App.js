// Create one state to hold the haiku object that would hold 3 lines, each containing an array of user-selected words (correct syllables)
// Then we'll be able to push each word into an array on each line

//haiku {
// line1: [],
// 	line2: [],
// 		line3: []
// }

// Create another state that will hold the syllable count. taking into account 5-7-5 with the target increasing cumulatively with each line (5-12-17)

// Set state variable for the input 
// set State vaiable for isValid that checks validity of input and if true 
// add a function to check user input to verify user choice is usable. 
	// this function will be passed in props to userInput.js and wordSelect.js
// enable useEffect to update everytime the state variable changes
// if user selection is null then don't allow submit
// use ternary statement to alert user if word selection is not usable. And make another selection
    // [word].match(^(?=.*?[A-Za-z])[A-Za-z+]+$) to check viabilty of user selection
// If user selection does match the regex allow them to proceed and sets isValid to true.
    // if does not match set isValid to false and give them an error
// When user submits onSubmit (and the word is accepted) if !isValid stop the submit. call the checkInput function and useState to make API call
// second API call and store the amount of syllables in state to be used again and passed down to future word selections
// set State variable to isValid = false by default 



import Header from './Components/Header';
import UserInput from './Components/UserInput';
import DisplayHaiku from './Components/DisplayHaiku';
import WordSelect from './Components/WordSelect';
// import CompleteHaiku from './Components/CompleteHaiku';
// import HowTo from './Components/HowTo';
// import Credits from './Components/Credits';

import './App.css';

const App = () => {

	return (
		<>
			<Header />
			<main>
				<UserInput />
				<DisplayHaiku />
				<WordSelect />
			</main>
		</>
	);
}

export default App;
