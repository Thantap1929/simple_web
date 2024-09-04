const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// สร้าง Connection Pool
const pool = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'Devops',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ใช้ Promise API สำหรับ Connection Pool
const promisePool = pool.promise();

// ใช้ CORS
app.use(require('cors')());
app.use(express.json()); // รองรับ JSON request bodies
app.use(express.static('public'));

// Endpoint สำหรับดึงข้อมูลผู้ใช้
app.get('/users', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint สำหรับเพิ่มผู้ใช้
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await promisePool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.json({ message: 'User added', id: result.insertId });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint สำหรับลบผู้ใช้
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await promisePool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Server error');
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
