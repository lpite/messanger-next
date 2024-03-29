import React from "react"
import { IMessage } from "..";
import { useChatPageStore } from "../../../store/chatPageStore";
import { useProfilePageStore } from "../../../store/profilePageStore";

import styles from "./NewMessageForm.module.scss"
export default function NewMessageForm() {
	const [messageText, setMessageText] = React.useState("");
	const {
		id,
		displayName,
		login,
		photo
	} = useProfilePageStore(store => store)

	const {
		messages,
		setMessages
	} = useChatPageStore(store => store)

	function sendMessage(e: React.FormEvent) {
		e.preventDefault();
		if (messageText.length) {
			setMessageText("");
			input.current?.focus();
			setMessages([...messages,{
				owner_id:id,
				owner_login:login,
				owner_name:displayName,
				owner_photo:photo,
				text:messageText,
				time:Number(new Date()).toString()
			}])
			fetch("/api/sendMessage", {
				method: "POST",
				body: JSON.stringify({ chatId: 1, text: messageText })
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

	const input = React.useRef<HTMLInputElement>(null);

	return (
		<form onSubmit={sendMessage} action="" className={styles["new_message"]} >
			<input onChange={onTextChange} value={messageText} type="text" ref={input} className={styles["new_message__input"]} />
			<button className={styles["new_message__button"]}>send</button>
		</form>
	)
}