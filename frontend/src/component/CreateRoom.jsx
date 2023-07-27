import { useState } from "react";
import getCookie from "../utils/getCookie";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  async function createRoomRequest(e) {
    e.preventDefault();
    const url = "http://localhost:8000/rooms/";
    const csrftoken = getCookie("csrftoken");
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${JSON.parse(
          window.localStorage.getItem("token")
        )}`,
      },
      body: JSON.stringify({
        name: roomName,
      }),
    });
    console.log(request);
    const room = await request.json();
    console.log(room);

    if (request.status === 201) {
      navigate(`/chat`, { state: { room: room } });
    } else {
      setShowAlert(true);
    }
    setRoomName("");
  }

  return (
    <>
      <div>
        <h1
          style={{
            backgroundColor: "#a87e3d",
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
            color: "white",
          }}
        >
          Create Room
        </h1>
        <div
          style={{
            display: "flex",
            // border: "1px solid red",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem 0 20rem 0",
            flexDirection: "column",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#B5C99A",
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          >
            <form onSubmit={createRoomRequest} className="login_form">
              <label>
                <h4 style={{ marginBottom: "0.5rem", color: "black" }}>
                  Room name:
                </h4>
              </label>

              <input
                type="text"
                name="room-name"
                placeholder="Type in room name"
                value={roomName}
                autoFocus={true}
                style={{ height: "2rem", padding:"0.5rem", backgroundColor:"whitesmoke" }}
                onChange={(e) => setRoomName(e.target.value)}
              />
              {/* <p>Create Chat Room if that name is not taken</p> */}
              <div>
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  color="success"
                  style={{ width: "100%", marginTop: "1rem" }}
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
