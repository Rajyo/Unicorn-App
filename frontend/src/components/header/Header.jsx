import "./header.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("token") !== null
  );
  const username = isLoggedIn
    ? JSON.parse(window.localStorage.getItem("username"))
    : "";

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    navigate("/login");
  }

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header
      style={{
        padding: "0.5rem",
        backgroundColor: "rgb(36, 113, 69)",
        position: "sticky",
        top: "0",
        zIndex: "1",
      }}
    >
      <ContentWrapper>
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to={`/`} style={{textDecoration:"none", color:"white", fontSize:"1.4rem", padding:"0.25rem 0"}} className="header_image">
              Unicorn App
            </Link>
            <ul
              style={{
                display: "flex",
                listStyleType: "none",
                justifyContent: "center",
              }}
            >
              <li style={{ marginRight: "2rem" }}>
                <Link
                  to={`/explore/movie`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Movies
                </Link>
              </li>
              <li style={{ marginRight: "2rem" }}>
                <Link
                  to={`/explore/tv`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Tv Series
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li style={{ marginRight: "2rem" }}>
                    <Link
                      to={`/chat`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Chat
                    </Link>
                  </li>
                  <li style={{ marginRight: "2rem" }}>
                    <Link
                      to={`/room/create`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Create Room
                    </Link>
                  </li>
                  <li
                    style={{
                      marginLeft: "3rem",
                      marginTop: "-0.1rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    @{username}
                    <button
                      className="logout_btn"
                      onClick={logout}
                      style={{
                        padding: "0.2rem 0.5rem",
                        fontSize: "0.9rem",
                        marginLeft: "0.75rem",
                        color: "white",
                        backgroundColor: "black",
                        borderRadius:"0.5rem"
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li style={{ marginRight: "2rem" }}>
                    <Link
                      to={`/login`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Login
                    </Link>
                  </li>
                  <li style={{ marginRight: "2rem" }}>
                    <Link
                      to={`/register`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </>
      </ContentWrapper>
    </header>
  );
};

export default Header;
