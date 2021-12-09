import React from 'react';
import './App.css';
import Home from "./components/Pages/Home/Home";

function App() {
  return (
      <>
        <h1 className={'text-center'}>Hanoi Towers</h1>
          <p className={'text-center'} style={{color:'#888'}}>Instructions: Select a disc you want to move and then select the Tower name you want your selected disc to move.</p>
        <Home />
      </>
  );
}

export default App;
