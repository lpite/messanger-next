import { useProfilePageStore } from "../../store/profilePageStore";
import styles from "./index.module.scss";

export default function ProfilePage() {
  const { isOpen, closeProfilePage } = useProfilePageStore((store) => store);
  return (
    <div
      className={isOpen ? styles["profile_page--open"] : styles.profile_page}
    >
      <div className={styles.header}>
        <button onClick={closeProfilePage} className="link_button header_button">Chats</button>
      </div>
      <img src="/cat.jpg" alt="" className={styles.user_photo} />
      <span className={styles.user_name}>Lpite</span>
      <div className={styles.user_details}>
        <div className={styles.details_line}>
          <span className={styles.field_name}>Email</span>
          <span className={styles.field_data}>
            lslkxksoslxlkxkxkx@gmail.com
          </span>
        </div>
        <hr />
        <div className={styles.details_line}>
          <span className={styles.field_name}>Login</span>
          <span className={styles.field_data}>lpite</span>
        </div>
        <hr />
        <div className={styles.details_line}>
          <span className={styles.field_name}>Display name</span>
          <span className={styles.field_data}>lpite</span>
        </div>
      </div>
      <div className={styles.user_details}>
        <div className={styles.details_line}>
          <button className="link_button">Change data</button>
        </div>
        <hr />
        <div className={styles.details_line}>
          <button className="link_button">Change password</button>
        </div>
        <hr />
        <div className={styles.details_line}>
          <button className="link_button" style={{ color: "#F44D4D" }}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
