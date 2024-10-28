import { useContext, useEffect } from "react";

import { RestaurantsContext } from "../context/RestaurantContexts";
import RestaurantFinder from "../Apis/RestaurantFinder";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

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

  const handleDelete = async (id) => {
    // console.log("deleting");
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
                <tr key={id}>
                  <td>{name}</td>
                  <td>{location}</td>
                  <td>{"$".repeat(price_range)}</td>
                  <td>Rating</td>
                  <td>
                    <button className="btn btn-warning">Update</button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(id)}
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
