import { useState, createContext } from "react";
// creating the context
const RestaurantsContext = createContext();
// creating the custom provider
export const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  return (
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
export { RestaurantsContext };
