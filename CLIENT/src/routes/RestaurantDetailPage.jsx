import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantContexts";
import RestaurantFinder from "../Apis/RestaurantFinder";
// import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import StarRating from "../components/StarRating";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [newReview, setNewReview] = useState(null);
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantFinder.get(`/${id}`);
        // console.log(response.data.data.restaurant);
        // console.log(response);
        setSelectedRestaurant(response.data.data);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [newReview]);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="text-center">
            <StarRating
              rating={parseFloat(selectedRestaurant.restaurant.average_rating)}
            />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.review} />
          </div>
          <AddReview addNewReview={setNewReview} />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
