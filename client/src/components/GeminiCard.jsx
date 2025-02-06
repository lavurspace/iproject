import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { motion } from "framer-motion";

export default function GeminiCard({ baseUrl }) {
	const [recommendations, setRecommendations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchRecommendations();
	}, []);

	const fetchRecommendations = async () => {
		try {
			const response = await axios.get(`${baseUrl}/products/gemini`);
			setRecommendations(response.data.recommendations.slice(0, 3));
			setError(null);
		} catch (err) {
			setError(
				err.response?.data?.message || "Failed to fetch recommendations"
			);
			console.error("Error fetching recommendations:", err);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="text-center">
				<div className="spinner-border text-light" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="alert alert-danger text-center" role="alert">
				Wait a Second, Something went wrong
			</div>
		);
	}

	return (
		<section className="products-section">
			<div className="container">
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="section-title text-center neon-text mb-5"
				>
					Our <span className="gradient-text">Recommendations</span>
				</motion.h2>
				<div className="row">
					{recommendations.map((product) => (
						<div key={product.id} className="col-md-4 mb-4">
							<Card product={product} baseUrl={baseUrl} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
