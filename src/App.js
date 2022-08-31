import Home from './Components/Home';
import Header from './Components/Header';
import HowTo from './Components/HowTo';
import Credits from './Components/Credits';
import { Routes, Route } from 'react-router-dom';

import "./App.min.css";

const App = () => {
	
	return (
    <div className='wrapper'>
			<Header />
			
			<Routes>
				<Route path="/" element={ <Home /> } />
				<Route path="/howto" element={ <HowTo /> } />
				<Route path="/credits" element={ <Credits /> } />
			</Routes>
		</div>
	);
};

export default App;
