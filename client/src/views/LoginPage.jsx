import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import { FaEnvelope, FaExpandArrowsAlt, FaLock } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage({ baseUrl }) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await axios.post(`${baseUrl}/login`, formData);
			localStorage.setItem("token", response.data.token);
			navigate("/");
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred during login");
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogin = async (codeResponse) => {
		try {
			console.log(codeResponse, "coderesponse");

			const response = await axios.post(`${baseUrl}/google-login`, null, {
				headers: { token: codeResponse.credential },
			});
			console.log(response.data);

			localStorage.setItem("token", response.data.accessToken);
			navigate("/");
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred during login");
		}
	};

	return (
		<div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark">
			<div className="row justify-content-center w-100">
				<div className="col-12 col-md-6 col-lg-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="card neon-card bg-dark text-white border-0 shadow-lg"
						style={{
							borderRadius: "12px",
							padding: "2rem",
							boxShadow: "0px 0px 15px rgba(255, 77, 77, 0.3)",
						}}
					>
						<div className="card-body p-4">
							<h2 className="text-center mb-4 gradient-text fw-bold">
								Welcome Back
							</h2>

							{error && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="alert alert-danger text-center"
									role="alert"
								>
									{error}
								</motion.div>
							)}

							<form onSubmit={handleSubmit}>
								<div className="mb-4">
									<label className="form-label fw-semibold">Email</label>
									<div className="input-group">
										<span className="input-group-text bg-dark border-secondary">
											<FaEnvelope className="text-secondary" />
										</span>
										<input
											type="email"
											className="form-control bg-dark text-white border-secondary"
											name="email"
											value={formData.email}
											onChange={handleChange}
											placeholder="Enter your email"
											required
											style={{ borderRadius: "8px" }}
										/>
									</div>
								</div>

								<div className="mb-4">
									<label className="form-label fw-semibold">Password</label>
									<div className="input-group">
										<span className="input-group-text bg-dark border-secondary">
											<FaLock className="text-secondary" />
										</span>
										<input
											type="password"
											className="form-control bg-dark text-white border-secondary"
											name="password"
											value={formData.password}
											onChange={handleChange}
											placeholder="Enter your password"
											required
											style={{ borderRadius: "8px" }}
										/>
									</div>
								</div>

								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									type="submit"
									disabled={loading}
									className="btn neon-button w-100 fw-bold py-2"
									style={{
										borderRadius: "8px",
										fontSize: "1rem",
									}}
								>
									{loading ? (
										<div
											className="spinner-border spinner-border-sm"
											role="status"
										>
											<span className="visually-hidden">Loading...</span>
										</div>
									) : (
										"Login"
									)}
								</motion.button>
							</form>

							<div className="text-center mt-4">
								<GoogleLogin
									onSuccess={handleGoogleLogin}
									onError={console.error}
								/>
							</div>

							<p className="text-center mt-3">
								<small className="text-secondary">
									Don't have an account?{" "}
									<a href="/register" className="text-light fw-bold">
										Sign up
									</a>
								</small>
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
