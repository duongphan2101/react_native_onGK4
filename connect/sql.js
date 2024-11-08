// connectDB.js
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Cấu hình kết nối SQL Server
const dbConfig = {
  user: 'sa', // Tên người dùng SQL Server
  password: '123', // Mật khẩu của người dùng
  server: 'localhost', // Địa chỉ máy chủ
  database: 'db_duong', // Tên cơ sở dữ liệu
  options: {
    encrypt: true, // Sử dụng mã hóa kết nối (có thể thay đổi tùy thuộc vào cấu hình)
    trustServerCertificate: true, // Tin tưởng chứng chỉ máy chủ
  }
};

// Kết nối đến SQL Server
sql.connect(dbConfig)
  .then(() => {
    console.log('Connected to SQL Server database!');
  })
  .catch((err) => {
    console.error('Error connecting to SQL Server:', err);
  });

// API để lấy dữ liệu người dùng
app.get('/api/data', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM users');
    res.json(result.recordset);
  } catch (err) {
    console.error("Error during query:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

// API để đăng ký tài khoản
app.post('/api/register', async (req, res) => {
  const { name, pass, avatar } = req.body;

  try {
    const checkQuery = 'SELECT * FROM users WHERE name = @name';
    const checkResult = await sql.query(checkQuery, { name });

    if (checkResult.recordset.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const insertQuery = 'INSERT INTO users (name, pass, avatar) VALUES (@name, @pass, @avatar)';
    const insertResult = await sql.query(insertQuery, { name, pass, avatar });

    res.status(201).json({ message: 'User registered successfully', userId: insertResult.recordset.insertId });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Database error during registration' });
  }
});

// API để cập nhật thông tin người dùng
app.put('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, pass, avatar } = req.body;

  try {
    const updateQuery = 'UPDATE users SET name = @name, pass = @pass, avatar = @avatar WHERE id = @id';
    const updateResult = await sql.query(updateQuery, { name, pass, avatar, id: userId });

    if (updateResult.rowsAffected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Database error while updating user' });
  }
});

// API để xóa người dùng
app.delete('/api/users/delete/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const deleteQuery = 'DELETE FROM users WHERE id = @id';
    const deleteResult = await sql.query(deleteQuery, { id: userId });

    if (deleteResult.rowsAffected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Database error while deleting user' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
