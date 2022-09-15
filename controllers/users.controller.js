const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');

dotenv.config({ path: './config.env' });

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: { exclude: ['password'] },
			where: { status: 'active' },
			include: [
				{
					model: Post,
					include: {
						model: Comment,
						include: { model: User },
					},
				},
				{
					model: Comment,
				},
			],
		});

		res.status(200).json({
			status: 'success',
			data: {
				users,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		if (role !== 'admin' && role !== 'normal') {
			return res.status(400).json({
				status: 'error',
				message: 'Invalid role',
			});
		}

		// Encrypt the password
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
		});

		// Remove password from response
		newUser.password = undefined;

		// 201 -> Success and a resource has been created
		res.status(201).json({
			status: 'success',
			data: { newUser },
		});
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async (req, res) => {
	try {
		const { name } = req.body;
		const { user } = req;

		// Method 1: Update by using the model
		// await User.update({ name }, { where: { id } });

		// Method 2: Update using a model's instance
		await user.update({ name });

		res.status(200).json({
			status: 'success',
			data: { user },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { user } = req;

		// Method 1: Delete by using the model
		// User.destroy({ where: { id } })

		// Method 2: Delete by using the model's instance
		// await user.destroy();

		// Method 3: Soft delete
		await user.update({ status: 'deleted' });

		res.status(204).json({ status: 'success' });
	} catch (error) {
		console.log(error);
	}
};

const login = async (req, res) => {
	try {
		// Get email and password from req.body
		const { email, password } = req.body;

		// Validate if the user exist with given email
		const user = await User.findOne({
			where: { email, status: 'active' },
		});

		// Compare passwords (entered password vs db password)
		// If user doesn't exists or passwords doesn't match, send error
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({
				status: 'error',
				message: 'Wrong credentials',
			});
		}

		// Remove password from response
		user.password = undefined;

		// Generate JWT (payload, secretOrPrivateKey, options)
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '30d',
		});

		res.status(200).json({
			status: 'success',
			data: { user, token },
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	login,
};
