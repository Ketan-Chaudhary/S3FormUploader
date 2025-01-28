// import React from "react";
// import Form from "./components/Form";
// import UploadedData from "./components/UploadedData";

// function App() {
//   return (
//     <div className="App">
//       <h1>Upload Data</h1>
//       <Form />
//       <h2>Uploaded Data</h2>
//       <UploadedData />
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Form from "./components/Form";
import DataPage from "./components/DataPage";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Upload Data</h1>
        <Form />
        <Link to="/data">
          <button>Go to Data Page</button>
        </Link>

        <Switch>
          <Route exact path="/" component={Form} />
          <Route path="/data" component={DataPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
