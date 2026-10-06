const pool = require('../config');

async function findAll() {
  const result = await pool.query('SELECT id, name, email FROM users ORDER BY id');
  return result.rows;
}

async function findById(id) {
  const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

async function create(user) {
  const { name, email } = user;
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
    [name, email]
  );
  return result.rows[0];
}

async function update(id, user) {
  const { name, email } = user;
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
    [name, email, id]
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING id, name, email',
    [id]
  );
  return result.rows[0];
}

module.exports = { findAll, findById, create, update, delete: remove };