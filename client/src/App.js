import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

// Components
import Prompts from "./components/Prompts.js";
import Sidebar from "./components/Sidebar.js";
import Topbar from "./components/Topbar.js";

function App() {
  return (
    <Fragment>
      <Prompts />
    </Fragment>
  );
}

export default App;
