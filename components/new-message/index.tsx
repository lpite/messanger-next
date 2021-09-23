import React from "react";

import { Message } from "../../types/message";
import axios from "axios";

let id = 0;
if (typeof window !== "undefined") {
  id = parseInt(localStorage.getItem("id"));
  if (id === 0) {
    localStorage.removeItem("id");
  }
}
import { API_URL } from "../../config";
import { useSelector } from "react-redux";

function NewMessage({ onFocusInput, onBlurInput }) {
  const input = React.useRef<HTMLInputElement>(null);
  const [text, setText] = React.useState("");
  //@ts-ignore
  const { name } = useSelector(({ user }) => user);

  function sendMessage() {
    if (text.trim()) {
      input.current?.focus();
      setText("");
      const message: Message = {
        author_id: id,
        author_name: name,
        time: new Date().toString(),
        text: input.current.value,
        id: "",
      };
      axios
        .post(`${API_URL}api/message/new`, message)
        .then(({ data }) => {})
        .catch(() => {});
    }
  }
  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }
  function onFocusInputCombine() {
    onFocusInput();
    window.onkeydown = (e: { keyCode: any }) => {
      if (e.keyCode === 13) {
        sendMessage();
      }
    };
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }
  return (
    <div className="black-container new-message">
      <input
        type="text"
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
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
