import "./index.css";
import EditMovie from "./components/EditMovie";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//import components and pages
import Header from "./components/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Discussions from "./pages/Discussions";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
        <Route path='/' element={<Home/>} />
          <Route path='/movies' element={<Movies/>} />
          <Route path='/discussions' element={<Discussions/>} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
