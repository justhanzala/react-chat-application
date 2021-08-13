import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import firebase from "./firebase";

function App() {
  useEffect(() => {
    const msg = firebase.messaging();
    msg.requestPermission().then(() => {
      return msg.getToken()
    }).then((token) => {
      console.warn("token======", token)
    })
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Chat Application</h1>
      </header>
      <ChatRoom />
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firebase.database().ref("chat");
  const [data, setData] = useState([]);

  useEffect(() => {
    messagesRef.on("value", (res) => {
      const values = res.val();
      const tempArr = [];
      for(let id in values) {
        tempArr.push(values[id])
      }
      setData(tempArr)
    })
  }, [messagesRef]);

  const [formValue, setFormValue] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    messagesRef.push({
      text: formValue,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {data !== "" &&
          data.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

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

function ChatMessage(props) {
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
