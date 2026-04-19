import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import AddReview from './components/add-review';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';

function App() {
  const [user, setUser] = React.useState(null);

  const login = (user = null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            <Nav.Link>
              {user ? (
                <a onClick={logout} href="https://uit.edu.vn">Logout User</a>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movies/:id/review" element={<AddReview user={user} />} />
        <Route path="/movies/:id" element={<Movie user={user} />} />
        <Route path="/login" element={<Login login={login} />} />
      </Routes>
    </div>
  );
}

export default App;