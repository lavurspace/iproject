import { motion } from "framer-motion";

export default function RootLayout({ children }) {
	return (
		<div className="app-container">
			{/* Navbar */}
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container">
					<a className="navbar-brand gradient-text" href="/">
						Home Rec
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item">
								<a className="nav-link" href="/">
									Home
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/services">
									Services
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/products">
									Products
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/recommendations">
									Recommendations
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main>
				{children}
