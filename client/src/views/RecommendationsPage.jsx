import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Card from "../components/Card";

export default function RecommendationsPage({ baseUrl }) {
	const [recommendations, setRecommendations] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchRecommendations();
	}, []);

	const fetchRecommendations = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/products/gemini`);
			setRecommendations(response.data.recommendations);
			setError(null);
		} catch (err) {
			setError(err.message);
			console.error("Error fetching recommendations:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="app d-flex flex-column min-vh-100">
			<section className="recommendations-section">
				<div className="container py-5">
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="section-title text-center neon-text mb-5"
					>
						Our <span className="gradient-text">Recommendations</span>
					</motion.h2>

					{loading && (
						<div className="text-center">
							<div className="spinner-border text-light" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					)}

					{error && (
						<div className="alert alert-danger" role="alert">
							{error}
						</div>
					)}

					<div className="row">
						{recommendations.map((product, index) => (
							<div key={index} className="col-md-4 mb-4">
								<Card product={product} baseUrl={baseUrl} />
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}