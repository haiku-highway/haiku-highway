import { useState, useEffect } from "react";
import axios from "axios";
import UserInput from "./UserInput";
import DisplayHaiku from "./DisplayHaiku";
import WordSelect from "./WordSelect";

import { FaSpinner } from 'react-icons/fa';

const Home = () => {
    // STATE VARIABLES
    // to store the user's haiku
        // update as user selects/inputs new words
	const [haikuObject, setHaikuObject] = useState({
		line1: [],
		line2: [],
		line3: [],
	});

    // store the current number of syllables in the user's haiku
	const [syllableCount, setSyllableCount] = useState(0);

    // state variable for the controlled user input
	const [userInput, setUserInput] = useState("");

    // boolean value dependent on the validity of the user's input
	const [isValid, setIsValid] = useState(true);

    // boolean value dependent on the amount of syllables in the user's input
        // is true if the user's input has more syllables than remain in the current line of the haiku
	const [tooManySyllables, setTooManySyllables] = useState(false);

    // boolean value that updates if the the api returns no valid results
    const [noResults, setNoResults] = useState(false);

    // updates to show the user which line they are currently on and where new words will be displayed
	const [currentLine, setCurrentLine] = useState(1);

    // the amount of syllables remaining in the current line
	const [syllablesRemaining, setSyllablesRemaining] = useState(5);

    // array of word objects that is used to display the word options based on the most recent word as buttons
	const [wordButton, setWordButton] = useState([]);
    
    // boolean value that updates dependent on the loading state (while the api call is in progress)
	const [isLoading, setIsLoading] = useState(false);

    // updates to true after the first word is submitted
        // toggle the UserInput display based on this value
    const [hasFirstWord, setHasFirstWord] = useState(false);
    
    // updates to true when the haiku is completed
    const [isCompleted, setIsCompleted] = useState(false);

    // STEP 1
    // function to handle the user's form input
    const handleInputChange = (e) => {
        // set userInput state variable to the input value
        setUserInput(e.target.value);
        // remove the error message if the user had previously submitted a word with too many syllables
        setTooManySyllables(false);
    };

    // STEP 1a
    // when user inputs a new character...
	useEffect(() => {
        // if the user has removed any characters from the input
		if (userInput === "") {
            // exit the useEffect
			return;
		}
        // otherwise...
        // check validity of the user's input (only allow lowercase and uppercase alphabetical characters)
            // error will be dispayed if the input is not valid
		setIsValid(/^(?=.*?[A-Za-z])[A-Za-z+]+$/.test(userInput));
	}, [userInput]);

    // STEP 2
    // When the user submits their form input...
    const getSyllables = (e) => {
        // prevent the default submit behaviour
        e.preventDefault();

        // if the user's input is blank...
        if (!userInput) { 
            // exit the function
            return;
        }

        // show the loading state
        setIsLoading(true);

        // make api call to get the syllable count of the user's inputted word
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
            // call the checkInput function with the user input's number of syllables returned by the api as a argument
            checkInput(result.data[0].numSyllables);
        });
    };

    // STEP 3
    // When the api call in getSyllables returns the number of syllables based on the user's input...
    const checkInput = (userInputSyllables) => {

        // check to see if the user's input is valid, if not...
        if (!isValid){
            // stop the loading state
            setIsLoading(false);
            // exit the function
            return;
        } 

        // check to see if the userInput is not empty and the user input's syllable count is less than or equal to the remaining syllables on that line, if both conditions are true...
        if (userInputSyllables <= syllablesRemaining && userInput !== "") {
            // update the haiku object to display the new word
            updateHaikuObject(userInput);
            // update the syllable count by adding the new word's syllable count
            setSyllableCount(syllableCount + userInputSyllables);
            // clear the form input
            setUserInput("");
            // and let state know that the first word has been submitted
            setHasFirstWord(true);
            document.querySelector(".userInput").classList.add("slide");
            // create new word buttons based on the new word
            populateWordButton(userInput, 0);
        // otherwise...
        } else {
            // show the error message that there are too many syllables in the user's input
            setTooManySyllables(true);
            // stop the loading state
            setIsLoading(false);
        }
    };
    
    // STEP 4
    // function to update the displayed haiku
    const updateHaikuObject = (selectedWord) => {
        // check to see if current line is falsy (the current line in state is set to null if the haiku has been completed)
        if (!currentLine) {
            // exit the function
            return;
        }

        // create a variable that will be used to update the appropriate line in the haiku object
        const line = `line${currentLine}`;
        // use the haiku object's previous state to set the new state of the haiku object by...
            // use the spread operator to destructure the previous state so that the haiku lines that will not be updated are placed back into the haiku object
            // then use the line variable to update the appropriate line in the haiku object with the user's selected appended to the previous array in that line of the haiku
        setHaikuObject((prev) => ({
            ...prev,
            [line]: [...prev[line], selectedWord],
        }));
    }

    // STEP 5
    // function to populate the word option button for the user to select from
    const populateWordButton = (mostRecentWord, syllablesAdded) => {
        if (syllableCount + syllablesAdded >= 17) {
            return;
        }

        // display the loading state
        setIsLoading(true);
        // if the user had previously selected/inputted a word that returned no results from the api...
            // remove the error and the form input
        setNoResults(false);

        // make a call to the api for a list of words that commonly follow the user's selected/inputted word
        // this list of word objects will be used to populate the buttons that the user can use to select the next word
        axios({
            url: "https://api.datamuse.com/words",
            method: "GET",
            dataResponse: "json",
            params: {
                lc: mostRecentWord,
                md: "s",
            }
        }).then((result) => {
            // create a variable to store the api's results
            const resultData = result.data;
            // create a placeholder variable that will store an array of word objects (to be used when setting the state of the word buttons variable)
            let newWords = [];
            
            // loop over the result data 10 times...
            for (let i = 0; i < 10; i++) {

                // variable to store the length of the result data array
                const resultLength = resultData.length;
                // variable to store a randomly selected index based on the length of the result data array
                const selectedIndex = Math.floor(Math.random() * resultLength);
                // variable to store the selected result (based on the random index)
                const selectedResult = resultData[selectedIndex];

                // if the api returns no results...
                if (resultLength === 0) {
                    // do nothing

                // otherwise, if the word that has been randomly selected from the result data is not valid (contains non-alphabetical characters), OR...
                // the randomly selected word has a syllable count higher than the amount of syllables remaining on the current line of the haiku...
                } else if (selectedResult.numSyllables > (syllablesRemaining - syllablesAdded) && (syllablesRemaining - syllablesAdded) > 0) {
                    // remove the randomly selected word from the result data array
                    resultData.splice(selectedIndex, 1);
                    // run the loop one extra time
                    i--;

                // otherwise...
                } else if (!/^(?=.*?[A-Za-z])[A-Za-z+]+$/.test(selectedResult.word)) {
                    // remove the randomly selected word from the result data array
                    resultData.splice(selectedIndex, 1);
                    // run the loop one extra time
                    i--;
                } else {
                    // add the randomly selected word to the placeholder array that stores the word objects
                    newWords.push(selectedResult);
                    // remove the randomly selected word from the result data array
                    resultData.splice(selectedIndex, 1);
                }
            }

            // once the loop has finished...

            // check to see if the length of the placeholder array that stores the word objects contains no objects, if it does...
            if (newWords.length === 0) {
                // alert the user that no results were found and show the form input so that they can input a new filler word
                setNoResults(true);
                // remove the loading state
                setIsLoading(false);
                // exit the function
                return;
            }

            // if the api returned valid words...
            // set the state of the variable that contains the words to be used when populating the word buttons
            setWordButton(newWords);
            // remove the loading state
            setIsLoading(false);
        });
    }

    // STEP 6
    // when the syllable count is updated in state
	useEffect(() => {
        
        // use the updated syllables count to determine which line the user is on and how many syllables are remaining on the current line of the haiku
		if (syllableCount >= 17){
			setCurrentLine(null);
            setWordButton([]);
            setIsCompleted(true);
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
	}, [syllableCount]);

    // STEP 7
    // function to be called when a user clicks on a word option button
	const handleWordButtonClick = (syllableNumber, selectedWord) => {
        // update the syllable count by adding the selected word's syllable count to the previous syllable count
		setSyllableCount(syllableCount + syllableNumber);
        // add the selected word to the haiku
		updateHaikuObject(selectedWord);
        // create a new set of word buttons based on the user's selected word
		populateWordButton(selectedWord, syllableNumber);
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
                    isCompleted={isCompleted}
                />
                <DisplayHaiku 
                    haikuObject={haikuObject}
                    currentLine={currentLine}
                />
                {
                    isLoading ?
                        <FaSpinner className="loadingIcon" /> :
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
                            isCompleted={isCompleted}
                        />
                }
            </main>
		</>
	);
};

export default Home