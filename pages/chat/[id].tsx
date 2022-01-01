import type { NextPage } from "next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import router, { useRouter } from "next/router";
import { Message } from "../../types/message";
import MessageBlock from "../../components/message";
import NewMessage from "../../components/new-message";
import Header from "../../components/header";
import { AppState } from "../../redux/store";

function SwipeableMain() {
  const ref = React.useRef(null);
  const { messages } = useSelector(({ messages }: AppState) => messages);

  const { name, id } = useSelector(({ me }: AppState) => me);

  const router = useRouter();

  const handlers = useSwipeable({
    onSwipedRight: () => {
      router.push("/");
    },
  });
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight });
    }
  }, [messages]);
  React.useEffect(() => {
    console.log(ref.current.scrollHeight);
    ref.current.scrollTo({ top: ref.current.scrollHeight });
  }, [ref.current?.scrollHeight]);
  const refPassthrough = (el: any) => {
    // call useSwipeables ref prop with el
    handlers.ref(el);
    // set the el to a ref you can access yourself
    ref.current = el;
  };
  const list = messages
    .filter(
      (el: Message) =>
        el.author_id.toString() === router.query.id ||
        el.to.toString() === router.query.id
    )
    .sort()
    // .filter((el) => el.author_id === id && el.to.toString() === router.query.id)
    .map((el: Message) => (
      <MessageBlock
        key={!el.id ? el.local_id : el.id}
        author_name={el.author_name}
        author_id={el.author_id}
        text={el.text}
        image={el.image}
        to={el.to}
        time={el.time}
        id={el.id}
        status={el.status}
      />
    ));

  return (
    <main {...handlers} ref={refPassthrough} className="messages-page">
      <div className="messages">{list}</div>
    </main>
  );
}

const Home: NextPage = () => {
  const [top, settop] = React.useState(3);
  const { users } = useSelector(({ users }: AppState) => users);

  function onFocusInput(e: React.FocusEvent<HTMLInputElement>) {
    if (navigator.userAgent.includes("iPhone")) {
      if (Number(localStorage.getItem("height"))) {
        settop(window.innerHeight - Number(localStorage.getItem("height")) + 5);
      }
    }
  }
  function onBlurInput() {
    if (navigator.userAgent.includes("iPhone")) {
      settop(3);
      localStorage.setItem("height", window.innerHeight.toString());
    }
  }

  return (
    <div className="container">
      <Header
        top={top}
        name={users.find((el) => el.id.toString() === router.query.id)?.name}
      />
      <SwipeableMain />
      <NewMessage onBlurInput={onBlurInput} onFocusInput={onFocusInput} />
    </div>
  );
};

export default Home;
