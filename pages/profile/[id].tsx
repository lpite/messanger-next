import React from "react";

import styles from "./Styles.module.css";
import { useSwipeable } from "react-swipeable";
import router from "next/router";
import Link from "next/link";

function SwipeableMain() {
  const handlers = useSwipeable({
    onSwipedRight: () => {
      router.back();
    },
  });

  return (
    <main {...handlers} className={styles.main}>
      <div className={styles.top}>
        <div className={styles.top_image_with_link}>
          <button className="header-button" onClick={() => router.back()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 14"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </button>

          <img src="/cat.jpg" alt="" className={styles.top_image} />
        </div>
        <span className={styles.top_name}>Name</span>
      </div>
      <div className={styles.info_block}>
        <div className={styles.info_block_line}></div>
        <div className={styles.info_block_line}></div>
        <div className={styles.info_block_line}></div>
      </div>
      <div className={styles.bottom_block}></div>
    </main>
  );
}

function Profile() {
  return (
    <div className="container">
      <SwipeableMain />
    </div>
  );
}

export default Profile;
