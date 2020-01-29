module.exports.validateRegisterInput = (
	username,
	prenom,
	nom,
	email,
	password,
	confirmPassword,
	) => {
	const errors = {};
	// console.log(nom);
	// console.log(prenom);
	if (prenom === '') {
		errors.prenom = 'Prenom must not empty';
	} else if (prenom.length < 2) {
		errors.prenom = 'Given name must have at least 3 characters';
	}
	if (nom === '') {
		errors.nom = 'Nom must not empty';
	} else if (nom.length < 2) {
		errors.nom = 'Family name must have at least 3 characters';
	}
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

module.exports.validateEmailyInput = (email) => {
	const errors = {};
	if (email.trim() === '') {
		errors.email = 'Email must not be empty';
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
		errors.email = 'Email must be a valid email address';
		}
	}
}

module.exports.validateResetInput = (password, confirmPassword) => {
	if (password === '') {
		errors.password = 'Password must not empty';
	} else if (password.length < 6) {
		errors.password = 'Password must have at least 6 characters';
	} else if (password !== confirmPassword) {
		errors.confirmPassword = 'Passwords must match';
	}
}

module.exports.validatePasswordsInput = (
	oldPassword,
	newPassword,
	confirmPassword
	) => {
	const errors = {};

	if (newPassword === oldPassword) {
		errors.newPassword = 'The new password has to be different from the old one';
	} else if (newPassword.length < 6) {
		errors.newPassword = 'The new password must have at least 6 characters';
	} else if (newPassword !== confirmPassword) {
		errors.newPassword = 'The new passwords must match';
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1
	};
}

module.exports.validateEditInput = (
	username,
	prenom,
	nom,
	email
	) => {
		const errors = {};

		if (prenom === '') {
			errors.prenom = 'Prenom must not empty';
		} else if (prenom.length < 2) {
			errors.prenom = 'First name must have at least 2 character';
		}
		if (nom === '') {
			errors.nom = 'Nom must not empty';
		} else if (nom.length < 2) {
			errors.nom = 'Last name must have at least 2 character';
		}
		if (username.trim() === '') {
			errors.username = 'Username must not be empty'; 
		} 
		else if (username.length < 6) {
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

		return {
			errors,
			valid: Object.keys(errors).length < 1
		};
	}
