import { motion } from "framer-motion";

export default function ComingSoonModal({ isOpen, onClose, title }) {
	if (!isOpen) return null;

	return (
		<div
			className="modal show d-block"
			style={{
				backgroundColor: "rgba(0,0,0,0.5)",
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: 1050,
			}}
			onClick={onClose}
		>
			<div
				className="modal-dialog modal-dialog-centered"
				onClick={(e) => e.stopPropagation()}
			>
				<motion.div
					className="modal-content bg-dark text-white"
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<div className="modal-header border-secondary">
						<h5 className="modal-title gradient-text">{title}</h5>
						<button
							type="button"
							className="btn-close btn-close-white"
							onClick={onClose}
						></button>
					</div>
					<div className="modal-body">
						<p className="text-center mb-0">Coming Soon! 🚀</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
