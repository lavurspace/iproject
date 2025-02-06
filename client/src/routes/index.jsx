import { createBrowserRouter, redirect } from "react-router";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import ProfilePage from "../views/ProfilePage";
import RegisterPage from "../views/RegisterPage";
import WishlistPage from "../views/WishlistPage";
import BaseLayout from "../views/BaseLayout";
import DetailProductPage from "../views/DetailProductPage";

const baseUrl = "http://localhost:3005";
// const baseUrl = "https://iproject.lavurspace.shop"

const router = createBrowserRouter([
	{
		path: "/register",
		element: <RegisterPage baseUrl={baseUrl} />,
	},
	{
		path: "/login",
		element: <LoginPage baseUrl={baseUrl} />,
		loader: () => {
			if (localStorage.token) {
				return redirect("/");
			}
			return null;
		},
	},
	{
		element: <BaseLayout />,
		children: [
			{
				path: "/",
				element: <HomePage baseUrl={baseUrl} />,
			},
			{
				path: "/products/:id",
				element: <DetailProductPage baseUrl={baseUrl} />,
			},
		],
	},
	{
		element: <BaseLayout />,
		loader: () => {
			if (!localStorage.token) {
				return redirect("/login");
			}
			return null;
		},
		children: [
			{
				path: "/profile",
				element: <ProfilePage baseUrl={baseUrl} />,
			},
			{
				path: "/wishlists",
				element: <WishlistPage baseUrl={baseUrl} />,
			},
		],
	},
]);

export default router;
