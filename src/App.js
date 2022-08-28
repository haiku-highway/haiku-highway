import Home from './Components/Home';
import Header from './Components/Header';
import HowTo from './Components/HowTo';
import Credits from './Components/Credits';
import { Routes, Route } from 'react-router-dom';

import "./App.css";

const App = () => {
	
	return (
        <>
			<Header />
			
			<Routes>
				<Route path="/" element={ <Home /> } />
				<Route path="/howto" element={ <HowTo /> } />
				<Route path="/credits" element={ <Credits /> } />
			</Routes>
		</>
	);
};

export default App;
