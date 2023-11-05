import "../App.css";

const RightPane = ({ genText }) => {
  return (
    <div className="right-pane">
      <div
        style={{
          marginTop: "5em",
          backgroundColor: "#080808",
          marginLeft: "1em",
          marginRight: "1em",
          borderRadius: 6,
          padding: "0.6em",
        }}
      >
        <div style={{ color: "white" }}>{genText}</div>
      </div>
    </div>
  );
};

export default RightPane;
