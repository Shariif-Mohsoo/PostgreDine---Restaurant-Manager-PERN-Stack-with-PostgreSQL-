import { useState } from "react";
import { useParams } from "react-router-dom";

import RestaurantFinder from "../Apis/RestaurantFinder";

const AddReview = ({ addNewReview }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("Rating");
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });

      // Clear the form inputs
      setName("");
      setRating(0);
      setReviewText("");

      addNewReview(response);

      // Refresh the page to immediately show the new review
      // navigate("/");
      // navigate(location.pathname);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mb-2">
      <form onSubmit={handleSubmitReview}>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="name"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="custom-select"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="review"
            className="form-control"
          ></textarea>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddReview;
