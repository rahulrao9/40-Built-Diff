import "../App.css";
import Post from "./Post";
import TopMiddleFixedPane from "./TopMiddleFixedPane";

const MiddlePane = ({
  isMiddlePaneActive,
  isImagePost,
  currPost,
  isAddPostActive,
  currAddPostOption,
  currImgURL,
}) => {
  return (
    <div className="middle-pane">
      <div>
        <h2 style={{ color: "white" }}>Home</h2>
      </div>
      <TopMiddleFixedPane
        isAddPostActive={isAddPostActive}
        currAddPostOption={currAddPostOption}
      />
      <Post currImgURL={currImgURL} isMiddlePaneActive={isMiddlePaneActive} />
    </div>
  );
};

export default MiddlePane;
