import { CgProfile } from "react-icons/cg";
import sample from "./avenue.jpg";

const Post = () => {
  return (
    <div
      style={{
        borderRadius: 6,
        height: "70%",
        width: "90%",
        boxShadow: "2px 2px 10px grey",
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
          }}
        >
          <h5 style={{ marginBottom: "0.02em" }}>
            Post By Person <span style={{ fontSize: "0.6em" }}>Time Ago</span>
          </h5>

          <h6 style={{ marginTop: "0.1em" }}>Description</h6>
        </div>
      </div>
      <div>
        <img
          style={{ height: "60%", width: "60%", borderRadius: 8 }}
          src={sample}
        />
      </div>
    </div>
  );
};

export default Post;
