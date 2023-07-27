import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  return (
    <>
      <p
        style={{
          fontSize: "1.5rem",
          color: "white",
          marginLeft: "11.5rem",
          marginTop: "5rem",
          marginBottom: "1rem",
        }}
      >
        Recommendations
      </p>
      <Carousel
        title="Recommendations"
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
      />
    </>
  );
};

export default Recommendation;
