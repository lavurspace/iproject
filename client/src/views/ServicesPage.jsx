import { FaLaptop, FaMicrophone, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";

export default function ServicesPage({ baseUrl }) {
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
			<section className="features-section">
				<div className="container py-5">
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
		</div>
	);
}