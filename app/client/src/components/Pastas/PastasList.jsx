// src/components/Pastas/PastasList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PastasList = () => {
  const [pastas, setPastas] = useState([]);

  useEffect(() => {
    fetchPastas();
  }, []);

  const fetchPastas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pastas'); // ajuste a URL conforme sua API
      setPastas(response.data);
    } catch (error) {
      console.error('Erro ao buscar pastas:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Pastas</h2>
      <ul>
        {pastas.map((pasta) => (
          <li key={pasta.id_pasta}>
            <strong>{pasta.nome}</strong>
            <p>{pasta.descricao}</p>
            <p>Data de Criação: {pasta.dt_criacao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastasList;
