export const handleValidation = (
	fullname: string,
	email: string,
	message: string,
	subject: string
) => {
	let tempErrors: {
		fullname: boolean;
		email: boolean;
		subject: boolean;
		message: boolean;
	} = {
		fullname: false,
		email: false,
		subject: false,
		message: false,
	};
	let isValid = true;

	if (fullname.length <= 0) {
		tempErrors["fullname"] = true;
		isValid = false;
	}
	if (email.length <= 0) {
		tempErrors["email"] = true;
		isValid = false;
	}
	if (!email.includes("@")) {
		tempErrors["email"] = true;
		isValid = false;
	}
	if (subject.length <= 0) {
		tempErrors["subject"] = true;
		isValid = false;
	}
	if (message.length <= 0) {
		tempErrors["message"] = true;
		isValid = false;
	}

	return { isValid, tempErrors };
};
