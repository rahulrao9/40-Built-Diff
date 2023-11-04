import "../App.css";
import Post from "./Post";
import TopMiddleFixedPane from "./TopMiddleFixedPane";

const MiddlePane = () => {
  return (
    <div className="middle-pane">
      <div style={{ margin: "-0.8em" }}>
        <h2 style={{ color: "white" }}>Home</h2>
      </div>
      <TopMiddleFixedPane />
      <Post />
    </div>
  );
};

export default MiddlePane;
