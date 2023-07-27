import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import "../home.scss"

const Trending = () => {
  const { data, loading } = useFetch(`/trending/all/day`);

  return (
    <div className="carouselSection" style={{ marginTop: "2rem" }}>
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
