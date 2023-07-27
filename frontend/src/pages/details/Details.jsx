import React from "react";
import "./details.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Cast from "./cast/Cast";
import Recommendation from "./carousels/Recommendation";
import VideoPopup from "../../components/videoPopup/VideoPopup";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data } = useFetch(`/${mediaType}/${id}/videos`);
  console.log(data);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner crew={credits?.crew} />
      {data && <VideoPopup data={data} />}
      <Cast data={credits?.cast} loading={creditsLoading} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
