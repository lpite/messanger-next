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
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/actions/messages";

function NewMessage({ onFocusInput, onBlurInput }) {
  const input = React.useRef<HTMLTextAreaElement>(null);
  const [text, setText] = React.useState("");
  //@ts-ignore
  const { name } = useSelector(({ user }) => user);
  //@ts-ignore
  const dispatch = useDispatch();
  const localId = (Math.random() * 10000).toFixed();
  function sendMessage() {
    if (text.trim()) {
      input.current?.focus();
      setHeight("22px");
      setText("");
      // input.current.setSelectionRange(0, 0);

      dispatch(
        addMessage({
          author_id: id,
          author_name: name,
          text: input.current.value,
          local_id: localId,
          status: 0,
          time: new Date().toString().slice(0, 24),
        })
      );
      input.current.setSelectionRange(0, 0);

      axios
        .post(`${API_URL}api/message/new`, {
          author_id: id,
          author_name: name,
          text: input.current.value,
          local_id: localId,
        })
        .then(({ data }) => {
          dispatch({ type: "UPDATE_MESSAGE", payload: data });
        })
        .catch(() => {});
    }
  }
  const [height, setHeight] = React.useState("22px");
  const [body, setBody]  = React.useState("22px");

  function onChangeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (input.current.scrollHeight < 132 && input.current.scrollHeight > 30) {
      setHeight(Math.ceil(input.current.scrollHeight / 22) * 16 + "px");
    }
    if (!e.target.value) {
      setHeight("22px");
    }
    if (input.current.selectionStart <= 28) {
      // setHeight("22px");
    }
    setText(e.target.value);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!navigator.userAgent.toLowerCase().includes("mobile")) {
      if (e.key === "Enter" && !e.shiftKey) {
        sendMessage();
        e.preventDefault();
        input.current.setSelectionRange(0, 0);
      }
    }
  }
  return (
    <div className="black-container new-message">
      <textarea
        // type="text"
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
        value={text}
        ref={input}
        placeholder="message..."
        style={{ height: height }}
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
