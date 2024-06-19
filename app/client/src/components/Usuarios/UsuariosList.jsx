// src/components/Usuarios/UsuariosList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/usuarios'); // ajuste a URL conforme sua API
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleDeleteUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/usuarios/${id}`); // ajuste a URL conforme sua API
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <Link to="/usuario/novo">Novo Usuário</Link>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id_usuario}>
            <Link to={`/usuario/${usuario.id_usuario}`}>
              {usuario.nome} ({usuario.email})
            </Link>
            <button onClick={() => handleDeleteUsuario(usuario.id_usuario)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuariosList;
