import { useState, useEffect } from "react";
import axios from "axios";
import UserInput from "./UserInput";
import DisplayHaiku from "./DisplayHaiku";
import WordSelect from "./WordSelect";
// import CompleteHaiku from './CompleteHaiku';

import { FaSpinner } from 'react-icons/fa';

const Home = () => {
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

	const [currentLine, setCurrentLine] = useState(1);

	const [syllablesRemaining, setSyllablesRemaining] = useState(5);

	const [wordButton, setWordButton] = useState([]);

    const [noResults, setNoResults] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

    const [hasFirstWord, setHasFirstWord] = useState(false);

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
			setCurrentLine(null);
			return;
		} else if (syllableCount >= 12){
			setCurrentLine(3);
			setSyllablesRemaining(17 - syllableCount);
		} else if (syllableCount >= 5){
			setCurrentLine(2);
			setSyllablesRemaining(12 - syllableCount);
		} else{
			setSyllablesRemaining(5 - syllableCount);
			setCurrentLine(1);
		}
	},[syllableCount]);
	// When user submits onSubmit (and the word is accepted) if !isValid stop the submit. call the checkInput function and useState to make API call
	// second API call and store the amount of syllables in state to be used again and passed down to future word selections

	const handleInputChange = (e) => {
		setUserInput(e.target.value);
		setTooManySyllables(false);
	};


	const checkInput = (userInputSyllables) => {
		if (!isValid){
			setIsLoading(false);
			return;
		} 
		if (userInputSyllables <= syllablesRemaining && userInput !== "") {
			updateHaikuObject(userInput);
			populateWordButton(userInput);
			setSyllableCount(syllableCount + userInputSyllables);
			setUserInput("");
			setHasFirstWord(true);
		} else {
			setTooManySyllables(true);
			setIsLoading(false);
		}
	};

	const updateHaikuObject = (selectedWord) => {
		if (!currentLine) {
			return;
		}
		const line = `line${currentLine}`
		setHaikuObject((prev) => ({
            ...prev,
            [line]: [...prev[line], selectedWord],
        }));
	}

	const getSyllables = (e) => {
		e.preventDefault();
		if (!userInput) { 
			return;
		}

		setIsLoading(true);

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
		});
	};

	const handleWordButtonClick = (syllableNumber, selectedWord) => {
		setSyllableCount(syllableCount + syllableNumber);
		updateHaikuObject(selectedWord);
		populateWordButton(selectedWord);
	}

	const populateWordButton = (mostRecentWord) => {
		if (syllableCount >= 17) {
			setWordButton([]);
			return;
		}

        if (mostRecentWord === "") { 
			return;
		};

		setIsLoading(true);
        setNoResults(false);

		axios({
			url: "https://api.datamuse.com/words",
			method: "GET",
			dataResponse: "json",
			params: {
				lc: mostRecentWord,
				md: "s",
			}
		}).then((result) => {
			const resultData = result.data;
			let newWords = [];
			for (let i = 0; i < 10; i++) {
					const resultLength = resultData.length;
					const selectedIndex = Math.floor(Math.random() * resultLength);
					console.log(syllablesRemaining);
				if (resultData.length === 0) {
				} else if (!/^(?=.*?[A-Za-z])[A-Za-z+]+$/.test(resultData[selectedIndex].word)) {
					i--;
					resultData.splice(selectedIndex, 1);
				} else if (resultData[selectedIndex].numSyllables > syllablesRemaining) {
					resultData.splice(selectedIndex, 1);
					i--;
				} else {
					newWords.push(resultData[selectedIndex]);
					resultData.splice(selectedIndex, 1);
				}
			}
			if (newWords.length === 0) {
				setNoResults(true);
				setIsLoading(false);
				return;
			}

			setWordButton(newWords);
			setIsLoading(false);
		});
    }


	return (
        <>
            <main>
                <UserInput
                    userInput={userInput}
                    isValid={isValid}
                    tooManySyllables={tooManySyllables}
                    handleInputChange={handleInputChange}
                    getSyllables={getSyllables}
                    hasFirstWord={hasFirstWord}
                />
                <DisplayHaiku 
                    haikuObject={haikuObject}
                    currentLine={currentLine}
                />
                {
                    isLoading ?
                    <FaSpinner /> :
                    <WordSelect
                        userInput={userInput}
                        isValid={isValid}
                        tooManySyllables={tooManySyllables}
                        handleInputChange={handleInputChange}
                        getSyllables={getSyllables}
                        handleWordButtonClick={handleWordButtonClick}
                        wordButton={wordButton}
                        noResults={noResults}
                        isLoading={isLoading}
                    />
                }
            </main>
		</>
	);
};

export default Home