import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantContexts";
import RestaurantFinder from "../Apis/RestaurantFinder";
// import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const RestaurantDetailPage = () => {
  const { id } = useParams();
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
  }, []);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.review} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
