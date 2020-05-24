const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

// process.env.PORT
// process.env.NODE_ENV => production or undefined

// Middleware
app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build"));

if (process.env.NODE_ENV === "production") {
  // server static content
  app.use(express.static(path.join(__dirname, "client/build")));
}

// Routes
// create a prompt
app.post("/prompts", async(req, res) => {
  try {
    const { description } = req.body;
    const { genre } = req.body;
    const newPrompt = await pool.query("INSERT INTO prompts (description, genre) VALUES ($1, $2) RETURNING *",
                      [description, genre]);
    res.json(newPrompt.rows[0]);
    console.log(newPrompt.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all prompts
app.get("/prompts", async(req, res) => {
  try {
    const allPrompts = await pool.query("SELECT * FROM prompts");
    res.json(allPrompts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get prompts of a specific genre
app.get("/prompts/genre/:genre", async(req, res) => {
  try {
    const { genre } = req.params;
    const genrePrompts = await pool.query("SELECT * FROM prompts WHERE genre=$1",
                          [genre]);
    res.json(genrePrompts.rows);
  } catch(err) {
    console.error(err.message);
  }
});

// get one specific prompt
app.get("/prompts/id/:prompt_id", async(req, res) => {
  try {
    const { prompt_id } = req.params;
    const aPrompt = await pool.query("SELECT * FROM prompts WHERE prompt_id=$1", [prompt_id]);
    res.json(aPrompt.rows);
  } catch(err) {
    console.error(err.message);
  }
});

// search prompts
app.get("/prompts/search/:search_term", async(req, res) => {
  try {
    const { search_term } = req.params;
    const searchPrompts = await pool.query("SELECT * FROM prompts WHERE description LIKE $1", [search_term]);
    res.json(searchPrompts.rows);
  } catch(err) {
    console.error(err.message);
  }
});

// update a prompt
app.put("/prompts/:prompt_id", async(req, res) => {
  try {
    const { prompt_id } = req.params;
    const { description } = req.body;
    const { genre } = req.body;
    const updatePrompts = await pool.query("UPDATE prompts SET description=$1, genre=$2 WHERE prompt_id=$3",
                          [description, genre, prompt_id]);
    res.json("Prompt was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a prompt
app.delete("/prompts/:prompt_id", async(req, res) => {
  try {
    const { prompt_id } = req.params;
    const deletePrompt = await pool.query("DELETE FROM prompts WHERE prompt_id=$1",
                        [prompt_id]);
    res.json("Prompt was deleted");
  } catch(err) {
    console.error(err.message);
  }
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

// Listen
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
