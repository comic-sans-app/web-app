import '../../styles/App.css';
import Editor from "../Editor";
import NavigationBar from "../NavBar/NavBar"

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <header className="App-header">
        <h1>Hello Comic Sans</h1>
      </header>
      <Editor />
    </div>
  );
}

export default App;
