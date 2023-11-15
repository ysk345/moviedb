import "./index.css";
import EditMovie from "./components/EditMovie";
import Header from "./components/Header";
import Movies from "./pages/Movies";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Discussions from "./pages/Discussions";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/movies' element={<Movies/>} />
          <Route path='/discussions' element={<Discussions/>} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
