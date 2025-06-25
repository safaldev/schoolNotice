import styles from "./styles.module.css";
import axios from "axios";
import { useState } from "react";


const Main = () => {

	let noticeNumber;
	const [noticeNum, setNoticeNum] = useState(0);

	const getNoticeData = async () => {
		axios.get('https://tribhuwan-admin.vercel.app/api/v1/noticeData')
		  .then(response => {noticeNumber = response.data.length
				     setNoticeNum(noticeNumber);
			console.log(noticeNumber , "Hello")})
		  .catch(error => {console.log(error)})
	}


	getNoticeData();
	

	const refreshPage = () => {
    		window.location.reload();
	} 

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
		window.alert("Notice is being added, wait patiently for few seconds");
		try {
			const url = "https://tribhuwan-admin.vercel.app/api/v1/notice/add";
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
		refreshPage();
		getNoticeData();
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
					<form id="noticeForm" className={styles.form_container} onSubmit={handleSubmit} >
						<h1>Provide A Notice</h1>
					
						<div className={styles.error_msg}>Total Notices:{noticeNum}</div>
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
						<div className={styles.error_msg}>Call NoteX Studios on problem</div>
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

		<div id="mainContainer"> </div>



		let mainContainer = document.getElementById("mainContainer")
		
		async function getData() {
		  let response = await fetch("https://tribhuwan-admin.vercel.app/api/v1/noticeData");
		  let data = await response.json();
		  console.log(data);
		  length = data.length;
		  for(let i=0; length > i ; length-- ){
		  let len = length - 1;
		  let noticeDiv = document.createElement('div')
		  let title = document.createElement('h2')
		  let message = document.createElement('p')
		  let date = document.createElement('span')
		  title.textContent =  data[len]['title']
		  message.innerHTML =  data[len]['message']
		  date.textContent = `Published On: ${data[len]['createdAt'].split(":")[0].split('T')[0]}`
		  noticeDiv.appendChild(title)
		  noticeDiv.appendChild(message)
		  noticeDiv.appendChild(date)
		  mainContainer.appendChild(noticeDiv)
		  noticeDiv.classList.add('notice')
		  }
		
		}
		
		getData()
	);
};

export default Main;
