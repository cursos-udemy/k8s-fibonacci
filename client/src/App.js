import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import OtherPage from './OtherPage';
import Fibonacci from './Fibonacci';

function App() {
  return (
    <Router>
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Docker And Kubernetes</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item" className="mr-3"><Link to="/">Home</Link></li>
            <li class="nav-item" className="mr-3"><Link to="/otherpage">Other Page</Link></li>
            <li class="nav-item" className="mr-3"><a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a></li>
          </ul>
        </div>
      </nav>
        <header>
          <br/><br/>
        </header>
        <div>
          <br/><br/>
          <Route exac path="/" component={Fibonacci} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
