// src/components/Documentos/DocumentosList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentosList = () => {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const fetchDocumentos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/documents'); // ajuste a URL conforme sua API
      setDocumentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Documentos</h2>
      <ul>
        {documentos.map((documento) => (
          <li key={documento.id_documento}>
            <strong>{documento.nome}</strong>
            <p>{documento.descricao}</p>
            <p>Caminho do Arquivo: {documento.caminho_arquivo}</p>
            <p>Data de Criação: {documento.dt_criacao}</p>
            <p>Data de Modificação: {documento.dt_modificacao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentosList;
