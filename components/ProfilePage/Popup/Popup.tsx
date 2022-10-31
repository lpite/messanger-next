import React from "react";
import { useSwipeable } from "react-swipeable";
import { useProfilePageStore } from "../../../store/profilePageStore";
import styles from "./Popup.module.scss"


interface PopupProps {
	editData: boolean,
	disableEditing: () => void,
	saveData: () => void
}

const photos = ["/cat.jpg", "/cat2.jpg", "/cat3.jpg", "/cat4.jpg", "/cat5.jpg", "/cat6.jpg"]


export default function Popup({ editData, disableEditing, saveData }: PopupProps) {

	const { displayName, login, photo } =
		useProfilePageStore((store) => store);

	const [selectedPhoto, setSelectedPhoto] = React.useState(photo || photos[0]);

	const handlersForPopUp = useSwipeable({
		onSwipedDown: () => {
			disableEditing();
		},
	});

	return (
		<div className={editData ? styles["profile_page__popup--open"] : styles["profile_page__popup"]} {...handlersForPopUp}>
			<button className={styles["popup__close_button"]} onClick={disableEditing}></button>
			<div className={styles["popup_body"]}>
				<div className={styles["popup_top"]}>
					<span className={styles["popup_top__line"]}></span>
					<button className={styles["popup_top__close_button"]} onClick={disableEditing}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
						</svg>
					</button>
				</div>
				<div className={styles["popup__photo_slider"]}>
					{photos.map((photo) => (
						<img 
							key={photo} 
							src={photo} 
							alt="" 
							className={selectedPhoto === photo ? styles["photo--selected"] : styles["photo"]} 
							onClick={() => setSelectedPhoto(photo)}
						/>
					))}
				</div>	
				<input type="text" placeholder="Login" disabled defaultValue={login} className={styles["input"]} />
				<input type="text" placeholder="Display name" defaultValue={displayName} className={styles["input"]} />

				<button className="button big_button" onClick={saveData}>
					Save
				</button>
			</div>
			
		</div>
		
	)
}