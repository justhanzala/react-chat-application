import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import firebase from "./firebase";
import Counters from "./components/Counters";
import { Route, BrowserRouter } from "react-router-dom";

function App() {
  useEffect(() => {
    const msg = firebase.messaging();
    msg
      .requestPermission()
      .then(() => {
        return msg.getToken();
      })
      .then((token) => {
        console.warn("token======", token);
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={ChatRoom} />
        <Route exact path="/Counters" component={Counters} />
      </BrowserRouter>
    </div>
  );
}

type data = {
  text: string;
};

type ChatMessageType = {
  message: {
    text: string;
  };
};

function ChatRoom() {
  const dummy: any = useRef();
  const messagesRef = firebase.database().ref("chat");
  let [data, setData]: any = useState<data[]>([]);

  useEffect(() => {
    messagesRef.on("value", (res) => {
      const values = res.val();
      const tempArr = [];
      for (let id in values) {
        tempArr.push(values[id]);
      }
      setData(tempArr);
    });
  }, []);

  const [formValue, setFormValue] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    messagesRef.push({
      text: formValue,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header>
        <h1>Chat Application</h1>
      </header>
      <main>
        {data !== "" &&
          data.map((msg: data, i: number) => (
            <ChatMessage key={i} message={msg} />
          ))}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props: ChatMessageType) {
  const { text } = props.message;

  return (
    <>
      <div className="message">
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
