import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import login from './pages/login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
            <Route exact path="/login" component={login}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;