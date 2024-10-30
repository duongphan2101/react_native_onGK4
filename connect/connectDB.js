const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Sử dụng cors để cho phép các yêu cầu từ ứng dụng React Native
app.use(cors());

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12741067',
  password: 'Chd3Y3UiH6',
  database: 'sql12741067',
  port: 3306,
});

// Kiểm tra kết nối
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Tạo endpoint API để lấy dữ liệu từ bảng user
app.get('/api/data', (req, res) => {
  db.query('SELECT id, name, pass, avatar FROM user', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
