// src/components/Usuarios/UsuarioForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UsuarioForm.css'; // Importando o arquivo de estilo CSS

const UsuarioForm = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    dt_cadastro: '',
    tp_usuario: '',
  });
  const [redirectToUsuarios, setRedirectToUsuarios] = useState(false);

  useEffect(() => {
    if (id !== 'novo') {
      fetchUsuario();
    }
  }, [id]);

  const fetchUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`); // ajuste a URL conforme sua API
      setUsuario(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id === 'novo') {
        await axios.post('http://localhost:3000/users', usuario); // ajuste a URL conforme sua API
      } else {
        await axios.put(`http://localhost:3000/users/${id}`, usuario); // ajuste a URL conforme sua API
      }
      setRedirectToUsuarios(true);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  useEffect(() => {
    if (redirectToUsuarios) {
      // Redireciona para a página de usuários após a submissão
      window.location.href = '/usuarios'; // Você pode ajustar para o seu roteamento específico
    }
  }, [redirectToUsuarios]);

  return (
    <div className="usuario-form-container">
      <h2>Formulário de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={usuario.nome} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={usuario.email} onChange={handleChange} required />
        </label>
        <label>
          Senha:
          <input type="password" name="senha" value={usuario.senha} onChange={handleChange} required />
        </label>
        <label>
          Data de Cadastro:
          <input type="date" name="dt_cadastro" value={usuario.dt_cadastro} onChange={handleChange} required />
        </label>
        <label>
          Tipo de Usuário:
          <input type="text" name="tp_usuario" value={usuario.tp_usuario} onChange={handleChange} required />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default UsuarioForm;
