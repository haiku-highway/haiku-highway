// Create one state to hold the haiku object that would hold 3 lines, each containing an array of user-selected words (correct syllables)
// Then we'll be able to push each word into an array on each line

//haiku {
// line1: [],
// 	line2: [],
// 		line3: []
// }

// Create another state that will hold the syllable count. taking into account 5-7-5 with the target increasing cumulatively with each line (5-12-17)



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
