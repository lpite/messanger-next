import React from "react";

import axios from "axios";
import styles from "./NewMessage.module.scss";

let id = 0;
if (typeof window !== "undefined") {
  id = parseInt(localStorage.getItem("id"));
  if (id === 0) {
    localStorage.removeItem("id");
  }
}
import { API_URL } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppState } from "../../redux/store";
import { addMessage, updateMessage } from "../../redux/reducers/messages";

function NewMessage({ onFocusInput, onBlurInput }) {
  const input = React.useRef<HTMLTextAreaElement>(null);
  const [text, setText] = React.useState("");
  const { name } = useSelector(({ me }: AppState) => me);
  const dispatch = useDispatch();
  const router = useRouter();

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
          to: router.query.id.toString(),
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
          to: router.query.id,
          local_id: localId,
        })
        .then(({ data }) => {
          dispatch(updateMessage(data));
        })
        .catch(() => {});
    }
  }
  const [height, setHeight] = React.useState("22px");
  const [body, setBody] = React.useState("22px");

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
  const [image, setImage] = React.useState<File>();
  async function onReadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files[0];
    setImage(file);
  }
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    let formData = new FormData();
    if (image) {
      formData.append("image", image);
      formData.append("to", router.query.id.toString());
      formData.append("author_id", id.toString());
      formData.append("author_name", name);
      formData.append("local_id", localId);

      setImage(null);
      dispatch(
        addMessage({
          author_id: id,
          author_name: name,
          text: "",
          image: "",
          to: router.query.id.toString(),
          local_id: localId,
          status: 0,
          time: new Date().toString().slice(0, 24),
        })
      );
      axios
        .post(`${API_URL}api/message/new/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          dispatch(updateMessage(data));
        });
    }
  }
  return (
    <form className="black-container new-message" onSubmit={onSubmit}>
      <label className={styles.fileLabel}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
        </svg>
        <input
          type="file"
          className={styles.fileInput}
          onChange={onReadFile}
          accept="image/*"
        />
      </label>
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
          width="30"
          height="30"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>
    </form>
  );
}

export default NewMessage;
