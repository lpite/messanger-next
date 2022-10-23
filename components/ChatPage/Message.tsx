import { useProfilePageStore } from "../../store/profilePageStore";

import styles from "./Message.module.scss";

interface MessageProps {
  ownerId: string;
  ownerLogin: string;
  ownerName: string;
  text: string;
  time: string;
  status: string;
}

export default function Message({
  ownerId,
  ownerLogin,
  ownerName,
  text,
  time,
  status,
}: MessageProps) {

  const {
    id,
    login,
  } = useProfilePageStore(store => store)

  return (
    <div
      className={ownerId === id ? styles["message_line--own"] : styles["message_line"]}
    >
      {ownerId === id ? null :
        <img className={styles.owner_photo} src="/cat.jpg" alt="" />
      }
      <div className={styles.message}>
        {ownerId === id ? null :
          <span className={styles.message_owner_name}>{ownerName}</span>
        }
        <span className={styles.message_text}>{text}</span>
        <div className={styles.message_details}>
          <span className={styles.message_time} suppressHydrationWarning>{(new Date(parseInt(time))).toLocaleTimeString()}</span>
          {ownerId === id ? (
            <img src="/messageStatus.svg" className={styles.message_status} alt="" />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
