const validate = (data) => {
	const titleRegex = new RegExp(/^[A-Za-z\s]+$/);
	const numberRegex = new RegExp(/^(?:100|[1-9][0-9]?)$/);
	const imageRegex = new RegExp(
		/^(http(s)?:\/\/)?[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*(\.[a-zA-Z]{2,})(:\d{2,5})?(\/[^\s]*)?$/
	);

	let error = { boton: true };
	if (data.title && data.healthScore && data.steps) {
		error.boton = false;
	}
	if (!titleRegex.test(data.title)) {
		error.title = 'Debes colocar solo letras';
		error.boton = true;
	}
	if (!data.title) {
		error.titleVacio = 'Necesitas llenar este campo';
	}
	if (!numberRegex.test(data.healthScore)) {
		error.healthScore = 'No debe exceder de 100';
		error.boton = true;
	}
	if (!imageRegex.test(data.image)) {
		error.image = 'Tienes que colocar una url';
		error.boton = true;
	}
	return error;
};

export default validate;
