import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
const app = express();
dotenv.config();
// TODO: MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
// TODO: LET'S START WITH ROUTES.
// get all Restaurants;
const restaurantsRoutePath = "/api/v1/restaurants";
app.get(`${restaurantsRoutePath}`, (req, res) => {
  res.json({
    status: "success",
    data: {
      restaurants: ["MONAL", "Wendys"],
    },
    message: "Listening your request",
  });
});
// GET A INDIVIDUAL RESTAURANT
app.get(`${restaurantsRoutePath}/:id`, (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  res.status(200).json({
    status: "success",
    message: "You get one restaurant",
  });
});
// CREATING A RESTAURANTS
app.post(`${restaurantsRoutePath}`, (req, res) => {
  const data = req.body;
  //   console.log(data);

  res.status(201).json({
    status: "success",
    data: {
      message: "Restaurant Created",
    },
  });
});

// UPDATING THE RESTAURANT
app.put(`${restaurantsRoutePath}/:id`, (req, res) => {
  const { id } = req.params;
  const data = req.body;
  //   console.log(data);
  res.status(200).json({
    status: "success",
    message: `Updating the restaurant with id: ${id}`,
  });
});

// DELETING THE RESTAURANT
app.delete(`${restaurantsRoutePath}/:id`, (req, res) => {
  const { id } = req.params;
  res.status(204).json({
    status: "success",
    message: `Deleting the restaurant with id: ${id}`,
  });
});

//CREATING THE SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Listening at port ", port);
});
