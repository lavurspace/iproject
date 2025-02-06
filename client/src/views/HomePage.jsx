import { useState, useEffect } from "react";
import axios from "axios";
import { FaLaptop, FaMicrophone, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ServiceCard from "../components/ServiceCard";
import Card from "../components/Card";
import GeminiCard from "../components/GeminiCard";

export default function HomePage({ baseUrl }) {
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

	const services = [
		{
			icon: FaLaptop,
			title: "Room Layout Design",
			description: "Expert acoustic treatment and optimization",
			link: `${baseUrl}#room-layout`,
		},
		{
			icon: FaMicrophone,
			title: "Equipment Selection",
			description: "Personalized gear recommendations",
			link: `${baseUrl}/#products`,
		},
		{
			icon: FaPhone,
			title: "Expert Consultation",
			description: "One-on-one professional guidance",
			link: "https://api.whatsapp.com/send?phone=6281225244975&text=Hallo%20Home%20Rec%20di%20sini%2C%20Ada%20yang%20bisa%20dibantu%3F",
		},
	];

	return (
		<div className="app d-flex flex-column min-vh-100">
			<HeroSection />

			<GeminiCard baseUrl={baseUrl} />

			{/* Services Section */}
			<section className="features-section">
				<div className="container">
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="section-title text-center neon-text mb-5"
					>
						Our <span className="gradient-text">Services</span>
					</motion.h2>
					<div className="row">
						{services.map((service, index) => (
							<div key={index} className="col-md-4">
								<ServiceCard {...service} />
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Products Section */}
			<section className="products-section" id="products">
				<div className="container">
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
