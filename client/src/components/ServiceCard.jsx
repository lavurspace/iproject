import { motion } from "framer-motion";
import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";

export default function ServiceCard({ icon: Icon, title, description, link }) {
	const [showModal, setShowModal] = useState(false);

	const handleClick = () => {
		if (link.startsWith("https://api.whatsapp.com")) {
			window.open(link, "_blank");
		} else {
			setShowModal(true);
		}
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				whileHover={{
					translateY: -15,
					rotateY: 10,
					boxShadow: "0 20px 40px rgba(255, 77, 77, 0.3)",
					cursor: "pointer",
				}}
				onClick={handleClick}
				className="feature-card neon-card"
				style={{
					background: "rgba(20, 20, 20, 0.95)",
					padding: "30px",
					borderRadius: "15px",
					border: "1px solid rgba(255, 255, 255, 0.1)",
					textAlign: "center",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<ComingSoonModal
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					title={title}
				/>
				<div>
					<div
						className="feature-icon"
						style={{
							fontSize: "2.5rem",
							color: "#ff4d4d",
							marginBottom: "20px",
						}}
					>
						<Icon />
					</div>
					<h3
						style={{
							color: "#ffffff",
							fontSize: "1.5rem",
							fontWeight: "700",
							marginBottom: "15px",
							textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
						}}
					>
						{title}
					</h3>
					<p
						style={{
							color: "#e0e0e0",
							fontSize: "1rem",
							lineHeight: "1.5",
							marginBottom: "20px",
						}}
					>
						{description}
					</p>
				</div>
				<motion.div
					className="feature-link neon-text"
					whileHover={{ scale: 1.05 }}
					style={{
						color: "#ff4d4d",
						fontWeight: "600",
						fontSize: "1.1rem",
						cursor: "pointer",
						display: "inline-block",
						textDecoration: "none",
					}}
				>
					Learn More
				</motion.div>
			</motion.div>
		</>
	);
}
