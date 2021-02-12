import "../../styles/App.css";
import Editor from "../Editor";
import NavigationBar from "../NavBar/NavBar";
import React from "react";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Editor />
      <Footer />
    </div>
  );
}

export default App;
