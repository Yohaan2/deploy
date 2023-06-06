import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import style from './Detail.module.css';

const Detail = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fethData() {
			try {
				setLoading(true);
				const request = await axios.get(`/recipe/${id}`);
				const { data } = request;
				setRecipe(data);
			} catch (error) {
				return error.message;
			} finally {
				setLoading(false);
			}
		}
		fethData();
	}, [id]);

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
				<div className={style.principal}>
					{recipe?.map((e) => {
						return (
							<div key={e.id} className={style.containerDetail}>
								<div className={style.head}>
									<NavLink to={'/home'} className={style.ContainBtnHome}>
										<button className={style.btnHome}>Home</button>
									</NavLink>
									<h1 className={style.title}>Recipe Detail</h1>
								</div>
								<h2 className={style.title}> ID: {e.id}</h2>
								<h2 className={style.title}>Title: {e.title}</h2>
								<img src={e.image} alt={e.title} className={style.img} />
								<h3 className={style.h2}>Summary:</h3>
								<p className={style.text}>{e.summary}</p>
								<h3 className={style.h2}>Steps: </h3>
								<p className={style.text}>{e.step}</p>
								<h3 className={style.h2}>Type of Diets:</h3>
								{e.diets?.map((a, i) => {
									return (
										<b key={i} className={style.b}>
											{a}
										</b>
									);
								})}
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default Detail;
