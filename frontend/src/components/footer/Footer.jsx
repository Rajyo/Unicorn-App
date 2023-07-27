import React from "react";
import "./footer.scss";
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="maindiv">
          <div className="infoText">
            Enjoy your favorite movies, TV shows and have a conversation with Movie x Chat - your ultimate entertainment destination.
          </div>
          <div className="socialIcons">
            <span className="icon">
              <FaFacebookF />
            </span>

            <span className="icon">
              <FaInstagram />
            </span>

            <span className="icon">
              <FaGithub />
            </span>

            <span className="icon">
              <FaLinkedin />
            </span>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
