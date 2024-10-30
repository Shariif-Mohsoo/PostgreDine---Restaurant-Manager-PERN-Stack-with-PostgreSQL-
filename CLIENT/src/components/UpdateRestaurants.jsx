import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RestaurantFinder from "../Apis/RestaurantFinder";

const UpdateRestaurants = () => {
  const { id } = useParams(); //ID OF ITEM WE ARE GOING TO UPDATE.

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      const { name, location, price_range } = response.data.data.restaurant;
      //   console.log(response);
      setName(name);
      setLocation(location);
      setPriceRange(parseInt(price_range));
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const updatedRestaurant =
    await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    navigate("/");
    // console.log(updatedRestaurant);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            type="number"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            min={1}
            max={5}
            id="price_range"
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateRestaurants;
