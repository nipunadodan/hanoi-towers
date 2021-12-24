import React from 'react';
import './App.css';
import Home from "./components/Pages/Home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Timer from "./components/Pages/Test/Timer";


function App() {
  return (
      <BrowserRouter basename={'hanoi-towers'}>
          <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/timer'} element={<Timer />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
