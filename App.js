const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const { open } = require("sqlite");
const app = express();

// Receive incoming object as JSON
app.use(express.json());

// Directory path to connect with DataBase
const dbPath = path.join(__dirname, "userDetails.db");

// Connecting to the database
let db;
const intializeDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create user table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR(200) NOT NULL
      )
    `);

    // Create address table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS address(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        address TEXT,
        pincode INTEGER,
        city VARCHAR(200),
        state VARCHAR(200),
        country VARCHAR(200),
        FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE
      )
    `);

    app.listen(3000, () => {
      console.log("Server running on Port 3000");
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

intializeDb();

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, address, pincode, city, state, country } = req.body;

    // Validate that required fields are not missing
    if (!name || !address || !pincode || !city || !state || !country) {
      return res
        .status(400)
        .send(
          "All fields (name, address, pincode, city, state, country) are required."
        );
    }

    // Insert user into the user table
    const userDataQuery = `INSERT INTO user (name) VALUES (?);`;
    const result = await db.run(userDataQuery, [name]);
    const userId = result.lastID; // Get the user ID of the newly inserted user

    // Insert address into the address table
    const addressDataQuery = `INSERT INTO address (userId, address, pincode, city, state, country) VALUES (?,?,?,?,?,?)`;
    await db.run(addressDataQuery, [
      userId,
      address,
      pincode,
      city,
      state,
      country,
    ]);

    res.status(201).send("Added User Data Successfully");
  } catch (error) {
    res.status(500).send(`Error Due To ${error.message}`);
  }
});

// RETRIEVE ALL USERS AND ADDRESSES
app.get("/register", async (req, res) => {
  try {
    const getAllUsers = `
      SELECT user.id, user.name, address.address, address.pincode, address.city, address.state, address.country 
      FROM user 
      JOIN address 
      ON user.id = address.userId;
    `;
    const allData = await db.all(getAllUsers);

    res.status(200).send(allData.length ? allData : "No Data");
  } catch (error) {
    res.status(500).send(`Error Due To ${error.message}`);
  }
});

module.exports = app;
