import "../../styles/App.css";
import Editor from "../Editor";
import NavigationBar from "../NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Editor />
      <h3 className="creators">
        Created by Laura Gilbert, Yuliya Kandratsyeva, Desiree Nelson, and
        Katerina Scoullos!{" "}
      </h3>
    </div>
  );
}

export default App;
