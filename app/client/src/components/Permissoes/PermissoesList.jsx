// src/components/Permissoes/PermissoesList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PermissoesList = () => {
  const [permissoes, setPermissoes] = useState([]);

  useEffect(() => {
    fetchPermissoes();
  }, []);

  const fetchPermissoes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/permissoes'); // ajuste a URL conforme sua API
      setPermissoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar permissões:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Permissões</h2>
      <ul>
        {permissoes.map((permissao) => (
          <li key={permissao.id_permissao}>
            <p>ID do Usuário: {permissao.id_usuario}</p>
            <p>ID do Documento: {permissao.id_documento}</p>
            <p>ID da Pasta: {permissao.id_pasta}</p>
            <p>Tipo de Permissão: {permissao.tp_permissao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissoesList;
