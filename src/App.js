import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Components/Header";
import UserInput from "./Components/UserInput";
import DisplayHaiku from "./Components/DisplayHaiku";
import WordSelect from "./Components/WordSelect";
// import CompleteHaiku from './Components/CompleteHaiku';
// import HowTo from './Components/HowTo';
// import Credits from './Components/Credits';
import "./App.css";

const App = () => {
	// Create one state to hold the haiku object that would hold 3 lines, each containing an array of user-selected words (correct syllables)
	// Then we'll be able to push each word into an array on each line
	const [haikuObject, setHaikuObject] = useState({
		line1: [],
		line2: [],
		line3: [],
	});

	// Create another state that will hold the syllable count. taking into account 5-7-5 with the target increasing cumulatively with each line (5-12-17)
	const [syllableCount, setSyllableCount] = useState(0);

	// Set state variable for the input
	const [userInput, setUserInput] = useState("");

	// set State variable for isValid that checks validity of input
	const [isValid, setIsValid] = useState(true);

	// set State variable for tooManySyllables to check that word inputted is within syllable limit
	const [tooManySyllables, setTooManySyllables] = useState(false);

	// set state variable to hold the most recent word selected by the user
	const [mostRecentWord, setMostRecentWord] = useState("");

	const [currentLine, setCurrentLine] = useState(1)

	const [syllablesRemaining, setSyllablesRemaining] = useState(5);
	// and if true add a function to check user input to verify user choice is usable.
	// this function will be passed in props to userInput.js and wordSelect.js
	// enable useEffect to update everytime the state variable changes
	// if user selection is null then don't allow submit
	// use ternary statement to alert user if word selection is not usable. And make another selection
	// [word].match(^(?=.*?[A-Za-z])[A-Za-z+]+$) to check viabilty of user selection
	// If user selection does match the regex allow them to proceed and sets isValid to true.
	// if does not match set isValid to false and give them an error
	useEffect(() => {
		if (userInput === "") {
			return;
		}
		setIsValid(/^(?=.*?[A-Za-z])[A-Za-z+]+$/.test(userInput));
	}, [userInput]);


	useEffect(() => {
		if (syllableCount >= 17){
			return
		} else if (syllableCount >= 12){
			setCurrentLine(3)
			setSyllablesRemaining(17 - syllableCount)
		} else if (syllableCount >= 5){
			setCurrentLine(2)
			setSyllablesRemaining(12 - syllableCount)
		} else{
			setSyllablesRemaining(5 - syllableCount)
			setCurrentLine(1)
		}
	},[syllableCount]);
	// When user submits onSubmit (and the word is accepted) if !isValid stop the submit. call the checkInput function and useState to make API call
	// second API call and store the amount of syllables in state to be used again and passed down to future word selections

	const handleInputChange = (e) => {
		setUserInput(e.target.value);
		setTooManySyllables(false);
	};

	const checkInput = (userInputSyllables) => {
		// console.log(userInputSyllables);
		if (!isValid){
			return
		} 
		if (userInputSyllables <= 5 && userInput !== "") {
			updateHaikuObject(userInput);
			updateCurrentWord(userInput);
			setSyllableCount(syllableCount + userInputSyllables)
			setUserInput("");
		} else {
			setTooManySyllables(true);
		}
		// console.log(haikuObject);
	};

	const updateHaikuObject = (selectedWord) => {
		const line = `line${currentLine}`
		setHaikuObject((prev) => ({
            ...prev,
            [line]: [...prev[line], selectedWord],
        }));
	}

	const getSyllables = (e) => {
		e.preventDefault();
		if (!userInput) { return };
		axios({
			url: "https://api.datamuse.com/words",
			method: "GET",
			dataResponse: "json",
			params: {
				lc: userInput,
				md: "s",
				qe: "lc",
			}
		}).then((result) => {
			checkInput(result.data[0].numSyllables);
			// console.log(result.data);
		});
	};

	const updateCurrentWord = (currentWord) => {
		setMostRecentWord(currentWord);
	}

	const handleWordButtonClick = (syllableNumber, selectedWord) => {
		updateCurrentWord(selectedWord);
		setSyllableCount(syllableCount + syllableNumber);
		updateHaikuObject(selectedWord);
	}

	return (
    <>
		<Header />
		<main>
			<UserInput
				userInput={userInput}
				isValid={isValid}
				tooManySyllables={tooManySyllables}
				handleInputChange={handleInputChange}
				getSyllables={getSyllables}
				updateCurrentWord={updateCurrentWord}
			/>
			<DisplayHaiku haikuObject={haikuObject} />
			<WordSelect
				userInput={userInput}
				mostRecentWord={mostRecentWord}
				updateCurrentWord={updateCurrentWord}
				handleWordButtonClick={handleWordButtonClick}
				syllablesRemaining={syllablesRemaining}
			/>
		</main>
		</>
	);
};

export default App;
