import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import components and pages
import Header from "./components/Header";
import MovieList from "./pages/MovieList";
import Discussions from "./pages/Discussions";
import MovieDetails from "./pages/MovieDetails";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import UserProfile from "./pages/UserProfile";
import { AuthProvider } from "./contexts/AuthContext";


//Frontend Routing
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header>
          <Routes>            
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/movielist" element={<MovieList />} />
            <Route path="/discussion" element={<Discussions />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/edit/:id" element={<EditMovie />} />
            <Route path="/profile" element={<UserProfile />} />

          </Routes>
        </Header>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
