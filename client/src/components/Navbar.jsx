import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";
import { useContext, useEffect, useState } from "react";
import styles from "../css/Navbar.module.css";

const Navbar = () => {
	const { logout, whoami, user, loggedIn } = useContext(UserContext);

	const history = useHistory();

	useEffect(() => {
		whoami();
	}, []);

	const handleSubmit = async () => {
		let result = await logout();
		console.log(result);
		if (result.success) {
			history.push("/");
			console.log(user);
		}
	};
	console.log(loggedIn);
	return (
		<nav className={styles.navbar}>
			<NavLink className={styles.link} exact to="/">
				Aubameyang
			</NavLink>
			<NavLink className={styles.link} exact to="/about">
				About
			</NavLink>
			{loggedIn ? (
				<>
					<NavLink className={styles.link} exact to="/Profile">
						Profile
					</NavLink>
					<span onClick={handleSubmit} className={styles.link}>
						Logout
					</span>
				</>
			) : (
				<NavLink to="/login" className={styles.link}>
					Login
				</NavLink>
			)}
		</nav>
	);
};

export default Navbar;
