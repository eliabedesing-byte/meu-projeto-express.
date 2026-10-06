const UserModel = require('../models/UserModel');

function validar(body) {
  const { name, email } = body || {};
  if (!name || !name.trim()) return 'name é obrigatório';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return 'email inválido';
  return null;
}

function idInvalido(id) {
  return !/^\d+$/.test(id);
}

function tratarErro(error, res) {
  console.error(error);
  if (error.code === '23505') {
    return res.status(409).json({ error: 'E-mail já cadastrado' });
  }
  return res.status(500).json({ error: 'Erro interno' });
}

async function index(req, res) {
  try {
    res.json(await UserModel.findAll());
  } catch (error) {
    tratarErro(error, res);
  }
}

async function show(req, res) {
  if (idInvalido(req.params.id)) return res.status(400).json({ error: 'id inválido' });
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    tratarErro(error, res);
  }
}

async function create(req, res) {
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ error: erro });
  try {
    res.status(201).json(await UserModel.create(req.body));
  } catch (error) {
    tratarErro(error, res);
  }
}

async function update(req, res) {
  if (idInvalido(req.params.id)) return res.status(400).json({ error: 'id inválido' });
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ error: erro });
  try {
    const user = await UserModel.update(req.params.id, req.body);
    if (user) res.json(user);
    else res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    tratarErro(error, res);
  }
}

async function deleteUser(req, res) {
  if (idInvalido(req.params.id)) return res.status(400).json({ error: 'id inválido' });
  try {
    const deleted = await UserModel.delete(req.params.id);
    if (deleted) res.json({ message: 'Usuário deletado com sucesso' });
    else res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    tratarErro(error, res);
  }
}

module.exports = { index, show, create, update, delete: deleteUser };