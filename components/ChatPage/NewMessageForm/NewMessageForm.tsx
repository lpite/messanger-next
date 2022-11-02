import React from "react"

import styles from "./NewMessageForm.module.scss"

export default function NewMessageForm() {
	const [messageText, setMessageText] = React.useState("");

	function sendMessage(e: React.FormEvent) {
		e.preventDefault();
		if (messageText.length) {
			setMessageText("");
			fetch("/api/sendMessage", {
				method: "POST",
				body: JSON.stringify({ chatId: "1", text: messageText })
			}).then(res => res.json())
				.then(({ status }) => {
					if (status !== "success") {
						alert("smth wrong");
					}
				}).catch(() => {
					alert("smth wrong")
				})
		}
		
	}

	function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
		setMessageText(e.target.value)
	}

	return (
		<form onSubmit={sendMessage} action="" className={styles["new_message"]} >
			<input onChange={onTextChange} value={messageText} type="text" className={styles["new_message__input"]} />
			<button className={styles["new_message__button"]}>send</button>
		</form>
	)
}