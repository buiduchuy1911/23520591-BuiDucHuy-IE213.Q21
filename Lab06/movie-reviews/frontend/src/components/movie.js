import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieDataService from '../services/movies';
import moment from 'moment';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const Movie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    _id: null,
    title: "",
    rated: "",
    plot: "",
    poster: "",
    reviews: []
  });

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then(response => {
        setMovie(response.data);
        console.log("Movie data:", response.data);
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (id) {
      getMovie(id);
    }
  }, [id]);

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, props.user._id)
      .then(response => {
        setMovie((prevState) => {
          // Xóa review khỏi mảng và cập nhật lại state
          const newReviews = [...prevState.reviews];
          newReviews.splice(index, 1);
          return { ...prevState, reviews: newReviews };
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="mt-4">
      <Container>
        <Row>
          { }
          <Col md={4}>
            <Image
              src={movie.poster ? movie.poster : "https://via.placeholder.com/300x400?text=No+Poster"}
              fluid
              alt={movie.title}
            />
          </Col>

          <Col md={8}>
            <Card>
              <Card.Header as="h4">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text><strong>Rating:</strong> {movie.rated}</Card.Text>
                <Card.Text>{movie.plot}</Card.Text>

                {props.user && (
                  <Link
                    to={`/movies/${id}/review`}
                    className="btn btn-primary mt-3"
                  >
                    Add Review
                  </Link>
                )}
              </Card.Body>
            </Card>

            <div className="mt-5">
              <h2>Reviews</h2>
              <hr />

              {movie.reviews.length === 0 ? (
                <p>Chưa có review nào cho phim này.</p>
              ) : (
                movie.reviews.map((review, index) => (
                  <div key={index} className="mb-4">
                    <h5>
                      {review.name} reviewed on {moment(review.date).format("Do MMMM YYYY")}
                    </h5>
                    <p>{review.review}</p>

                    {props.user && props.user._id === review.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={`/movies/${id}/review`}
                            state={{ currentReview: review }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="link"
                            onClick={() => deleteReview(review._id, index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    )}
                    <hr />
                  </div>
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;