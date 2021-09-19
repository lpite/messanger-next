import React from "react";

import { Message } from "../../types/message";
import axios from "axios";

let id = "";
if (typeof window !== "undefined") {
  id = localStorage.getItem("id");
}

function NewMessage({ onFocusInput, onBlurInput }) {
  const input = React.useRef<HTMLInputElement>(null);
  const [text, setText] = React.useState("");

  function sendMessage(e: React.MouseEvent<HTMLButtonElement>) {
    if (text.trim()) {
      input.current?.focus();
      setText("");
      const message: Message = {
        author: id,
        time: new Date().toString(),
        text: input.current.value,
        id: "",
      };
      axios
        .post("http://46.63.31.3:3002/api/message/new", message)
        .then(({ data }) => {})
        .catch(() => {});
    }
  }
  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }
  return (
    <div className="black-container new-message">
      <input
        type="text"
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        onChange={onChangeInput}
        value={text}
        ref={input}
        placeholder="message..."
      />
      <button onClick={sendMessage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>
    </div>
  );
}

export default NewMessage;
