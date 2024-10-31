import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  // console.log(reviews);
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mb-2">
      {reviews.map((review) => {
        const { id, name, rating, review: userReview } = review;
        return (
          <div key={id} className="col mb-4">
            <div className="card text-white bg-primary">
              <div className="card-header d-flex justify-content-between">
                <span>{name}</span>
                <span>
                  <StarRating rating={rating} />
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{userReview}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
