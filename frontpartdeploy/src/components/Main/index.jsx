import styles from "./styles.module.css";
import axios from "axios";
import { useState } from "react";







const Main = () => {

	let noticeNumber;

	const getNoticeData = async () => {
		axios.get('http://localhost:8000/api/v1/noticeData')
		  .then(response => {noticeNumber = response.data.length
			console.log(noticeNumber)})
		  .catch(error => {console.log(error)})
	}

	getNoticeData();

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [data, setData] = useState({ title: "", message: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/api/v1/notice/add";
			const { data: res } = await axios.post(url, data);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>NoteX Studios || Pokhara-30</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit} >
						<h1>Provide A Notice</h1>
						<div className={styles.error_msg}>Total Notice:{noticeNumber}</div>
						<input
							type="text"
							placeholder="Title"
							name="title"
							onChange={handleChange}
							value={data.username}
							required
							className={styles.input}
						/>
						<br />
						<textarea
							placeholder="Message"
							name="message"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<br />
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Add Notice
						</button>
						<button type="button" onClick={getNoticeData} className={styles.green_btn}>
							Reload Notices
						</button>
					</form>
				</div>
				
			</div>
		</div>
	);
};

export default Main;
