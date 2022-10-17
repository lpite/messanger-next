import React from "react";
import { useSwipeable } from "react-swipeable";
import { useProfilePageStore } from "../../store/profilePageStore";
import { useSignInPageStore } from "../../store/signInPageStore";
import styles from "./ProfilePage.module.scss";

export default function ProfilePage() {

  const { isOpen, closeProfilePage,id, displayName, login, setUser } =
    useProfilePageStore((store) => store);
  const { openSignInPage } = useSignInPageStore(store => store)

  const [editData, setEditData] = React.useState(false);

  const handlers = useSwipeable({
    onSwipedRight: () => {
      //close profile on right swipe
      closeProfilePage();
    },
  });
  if (!login.length) {
    return null;
  }
  function enableEditing() {
    setEditData(true);
  }

  function saveData() {
    setEditData(false);
  }

  function logOut() {
    setUser({id:"", displayName: "", login: "" });
    closeProfilePage();
    openSignInPage();
  }

 

  return (
    <div
      className={isOpen ? styles["profile_page--open"] : styles.profile_page}
      {...handlers}
    >
      <div className={styles.header}>
        <button
          onClick={closeProfilePage}
          className="link_button header_button"
        >
          Chats
        </button>
      </div>
      <img src="/cat.jpg" alt="" className={styles.user_photo} />
      <span className={styles.user_name}>{displayName}</span>

      <div className={styles.user_details}>
        <div className={styles.details_line}>
          <span className={styles.field_name}>User ID</span>
          <span className={styles.field_data}>
            {id}
          </span>
        </div>
        <hr />
        <div className={styles.details_line}>
          <span className={styles.field_name}>Login</span>
          <span className={styles.field_data}>
            {login}
          </span>
        </div>
        <hr />
        <div className={styles.details_line}>
          <span className={styles.field_name}>Display name</span>
          <span className={styles.field_data}>{displayName}</span>
        </div>
      </div>
      {editData ? (
        <button className="button big_button" onClick={saveData}>
          Save
        </button>
      ) : (
        <div className={styles.user_details}>
          <div className={styles.details_line}>
            <button className="link_button" onClick={enableEditing}>
              Change data
            </button>
          </div>
          <hr />
          <div className={styles.details_line}>
            <button className="link_button">Change password</button>
          </div>
          <hr />
          <div className={styles.details_line}>
            <button onClick={logOut} className="link_button" style={{ color: "#F44D4D" }}>
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
