import { useState, createContext } from "react";
// creating the context
const RestaurantsContext = createContext();
// creating the custom provider
export const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };
  return (
    <RestaurantsContext.Provider
      value={{ restaurants, setRestaurants, addRestaurant }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
export { RestaurantsContext };
