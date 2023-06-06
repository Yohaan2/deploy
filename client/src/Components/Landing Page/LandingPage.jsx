import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { allDiets } from '../Redux/actions';
import style from './LandingPage.module.css';

const LandingPage = ({ home, loading }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchDiets() {
			const request = await axios.get('/diets');
			const { data } = request;
			dispatch(allDiets(data));
		}
		fetchDiets();
	}, []);
	return (
		<>
			{loading ? (
				<div class={style.container}>
					<div class={style.cargando}>
						<div class={style.pelotas}></div>
						<div class={style.pelotas}></div>
						<div class={style.pelotas}></div>
						<span class={style.texto_cargando}>Cargando...</span>
					</div>
				</div>
			) : (
				<div className={style.container}>
					<div className={style.head}>
						<h1 className={style.h1}>Henry Food</h1>
						<h1 className={style.h1}>Bienvenido</h1>
					</div>

					<button class={style.cta} onClick={home}>
						<span>Click me</span>
						<svg width='13px' height='10px' viewBox='0 0 13 10'>
							<path d='M1,5 L11,5'></path>
							<polyline points='8 1 12 5 8 9'></polyline>
						</svg>
					</button>
				</div>
			)}
		</>
	);
};

export default LandingPage;
