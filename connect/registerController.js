// registerController.js
const { db } = require('./connectDB');

const registerUser = (req, res) => {
    const { name, pass, avatar } = req.body;
    console.log("Request body:", req.body);
    const query = 'INSERT INTO user (name, pass, avatar) VALUES (?, ?, ?)';

    db.query(query, [name, pass, avatar || null], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  };
  
module.exports = { registerUser };

  