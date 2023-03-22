import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Router>
      <Routes>
         <Route exact path="/" Component={Login} />
         <Route exact path="/app" Component={App} />
      </Routes>
   </Router>
);

