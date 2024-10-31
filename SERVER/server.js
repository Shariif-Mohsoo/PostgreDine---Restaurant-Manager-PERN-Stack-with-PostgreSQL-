import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import db from "./db/index.js";
import cors from "cors";

const app = express();
const { query } = db;
dotenv.config();

// TODO: MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// TODO: LET'S START WITH ROUTES.
// get all Restaurants;
const RESTAURANTS = "restaurants";
const REVIEWS = "reviews";

const restaurantsRoutePath = "/api/v1/restaurants";
app.get(`${restaurantsRoutePath}`, async (req, res) => {
  try {
    const results = await query(`select * from ${RESTAURANTS}`);
    const { rows } = results;
    res.json({
      status: "success",
      results: rows.length,
      data: {
        restaurants: rows,
      },
      message: "Listening your request",
    });
  } catch (error) {
    console.log(err.message);
  }
});
// GET A INDIVIDUAL RESTAURANT
app.get(`${restaurantsRoutePath}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    //   console.log(id);
    // string concat query can lead to SQL INJECTION LEAK ATTACK USE PARAMs QUERY.
    const restaurants = await query(
      // `select * from ${RESTAURANTS} where ${RESTAURANTS}.id = ${id}`,
      `select * from ${RESTAURANTS} where ${RESTAURANTS}.id = $1`,
      [id]
    );
    const reviews = await query(
      `select * from ${REVIEWS} where ${REVIEWS}.restaurant_id = $1`,
      [id]
    );
    // console.log(restaurants.rows);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurants.rows[0],
        review: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
});
// CREATING A RESTAURANTS
app.post(`${restaurantsRoutePath}`, async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    //   console.log(data);
    const result = await query(
      `insert into ${RESTAURANTS}(name,location,price_range) values ($1,$2,$3) returning *`,
      [name, location, price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error.message);
  }
});

// UPDATING THE RESTAURANT
app.put(`${restaurantsRoutePath}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price_range } = req.body;
    const result = await query(
      `update ${RESTAURANTS} set name = $1,location = $2,price_range = $3 where ${RESTAURANTS}.id = $4 returning *`,
      [name, location, price_range, id]
    );
    // console.log(result.rows);
    res.status(200).json({
      status: "success",
      restaurant: result.rows[0],
    });
  } catch (error) {
    console.log(error.message);
  }
});

// DELETING THE RESTAURANT
app.delete(`${restaurantsRoutePath}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    await query(`delete from ${RESTAURANTS} where ${RESTAURANTS}.id = $1`, [
      id,
    ]);
    // console.log(result.rowCount);
    res.status(204).json({
      status: "success",
      message: `Deleting the restaurant with id: ${id}`,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//CREATING THE SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Listening at port ", port);
});
