import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import getCookie from "../utils/getCookie";
import { Button } from "@mui/material";

export default function Room() {
  const location = useLocation();
  const navigate = useNavigate();

  const { roomSlug } = useParams();
  console.log(roomSlug);

  const token = JSON.parse(window.localStorage.getItem("token"));
  const userId = JSON.parse(window.localStorage.getItem("user_id"));
  const username = JSON.parse(window.localStorage.getItem("username"));

  const [room, setRoom] = useState(!!location.state ? location.state.room : {}); // If state was passed(through enter button), set it as room, otherwise empty object
  const [chatSocketReady, setChatSocketReady] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);

  const [state, setState] = useState({
    textToSend: "",
    messages: !!room.messages ? room.messages : [], // Get messages from passed location state, otherwise make it an empty list
  });

  useEffect(() => {
    const initChat = () => {
      setChatSocket(
        new WebSocket(
          `ws://${window.location.hostname}:8000/ws/chat/${roomSlug}/?token=${token}`
        )
      );
      setChatSocketReady(true);
    };
    initChat();

    // Cleanup function
    return () => {
      if (chatSocketReady) {
        chatSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    // Websocket functionality
    if (!chatSocketReady) return;

    chatSocket.onopen = (e) => {
      setChatSocketReady(true);
      console.log("connected to websocket");
    };

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.type === "chat_message") {
        setState((prevState) => ({
          messages: [data.message, ...prevState.messages],
        }));
      } else if (data.type === "load_room") {
        setRoom(data.room);
        setState({
          ...state,
          messages: data.room.messages,
        });
      }
    };

    chatSocket.onclose = function (e) {
      setChatSocketReady(false);
      setChatSocket(null);
      console.log("chatsocket closed");
    };

    chatSocket.onerror = function (err) {
      console.log("Socket encountered error: ", err.message, "Closing socket");
      setChatSocketReady(false);
      chatSocket.close();
    };

    console.log("useEffect triggered");

    // Cleanup function
    return () => {
      chatSocket.close();
    };
  }, [chatSocket]);

  function pressEnter(e) {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    await chatSocket.send(
      JSON.stringify({
        message: state.textToSend.trim(),
      })
    );
    setState({ ...state, textToSend: "" });
    console.log("send");
  }

  async function leaveRoom() {
    const url = `http://localhost:8000/rooms/${room.id}/leave_room/`;
    const csrftoken = getCookie("csrftoken");
    const request = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${token}`,
      },
    });
    if (request.status === 204) {
      navigate("/chat");
    }
  }

  async function deleteRoom() {
    const url = `http://localhost:8000/rooms/${room.id}/`;
    const csrftoken = getCookie("csrftoken");
    const request = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${token}`,
      },
    });
    if (request.status === 204) {
      navigate("/chat");
    }
  }

  const messages = state.messages.map((msg) => (
    <div
      style={{
        margin: "1rem 2rem 1.25rem 2rem",
        border: "1px solid black",
        // backgroundColor: "green",
      }}
    >
      <div key={msg.id}>
        <div style={{
          display: "flex", marginBottom: "0.1rem",
          backgroundColor: "#82bcff",
          padding: "0.5rem 1rem",
          justifyContent:"space-between"
        }}>
          <h4>
            @{msg.username}
          </h4>
          <h5 style={{fontWeight:"500"}}>
            On: {msg.created_at.slice(0, 10)} &nbsp; At: {msg.created_at.slice(11, 19)}
          </h5>
        </div>
        <div style={{ padding: "0.5rem 1rem" }}>
          <p>{msg.text}</p>
        </div>
      </div>
    </div>
  ));

  // DOM render
  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin:"0.9rem",
      }}
    >
      <div
        style={{
          // border: "1px solid red",
          backgroundColor: "white",
          width: "50%",
          borderRadius: "0.6rem",
        }}
      >
        <div
          style={{
            display: "flex",
            // border: "1px solid violet",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            backgroundColor: "#8365bc",
            borderTopRightRadius: "0.5rem",
            borderTopLeftRadius: "0.5rem",
          }}
        >
          <h1 style={{color:"white"}}>{!chatSocketReady ? <h4 style={{fontSize:"1.1rem", marginTop:"0.5rem"}}>Loading Title...</h4> : room.name}</h1>
          <div>
            {!!room.current_users && room.current_users.includes(userId) ? (
              <Button
                variant="contained"
                size="small"
                color="error"
                style={{ margin: "0px 1rem" }}
                onClick={leaveRoom}
              >
                Leave Room
              </Button>
            ) : (
              <></>
            )}
            {!!room.host && room.host.username === username ? (
              <Button
                variant="contained"
                size="small"
                color="error"
                style={{ margin: "0px 1rem" }}
                onClick={deleteRoom}
              >
                Delete Room
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div>
          <div
            className="chatbox"
            style={{
              // border: "1px solid blue",
              marginTop: "0.5rem",
              // backgroundColor: "grey",
              height: "27.25rem",
              // overflow:"auto",
              overflowY: "scroll",
            }}
          >
            <div >{messages}</div>

            {!chatSocketReady ? <h5>Loading messages...</h5> : <></>}
          </div>
          <div style={{ backgroundColor: "#8365bc", padding: "0.1rem 0rem", borderBottomLeftRadius:"0.5rem", borderBottomRightRadius:"0.5rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // border: "1px solid yellow",
                margin: "0.5rem 2rem",
                // backgroundColor: "slateblue",
              }}
            >
              <form onSubmit={sendMessage}>
                <textarea
                  onChange={(e) =>
                    setState({ ...state, textToSend: e.target.value })
                  }
                  onKeyDown={pressEnter}
                  style={{
                    width: "100%",
                    borderColor: "white",
                    fontSize: "large",
                    paddingLeft:"1rem"
                  }}
                  value={state.textToSend}
                  placeholder="Enter Text Here"
                  autoFocus
                />
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    style={{ width: "100%", marginTop: "0.25rem" }}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
