import { CgProfile } from "react-icons/cg";
import { BsImages } from "react-icons/bs";
import { BsFiletypeGif } from "react-icons/bs";
import { PiSmiley } from "react-icons/pi";

const TopMiddleFixedPane = () => {
  return (
    <div
      className="fixed"
      style={{
        backgroundColor: "#0f1419",
        boxShadow: "2px 2px 10px grey",
        width: "90%",
        margin: "auto",
        borderRadius: 6,
        marginBottom: "0.4em",
      }}
    >
      <div className="d-flex">
        <div style={{ margin: "1.2em", fontSize: "2em" }}>
          <CgProfile style={{ color: "#1DA1F2" }} />
        </div>
        <input
          style={{
            borderRadius: 10,
            width: "70%",
            height: "3em",
            marginTop: "2.2em",
          }}
        />
        <button
          style={{
            margin: "3em",
            height: "3em",
            borderRadius: 4,
            width: "6em",
            background: "#1DA1F2",
            fontWeight: "bolder",
            backgroundColor: "#1DA1F2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </div>
      <div className="d-flex" style={{ margin: "auto", marginTop: "-1.5em" }}>
        <div style={{ margin: "auto", fontSize: "1.2em" }}>
          <BsImages style={{ color: "#1DA1F2" }} />
        </div>
        <div style={{ margin: "auto", fontSize: "1.2em" }}>
          <BsFiletypeGif style={{ color: "#1DA1F2" }} />
        </div>
        <div style={{ margin: "auto", fontSize: "1.2em" }}>
          <PiSmiley style={{ color: "#1DA1F2" }} />
        </div>
      </div>
    </div>
  );
};

export default TopMiddleFixedPane;
