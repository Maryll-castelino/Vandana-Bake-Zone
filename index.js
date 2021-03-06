const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 


app.use(express.static(path.join(__dirname, "frontend")));

app.get("/getmenu", async (req, res) => {
  try {
    const menu = await pool.query(
      "SELECT * FROM menu"
    );
    res.json(menu.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getdryround", async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT name, price FROM dry WHERE category='round'"
    );
    res.json(data.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getdryloaf", async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT name, price FROM dry WHERE category='loaf'"
    );
    res.json(data.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getdrycupcakes", async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT name FROM dry WHERE category='cupcakes'"
    );
    res.json(data.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// getting the form data
app.post('/contact', async function(req, res){
  const {name, email, number, text} = req.body;
  console.log(req.body);
  const newMessage = await pool.query(
    "INSERT INTO contactus (name, email, number, comment) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, number, text]
  );
  // res.send('./frontend/contactus.html');
});

app.listen(PORT, () => {
  console.log(`server has started at port ${PORT}`);
});
