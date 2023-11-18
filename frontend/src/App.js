import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import components and pages
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieList from "./pages/MovieList";
import Discussions from "./pages/Discussions";
import MovieDetails from "./pages/MovieDetails";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";

//Frontend Routing
function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movielist" element={<MovieList />} />
          <Route path="/discussion" element={<Discussions />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/edit/:id" element={<EditMovie />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
