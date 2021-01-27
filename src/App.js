import './App.css';
import { BrowserRouter } from 'react-router-dom';

import MainPage from './containers/Main/MainPage';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<MainPage />
			</div>
		</BrowserRouter>	
	);
}

export default App;
