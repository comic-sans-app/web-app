import '../../styles/App.css';
import Editor from "../Editor";
import NavigationBar from "../NavBar/NavBar"
import Bubbles from "../TextBubbles/Bubbles"

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Editor />
      <Bubbles />
    </div>
  );
}

export default App;
