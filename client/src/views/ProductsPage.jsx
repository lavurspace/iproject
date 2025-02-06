import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Card from "../components/Card";

export default function ProductsPage({ baseUrl }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/products`);

			setProducts(response.data.products);
			setError(null);
		} catch (err) {
			setError(err.message);
			console.error("Error fetching products:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="app d-flex flex-column min-vh-100">
			<section className="products-section" id="products">
				<div className="container py-5">
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="section-title text-center neon-text mb-5"
					>
						Our <span className="gradient-text">Products</span>
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
						{products.map((product) => (
							<div key={product.id} className="col-md-4 mb-4">
								<Card product={product} baseUrl={baseUrl} />
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
