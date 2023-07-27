import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import { Link } from "react-router-dom";
import "../home.scss"

const Popular = () => {
  const { data, loading } = useFetch(`/movie/popular`);

  return (
    <div className="carouselSection" style={{ marginTop: "-2rem" }}>
      <ContentWrapper>
        <span className="carouselTitle">Popular Movies</span>
        <Link to={"/explore/movie"}>
          <button
            style={{
              padding: "0.3rem 0.8rem",
              borderRadius: "1rem",
              marginTop: "1rem",
              backgroundColor:"#ff9900"
            }}
          >
            View More
          </button>
        </Link>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={"movie"} />
    </div>
  );
};

export default Popular;
