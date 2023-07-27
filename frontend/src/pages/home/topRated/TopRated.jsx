import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import { Link } from "react-router-dom";
import "../home.scss"

const TopRated = () => {
  const { data, loading } = useFetch(`/tv/popular`);

  return (
    <div className="carouselSection" style={{ marginTop: "-2rem" }}>
      <ContentWrapper>
        <span className="carouselTitle">Popular Tv Shows</span>
        <Link to={"/explore/tv"}>
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
      <Carousel data={data?.results} loading={loading} endpoint={"tv"} />
    </div>
  );
};

export default TopRated;
