import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then(response => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then(response => {
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = e => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then(response => {
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    find(searchTitle, "title");
  };

  const findByRating = () => {
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <div className="App">
      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
          </Form.Group>
          <Button variant="primary" onClick={findByTitle}>Search</Button>
        </Col>

        <Col>
          <Form.Group>
            <Form.Control as="select" value={searchRating} onChange={onChangeSearchRating}>
              {ratings.map((rating, index) => (
                <option key={index} value={rating}>{rating}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={findByRating}>Search</Button>
        </Col>
      </Row>

      <Row>
        {movies.map((movie) => (
          <Col md={4} key={movie._id}>
            <Card style={{ width: '18rem', marginBottom: '20px' }}>
              <Card.Img 
                variant="top" 
                src={movie.poster || "https://via.placeholder.com/180"} 
                style={{ height: '250px', objectFit: 'cover' }} 
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Rating:</strong> {movie.rated}
                </Card.Text>
                <Card.Text>{movie.plot?.substring(0, 100)}...</Card.Text>
                <Link to={`/movies/${movie._id}`}>View Reviews</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MoviesList;