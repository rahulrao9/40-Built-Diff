import logo from "./logo.svg";
import "./App.css";
import LeftPane from "./component/LeftPane";
import MiddlePane from "./component/MiddlePane";
import RightPane from "./component/RightPane";
import Side from "./component/Side";

function App() {
  return (
    <div className="App d-flex">
      <Side />
      <MiddlePane />
      <RightPane />
    </div>
  );
}

export default App;
