import React, { useState } from 'react';
import MovieDataService from "../services/movies";
import { Link, useParams, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddReview = (props) => {
  const { id } = useParams();
  const location = useLocation();

  let editing = false;
  let initialReviewState = "";

  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.review;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const onChangeReview = e => {
    const review = e.target.value;
    setReview(review);
  };

  const saveReview = () => {
    var data = {
      review: review,
      name: props.user.name,
      user_id: props.user._id,
      movie_id: id
    };

    if (editing) {
      data.review_id = location.state.currentReview._id;
      MovieDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <div className="mt-4">
      {props.user ? (
        submitted ? (
          <div>
            <h4>Review submitted successfully</h4>
            <Link to={"/movies/" + id}>
              Back to Movie
            </Link>
          </div>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={review}
                onChange={onChangeReview}
              />
            </Form.Group>
            <Button variant="primary" onClick={saveReview}>
              Submit
            </Button>
          </Form>
        )
      ) : (
        <div>
          Please log in.
        </div>
      )}
    </div>
  );
};

export default AddReview;
