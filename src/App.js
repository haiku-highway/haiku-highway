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
