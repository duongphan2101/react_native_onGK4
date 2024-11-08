// connectDB.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123',
  database: 'db_duong',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.get('/api/data', async (req, res) => {
  try {
    db.query('SELECT * FROM users', (err, results) => {  // Chỉnh sửa ở đây
      if (err) {
        console.error("Error during query:", err); // Ghi lại lỗi truy vấn
        return res.status(500).json({ error: "Internal Server Error", message: err.message });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Server error:", error); // Ghi lại lỗi server
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Endpoint để đăng ký tài khoản
app.post('/api/register', (req, res) => {
  const { name, pass, avatar } = req.body;

  // Kiểm tra tên người dùng đã tồn tại hay chưa
  const checkQuery = 'SELECT * FROM users WHERE name = ?';
  db.query(checkQuery, [name], (err, result) => {
    if (err) {
      console.error('Error in checkQuery:', err);
      return res.status(500).json({ error: 'Database error in checkQuery' });
    }

    if (result.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Thêm người dùng vào cơ sở dữ liệu
    const insertQuery = 'INSERT INTO users (name, pass, avatar) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, pass, avatar], (err, result) => {
      if (err) {
        console.error('Error in insertQuery:', err); // Log lỗi insert
        return res.status(500).json({ error: 'Database error in insertQuery' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  });
});

// Endpoint để cập nhật thông tin người dùng
app.put('/api/user/:id', (req, res) => {
  console.log(`Received request to update user with ID: ${req.params.id}`);
  const userId = req.params.id;
  const { name, pass, avatar } = req.body;

  const updateQuery = 'UPDATE users SET name = ?, pass = ?, avatar = ? WHERE id = ?';
  db.query(updateQuery, [name, pass, avatar, userId], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Database error while updating user' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  });
});

// Endpoint để xóa người dùng
app.delete('/api/users/delete/:id', (req, res) => {
  const userId = req.params.id;
  console.log(`Received request to delete user with ID: ${userId}`);

  const deleteQuery = 'DELETE FROM users WHERE id = ?';
  db.query(deleteQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ error: 'Database error while deleting user' });
    }
    if (result.affectedRows === 0) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('User deleted successfully');
    res.json({ message: 'User deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
