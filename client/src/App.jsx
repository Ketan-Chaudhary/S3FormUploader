import { Link, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import UploadedData from "./components/UploadedData";

function App() {
  return (
    <div className="App">
      <h1>Upload Data</h1>
      <Link to="/">
        <button>Go to Form Page</button>
      </Link>
      <Link to="/data">
        <button>Go to Uploaded Data</button>
      </Link>

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/data" element={<UploadedData />} />
      </Routes>
    </div>
  );
}

export default App;
