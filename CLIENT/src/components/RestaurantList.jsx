import { useContext, useEffect } from "react";

import { RestaurantsContext } from "../context/RestaurantContexts";
import RestaurantFinder from "../Apis/RestaurantFinder";
import { useNavigate } from "react-router-dom";

import StarRating from "../components/StarRating";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  // we use it for redirecting.
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        // console.log(response.data.data.restaurants);
        setRestaurants(response.data.data.restaurants);
        // console.log(response.data.data.restaurants);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [setRestaurants]);
  const renderRating = (restaurant) => {
    return (
      <>
        <StarRating rating={parseFloat(restaurant.average_rating)} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  const handleDelete = async (id, e) => {
    // console.log("deleting");
    e.stopPropagation();

    try {
      // const response =
      await RestaurantFinder.delete(`/${id}`);
      // console.log(response);
      const filteredRestaurants = restaurants.filter(
        (restaurant) => restaurant.id !== id
      );
      setRestaurants(filteredRestaurants);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = (id, e) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              const { id, name, location, price_range } = restaurant;
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={id}
                >
                  <td>{name}</td>
                  <td>{location}</td>
                  <td>{"$".repeat(price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(id, e)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(id, e)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
