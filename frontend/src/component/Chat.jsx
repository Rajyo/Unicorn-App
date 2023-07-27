import { useEffect, useState } from "react";
import getCookie from "../utils/getCookie";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./component.scss";
import { TextField } from "@mui/material";

export default function Chat() {
  let navigate = useNavigate();
  const [state, setState] = useState({
    rooms: [],
  });

  const userId = JSON.parse(window.localStorage.getItem("user_id"));
  const token = JSON.parse(window.localStorage.getItem("token"));

  const [myRooms, setMyRooms] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchRooms() {
      const url = `http://localhost:8000/rooms/?my_rooms=${myRooms}&search=${searchQuery}`;
      const csrftoken = getCookie("csrftoken");
      const request = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
          Authorization: `Token ${token}`,
        },
      });
      console.log(request);
      const response = await request.json();
      setState({
        rooms: response,
      });
      console.log(response);
    }
    fetchRooms();

    return () => {
      setState({ ...state, rooms: [] });
    };
  }, [myRooms, searchQuery]);

  async function joinRoom(room) {
    const url = `http://localhost:8000/rooms/${room.id}/`;
    const csrftoken = getCookie("csrftoken");
    const request = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${token}`,
      },
    });
    if (request.status === 200) {
      navigate(`room/${room.slug}/`, { state: { room: room } });
    }
  }

  const rooms = state.rooms.map((room) => (
    <>
      <div
        className="chat_room"
        style={{
          width: "15rem",
          height: "15rem",
          margin: "2rem 2rem",
          // padding: "0.5rem 1.5rem",
          backgroundColor: "#ded9b6",
          // backgroundColor:"#FFC95F",
          // backgroundColor:"#B5C99A",
          color: "black",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            padding: "0.8rem 1rem",
            backgroundColor: "#862B0D",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            color: "burlywood",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ color: "white" }}>{room.name}</h2>
          </div>
          <div>
            <span style={{ color: "violet" }}>Host: </span>
            <b>{room.host.username}</b>
          </div>
        </div>
        <div
          style={{
            margin: "0.5rem 0rem",
            // border: "1px solid cyan",
            padding: "1rem",
          }}
        >
          {room.messages.length > 0 ? (
            <>
              <h4 style={{ marginBottom: "0.5rem", color: "#827272" }}>
                Last Message:
              </h4>
              <h4>
                {/* the ? sign is called chaining */}
                {room.messages.slice(-1)[0]?.username}:{" "}
                {room?.messages.slice(-1)[0]?.text}
              </h4>
            </>
          ) : (
            <p style={{ marginBottom: "1.5rem", color: "black" }}>
              No messages yet...
            </p>
          )}
        </div>
        {room.current_users.includes(userId) ? (
          <Button
            variant="contained"
            size="small"
            color="error"
            endIcon={<SendIcon />}
            style={{ margin: "1rem" }}
            onClick={() =>
              navigate(`room/${room.slug}/`, { state: { room: room } })
            }
          >
            Enter
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="warning"
            style={{ margin: "1rem" }}
            endIcon={<SendIcon />}
            onClick={() => joinRoom(room)}
          >
            Join
          </Button>
        )}
      </div>
    </>
  ));

  return (
    <div style={{marginBottom:"15.2rem"}}>
      {/* <h1
        style={{
          backgroundColor: "#a87e3d",
          display: "flex",
          padding: "1rem",
          color: "white",
          justifyContent: "center",
        }}
      >
        Room Section
      </h1> */}
      <div className="chat_form">
        <div>
          <Button
            variant="contained"
            size="small"
            color="inherit"
            onClick={() => setMyRooms(true)}
          >
            <h4 style={{color:"green"}}>My Rooms</h4>
          </Button>
          <Button
            variant="contained"
            size="small"
            color="inherit"
            onClick={() => setMyRooms(false)}
          >
            <h4 style={{color:"green"}}>All Rooms</h4>
          </Button>
        </div>
        <div
          style={{
            backgroundColor: "whitesmoke",
            // borderTopLeftRadius: "0.5rem",
            // borderTopRightRadius: "0.5rem",
          }}
        >
          <TextField
            label="Search Rooms"
            variant="filled"
            color="success"
            value={searchQuery}
            size="medium"
            style={{ width: "11rem" }}
            onChange={(e) => setSearchQuery(e.target.value)}
            focused
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rooms.length > 0 ? rooms : <div style={{margin:"6rem 0rem"}}>
          <h1 style={{ color: "white", margin:"1rem 0rem" }}>You are not enrolled in any room at this moment</h1>
          <h1 style={{ color: "white", margin:"1rem 0rem" }}>Kindly enroll in any room to start a conversation</h1>
        </div>}
      </div>
    </div>
  );
}
