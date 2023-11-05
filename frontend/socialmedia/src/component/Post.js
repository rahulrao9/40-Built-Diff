import { CgProfile } from "react-icons/cg";
import sample from "./avenue.jpg";

const Post = ({ isMiddlePaneActive, currImgURL, currPost }) => {
  return (
    <div
      className={isMiddlePaneActive ? "high-light" : ""}
      style={{
        borderRadius: 6,
        height: "70%",
        width: "90%",
        boxShadow: "2px 2px 6px grey",
        margin: "auto",
      }}
    >
      <div className="d-flex">
        <div style={{ margin: "1.2em", fontSize: "2em" }}>
          <CgProfile style={{ color: "#1DA1F2" }} />
        </div>
        <div
          style={{
            color: "white",
            fontSize: "1.4em",
            marginTop: "2.2em",
          }}
        >
          <h5 style={{ marginBottom: "0.02em" }}>
            {currPost.hasOwnProperty("name")
              ? currPost["name"]
              : "Post By Person"}{" "}
            <span style={{ fontSize: "0.6em" }}>
              {currPost.hasOwnProperty("time") ? currPost["time"] : "Time Ago"}
            </span>
          </h5>
          <h6 style={{ marginTop: "0.1em" }}>
            {currPost.hasOwnProperty("caption")
              ? currPost["caption"]
              : "Description"}
          </h6>
        </div>
      </div>
      <div>
        <img
          style={{ height: "60%", width: "60%", borderRadius: 8 }}
          src={currImgURL}
        />
      </div>
    </div>
  );
};

export default Post;
