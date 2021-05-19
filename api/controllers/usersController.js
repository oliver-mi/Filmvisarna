const User = require("../models/User");
const bcrypt = require("bcrypt");

const whoami = (req, res) => {
	return res.json(req.session.user || null);
};

const logout = (req, res) => {
	if (req.session.user) {
		delete req.session.user;
		return res.json({ message: "Logout successfull" });
	}

	return res.json({ error: "Already logged out" });
};

const login = async (req, res) => {
	let userExists = await User.exists({ email: req.body.email });
	if (userExists) {
		let user = await User.findOne({ email: req.body.email }).exec();
		if (user.password === req.body.password) {
			req.session.user = user;
			req.session.user.password = undefined;
			user.password = undefined;
			return res.json({ message: "Login successfull", loggedInUser: user });
		}
	}
	return res.status(401).json({ error: "Bad credentials" });
};

async function createUser(req, res) {
	// create a user with Mongoose
	let userExists = await User.exists({ email: req.body.email });
	if (userExists) {
		return res
			.status(400)
			.json({ error: "An user with that email already exists" });
	}

	let user = await User.create(req.body);
	user.password = undefined;
	return res.json(user);
}

module.exports = {
	createUser,
	whoami,
	login,
	logout,
};
