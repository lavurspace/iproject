const { OAuth2Client } = require("google-auth-library");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const cloudinary = require("../middlewares/cloudinary");

class UserController {
	static async register(req, res, next) {
		try {
			const { name, email, password, imgUrl } = req.body;
			const user = await User.create({
				name,
				email,
				password,
				imgUrl,
			});

			res.status(201).json({
				message: "Success added new account",
				user,
			});
		} catch (err) {
			console.log(err);

			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;

			if (!email || !password) throw { name: "LoginError" };

			const user = await User.findOne({
				where: { email },
			});

			if (!user) throw { name: "LoginError" };

			if (!comparePassword(password, user.password))
				throw { name: "LoginError" };

			const payload = {
				userId: user.id,
				name: user.name,
				email: user.email,
			};

			const token = signToken(payload);

			res.status(200).json({
				message: "Login successful",
				token,
			});
		} catch (err) {
			console.log(err);

			next(err);
		}
	}

	static async getProfile(req, res, next) {
		try {
			const { userId } = req.loginInfo;

			if (!userId) throw { name: "Unauthorized" };

			const user = await User.findByPk(userId);

			if (!user) throw { name: "Unauthorized" };

			res.status(200).json({
				user,
			});
		} catch (err) {}
	}

	static async googleLogin(req, res, next) {
		try {
			const { token } = req.headers;

			const client = new OAuth2Client();
			const ticket = await client.verifyIdToken({
				idToken: token,
			});

			const gPayload = ticket.getPayload();

			const [user, created] = await User.findOrCreate({
				where: { email: gPayload.email },
				defaults: {
					name: gPayload.name,
					email: gPayload.email,
					password: "google",
					imgUrl: "default",
				},
				hooks: false,
			});

			const payload = {
				userId: user.id,
				name: user.name,
				email: user.email,
			};

			const accessToken = signToken(payload);

			res.status(200).json({
				message: "Login successful",
				accessToken,
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateProfile(req, res, next) {
		try {
			const { userId } = req.loginInfo;

			if (!userId) throw { name: "Unauthorized" };

			const user = await User.findByPk(userId);

			if (!user) throw { name: "Unauthorized" };

			const image = req.file.buffer.toString("base64");

			const base64Image = `data:${req.file.mimetype};base64,${image}`;

			const upload = await cloudinary.uploader.upload(base64Image, {
				public_id: `user_${userId}_profile`,
				tags: ["profile"],
			});

			await User.update(
				{
					imgUrl: upload.secure_url,
				},
				{
					where: {
						id: userId,
					},
				}
			);

			res.status(201).json({
				message: "Profile updated",
				imgUrl: upload.secure_url,
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = UserController;
