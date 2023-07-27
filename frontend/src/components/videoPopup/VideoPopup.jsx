import React from "react";
import ReactPlayer from "react-player/youtube";
import "./videoPopup.scss";

const VideoPopup = ({ data }) => {
  console.log(data);
  //   console.log(
  //     data.results.find(
  //       (item) =>
  //         item.type == "Trailer" ||
  //         item.name == "Official Trailer" ||
  //         "Main Trailer"
  //     )
  //   );

  if (data.results.length != 0) {
    var { key } = data.results.find(
      (item) =>
        item.type == "Trailer"
    );
    console.log(key);
  }

  return (
    <div>
      {data.results.length != 0 ? (
        <div
          className="videoPlayer"
          style={{
            width: "75rem",
            height: "40rem",
            margin: "auto",
            marginBottom: "5rem",
            marginTop: "5rem",
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            Official Trailer
          </p>

          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${key}`}
            controls
            width="100%"
            height="100%"
            // playing={true}
          />
        </div>
      ) : (
        <div
          style={{
            color: "white",
            fontSize: "4rem",
            width: "75rem",
            height: "rem",
            margin: "auto",
            marginTop: "5rem",
            marginBottom: "12rem",
          }}
        >
          Trailer Not Available
        </div>
      )}
    </div>
  );
};

export default VideoPopup;

// import React from "react";
// import ReactPlayer from "react-player/youtube";
// import "./videoPopup.scss";

// const VideoPopup = ({ data }) => {
//   console.log(data);
//   //   console.log(
//   //     data.results.find(
//   //       (item) =>
//   //         item.type == "Trailer" ||
//   //         item.name == "Official Trailer" ||
//   //         "Main Trailer"
//   //     )
//   //   );

//   if (data.results.length != 0) {
//     var { key } = data.results.find(
//       (item) =>
//         item.type == "Trailer" ||
//         item.name == "Official Trailer" ||
//         "Main Trailer"
//     );
//     console.log(key);
//   }

//   return (
//     <div>
//       <div
//         className="videoPlayer"
//         style={{
//           width: "75rem",
//           height: "40rem",
//           margin: "auto",
//           marginBottom: "5rem",
//           marginTop: "5rem",
//         }}
//       >
//         <p style={{ color: "white", fontSize: "1.5rem", marginBottom: "1rem" }}>
//           Official Trailer
//         </p>
//         {data.results.length != 0 ? (
//           <ReactPlayer
//             url={`https://www.youtube.com/watch?v=${key}`}
//             controls
//             width="100%"
//             height="100%"
//             // playing={true}
//           />
//         ) : (
//           <div
//             style={{
//               color: "white",
//               fontSize: "5rem",
//               backgroundColor: "brown",
//               width: "75rem",
//               height: "40rem",
//               margin: "auto",
//             }}
//           >
//             Trailer Not Available
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoPopup;
