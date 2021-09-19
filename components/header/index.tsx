import React from "react";
import Link from "next/link";

function Header({ top }) {
  return (
    <header className="header black-container" style={{ top: `${top}px` }}>
      <Link href="/">
        <a className="header-button">
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
        </a>
      </Link>
      <span className="header-text">Name</span>
      <img src="" alt="" className="header-image" />
    </header>
  );
}

export default Header;
