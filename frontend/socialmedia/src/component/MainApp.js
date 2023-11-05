import RightPane from "./RightPane";
import Side from "./Side";
import MiddlePane from "./MiddlePane";

const MainApp = ({
  isSidePaneActive,
  currSidePaneOption,
  isMiddlePaneActive,
  isImagePost,
  currPost,
  isAddPostActive,
  currAddPostOption,
  currImgURL,
  genText,
}) => {
  return (
    <div className="App d-flex">
      <Side
        isSidePaneActive={isSidePaneActive}
        currSidePaneOption={currSidePaneOption}
      />
      <MiddlePane
        isMiddlePaneActive={isMiddlePaneActive}
        isImagePost={isImagePost}
        currPost={currPost}
        isAddPostActive={isAddPostActive}
        currAddPostOption={currAddPostOption}
        currImgURL={currImgURL}
      />
      <RightPane genText={genText} />
    </div>
  );
};

export default MainApp;
