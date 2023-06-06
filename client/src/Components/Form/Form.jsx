import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCero, postRecipe } from '../Redux/actions';
import { NavLink } from 'react-router-dom';
import validate from './validate';
import style from './Form.module.css';

const Form = () => {
	const dispatch = useDispatch();
	const post = useSelector((state) => state.post);
	const error = useSelector((state) => state.error);
	const diets = useSelector((state) => state.diets);

	useEffect(() => {
		dispatch(postCero());
	}, []);

	const [errors, setErrors] = useState({
		boton: true,
	});

	const [recipe, setRecipe] = useState({
		title: '',
		summary: '',
		healthScore: 0,
		steps: '',
		image: '',
		diets: [],
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		event.target.reset();
		setErrors({ ...errors, boton: true });
		dispatch(postRecipe(recipe));
		setRecipe({
			title: '',
			summary: '',
			healthScore: 0,
			steps: '',
			image: '',
			diets: [],
		});
		dispatch(postCero());
	};

	const handleChange = (event) => {
		setRecipe({
			...recipe,
			[event.target.name]: event.target.value,
		});
		setErrors(
			validate({
				...recipe,
				[event.target.name]: event.target.value,
			})
		);
	};

	const handleCheck = (event) => {
		let arr = [];
		if (event.target.checked === true) {
			arr.push(event.target.value);
			setRecipe({
				...recipe,
				diets: recipe.diets.concat(arr),
			});
		} else {
			setRecipe({
				...recipe,
				diets: recipe.diets.filter((e) => e !== event.target.value),
			});
		}
	};

	return (
		<div className={style.container}>
			<NavLink to={'/home'} className={style.containbtn}>
				<button className={style.btnHome}>Home</button>
			</NavLink>
			<div className={style.container_Form}>
				<h1 className={style.h1}>Recipe</h1>
				<form onSubmit={handleSubmit} className={style.form}>
					<label className={style.labels}>Title*: </label>
					<input
						className={style.inputs}
						type='text'
						placeholder='Nombre'
						name='title'
						value={recipe.title}
						onChange={handleChange}
					/>
					{errors.titleVacio ? (
						<p className={style.errors}>{errors.titleVacio}</p>
					) : errors.title ? (
						<p className={style.errors}>{errors.title}</p>
					) : null}

					<label className={style.labels}>Summary: </label>
					<input
						className={style.inputs}
						type='text'
						placeholder='Resumen'
						name='summary'
						value={recipe.summary}
						onChange={handleChange}
					/>

					<label className={style.labels}>Health Score*:</label>
					<input
						className={style.inputs}
						type='number'
						placeholder='Health Score'
						name='healthScore'
						value={recipe.healthScore}
						onChange={handleChange}
						min={0}
						max={100}
					/>
					{errors.healthScore ? <p className={style.errors}>{errors.healthScore}</p> : null}

					<label className={style.labels}>Steps*:</label>
					<textarea
						className={style.inputs}
						type='text'
						placeholder=' Paso a paso'
						name='steps'
						value={recipe.steps}
						onChange={handleChange}
					/>

					<label className={style.labels}>Imagen:</label>
					<input
						className={style.inputs}
						type='text'
						placeholder=' Imagen'
						name='image'
						value={recipe.image}
						onChange={handleChange}
					/>
					{errors.image ? <p className={style.errors}>{errors.image}</p> : null}
					<label className={style.labels}>Type of Diets</label>
					<div className={style.diets}>
						{diets.map((type, i) => {
							return (
								<div key={i} className={style.maping}>
									<label className={style.labelD}>{type}</label>
									<input type='checkbox' name={type} value={type} onChange={handleCheck} />
								</div>
							);
						})}
					</div>

					<button className={style.boton} type='submit' disabled={errors.boton}>
						Enviar
					</button>
					<p>* required information</p>
					{error?.error ? (
						<p>Recipe ya existente</p>
					) : post?.post ? (
						<p>
							Se ha creado el recipe con exito <br />
							ID: {post?.post}
						</p>
					) : null}
				</form>
			</div>
		</div>
	);
};

export default Form;
