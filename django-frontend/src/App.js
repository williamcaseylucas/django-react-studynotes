import "./App.css";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            {/* Exact makes sure this is only on the initial page */}
            <Route path="/" exact element={<NotesListPage />} />
            <Route path="/note/:id" exact element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
