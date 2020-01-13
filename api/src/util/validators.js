module.exports.validateRegisterInput = (
	username,
	email,
	password,
	confirmPassword
	) => {
	const errors = {};
	if (username.trim() === '') {
		errors.username = 'Username must not be empty'; 
	} 
	else if (username.length < 4) {
		errors.username = 'Username must have at least 6 characters';
	} else {
		const regExUser = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){2,15}[a-zA-Z0-9]/;
		if (!username.match(regExUser)) {
		error.username = 'Please enter a valid username.';
		}
	}
	if (email.trim() === '') {
		errors.email = 'Email must not be empty';
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
		errors.email = 'Email must be a valid email address';
		}
	}
	if (password === '') {
		errors.password = 'Password must not empty';
	} else if (password.length < 6) {
		errors.password = 'Password must have at least 6 characters';
	} else if (password !== confirmPassword) {
		errors.confirmPassword = 'Passwords must match';
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
	};
};

module.exports.validateLoginInput = (username, password) => {
	const errors = {};
	if (username.trim() === '') {
		errors.username = 'Please enter a valid username';
	}
	if (password.trim() === '') {
		errors.password = 'Password must have at least 6 characters';
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1
	};
};
