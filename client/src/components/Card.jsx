import { motion } from "framer-motion";
import { FaStar, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Card({ product, baseUrl }) {
	const { id, name, description, rating, stock, price, image } = product;
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleAddToWishlist = async () => {
		if (!localStorage.getItem("token")) {
			navigate("/login"); // Redirect to login if no token
			return;
		}
		setIsLoading(true);
		setError(null);
		try {
			await axios.post(
				`${baseUrl}/wishlists`,
				{ productId: id },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			navigate("/wishlists");
		} catch (err) {
			setError(err.response?.data?.message || "Failed to add to wishlist");
		} finally {
			setIsLoading(false);
		}
	};

	const handleClick = () => {
		navigate(`/products/${id}`);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			whileHover={{
				translateY: -10,
				boxShadow: "0 20px 40px rgba(255, 77, 77, 0.3)",
			}}
			className="product-card neon-card"
			onClick={handleClick}
			style={{
				cursor: "pointer",
				background: "rgba(255, 255, 255, 0.1)",
				backdropFilter: "blur(10px)",
				padding: "20px",
				borderRadius: "15px",
				margin: "15px",
				border: "1px solid rgba(255, 255, 255, 0.2)",
			}}
		>
			<div className="product-image">
				<img
					src={image}
					alt={name}
					className="img-fluid rounded mb-3"
					style={{
						width: "100%",
						height: "300px",
						objectFit: "cover",
						borderRadius: "10px",
					}}
				/>
			</div>
			<div className="product-details" style={{ padding: "10px" }}>
				<h3
					className="product-title"
					style={{
						fontSize: "1.5rem",
						fontWeight: "bold",
						color: "#fff",
						marginBottom: "10px",
						textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
					}}
				>
					{name}
				</h3>
				<p
					className="product-description"
					style={{
						fontSize: "0.9rem",
						color: "#ccc",
						marginBottom: "15px",
						lineHeight: "1.4",
					}}
				>
					{description}
				</p>
				<div
					className="product-info"
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "15px",
					}}
				>
					<div
						className="product-rating"
						style={{
							display: "flex",
							alignItems: "center",
							gap: "5px",
							color: "#ffd700",
						}}
					>
						<FaStar className="star-icon" />
						<span>{rating?.toFixed(1)}</span>
					</div>
					<div className="product-stock" style={{ color: "#aaa" }}>
						Stock: {stock}
					</div>
				</div>
				<div
					className="product-price gradient-text"
					style={{
						fontSize: "1.3rem",
						fontWeight: "bold",
						marginBottom: "15px",
						background: "linear-gradient(45deg, #ff4d4d, #ff8080)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
					}}
				>
					Rp {price?.toLocaleString("id-ID")}
				</div>
				{error && (
					<p className="text-danger small" style={{ marginBottom: "10px" }}>
						{error}
					</p>
				)}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="wishlist-button neon-button-danger w-100"
					onClick={(e) => {
						e.stopPropagation();
						handleAddToWishlist();
					}}
					disabled={isLoading}
					style={{
						background: "linear-gradient(45deg, #ff4d4d, #ff8080)",
						border: "none",
						padding: "10px",
						borderRadius: "8px",
						color: "white",
						fontWeight: "bold",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "8px",
					}}
				>
					<FaHeart className="heart-icon" />
					{isLoading ? "Adding..." : "Add to Wishlist"}
				</motion.button>
			</div>
		</motion.div>
	);
}
