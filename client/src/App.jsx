import React from "react";
import Form from "./components/Form";
import UploadedData from "./components/UploadedData";

function App() {
  return (
    <div className="App">
      <h1>Upload Data</h1>
      <Form />
      <h2>Uploaded Data</h2>
      <UploadedData />
    </div>
  );
}

export default App;
