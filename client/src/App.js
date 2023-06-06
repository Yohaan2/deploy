import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LandingPage from './Components/Landing Page/LandingPage';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import { useDispatch } from 'react-redux';
import { searchId, allRecipe } from './Components/Redux/actions';
import Form from './Components/Form/Form';
import axios from 'axios';
axios.defaults.baseURL = 'deploy-production-9dc3.up.railway.app';

function App() {
	//const [recipe, setRecipe] = useState();

	const dispatch = useDispatch();

	const [access, setAccess] = useState(false);

	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const home = async () => {
		try {
			setLoading(true);
			const request = await axios.get('/allRecipe');
			const { data } = request;

			dispatch(allRecipe(data));
			navigate('/home');
		} catch (error) {
			return error.message;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		!access && navigate('/');
	}, [access]);

	const onSearch = async (name, setName) => {
		if (name) {
			const request = await axios.get(`/recipe/name?name=${name}`);
			const { data } = request;
			dispatch(searchId(data));
			setName('');
		}
	};

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LandingPage home={home} loading={loading} />} />
				<Route path='/home' element={<Home onSearch={onSearch} />} />
				<Route path='/detail/:id' element={<Detail />} />
				<Route path='/form' element={<Form />} />
			</Routes>
		</div>
	);
}

export default App;
