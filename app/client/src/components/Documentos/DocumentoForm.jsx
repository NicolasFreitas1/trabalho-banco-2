// src/components/Documentos/DocumentoForm.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Documentos.css";

const DocumentoForm = ({ onSave, documentData }) => {
  const { id } = useParams();
  const [documento, setDocumento] = useState({
    descricao: "",
    caminho_arquivo: "",
    id_proprietario: "",
    id_tipo_documento: "",
  });
  const [proprietarios, setProprietarios] = useState([]);
  const [tiposDocumento, setTiposDocumento] = useState([]);

  useEffect(() => {
    if (documentData) {
      setDocumento(documentData);
    }
  }, [documentData]);

  useEffect(() => {
    fetchProprietarios();
    fetchTiposDocumento();
  }, []);

  const fetchProprietarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      
      setProprietarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar proprietários:", error);
    }
  };

  const fetchTiposDocumento = async () => {
    try {
      const response = await axios.get("http://localhost:3000/document-types");
      setTiposDocumento(response.data);
    } catch (error) {
      console.error("Erro ao buscar tipos de documento:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocumento({ ...documento, [name]: value });
  };

  const handleFileChange = (e) => {
    setDocumento({ ...documento, caminho_arquivo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Adiciona os campos ao FormData
    formData.append('descricao', documento.descricao);
    formData.append('caminho_arquivo', documento.caminho_arquivo);
    formData.append('id_proprietario', documento.id_proprietario);
    formData.append('id_tipo_documento', documento.id_tipo_documento);
    
    try {
      if (!documentData) {
        const response = await axios.post("http://localhost:3000/documents", formData);
        console.log(response.data, "document");
        console.log("Novo documento criado:", response.data); // Apenas para debug, você pode remover isso
      } else {
        await axios.put(`http://localhost:3000/documents/${id}`, formData);
      }
      onSave();
    } catch (error) {
      if (error.response) {
        console.error("Erro de resposta:", error.response.data);
        console.error("Status do erro:", error.response.status);
      } else if (error.request) {
        console.error("Erro de requisição:", error.request);
      } else {
        console.error("Erro ao configurar requisição:", error.message);
      }
      console.error("Erro geral:", error);
    }
  };

  return (
    <div className="documento-form-container">
      <h2>{id === "novo" ? "Novo Documento" : "Editar Documento"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Arquivo:
          <input
            type="file"
            name="caminho_arquivo"
            onChange={handleFileChange}
            required
          />
        </label>
        <label>
          Proprietário:
          <select
            name="id_proprietario"
            value={documento.id_proprietario}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um Proprietário</option>
            {proprietarios.map((proprietario) => (
              <option key={proprietario.id} value={proprietario.id}>
                {proprietario.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tipo de Documento:
          <select
            name="id_tipo_documento"
            value={documento.id_tipo_documento}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um Tipo de Documento</option>
            {tiposDocumento.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Descrição:
          <input
            type="text"
            name="descricao"
            value={documento.descricao}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default DocumentoForm;
